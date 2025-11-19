from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import random

from .config import Config
from .db import Base, engine, SessionLocal
from .models import Customer, Reservation

TOTAL_TABLES = 30

def create_app():
    app = Flask(__name__)
    app.config["JSON_SORT_KEYS"] = False

    # Enable CORS
    origins = Config.CORS_ORIGINS or ["*"]
    CORS(app, resources={r"/api/*": {"origins": origins}})

    # Initialize DB (create tables if not exist)
    Base.metadata.create_all(bind=engine)

    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok"})

    @app.post("/api/newsletter")
    def newsletter_signup():
        data = request.get_json(force=True)
        email = (data.get("email") or "").strip().lower()
        name = (data.get("name") or "").strip()
        phone = (data.get("phone") or "").strip() or None

        if not email or "@" not in email:
            return jsonify({"ok": False, "error": "Invalid email."}), 400

        db = SessionLocal()
        try:
            customer = db.query(Customer).filter_by(email=email).one_or_none()
            if customer:
                customer.name = customer.name or name
                customer.phone = customer.phone or phone
                customer.newsletter = 1
            else:
                customer = Customer(name=name or "Subscriber", email=email, phone=phone, newsletter=1)
                db.add(customer)
            db.commit()
            return jsonify({"ok": True, "message": "You are subscribed to the newsletter."})
        except Exception as e:
            db.rollback()
            return jsonify({"ok": False, "error": "Server error subscribing."}), 500
        finally:
            db.close()

    @app.get("/api/reservations/availability")
    def check_availability():
        # expects ?datetime=YYYY-MM-DDTHH:MM
        iso = request.args.get("datetime")
        try:
            slot = datetime.fromisoformat(iso)
        except Exception:
            return jsonify({"ok": False, "error": "Invalid datetime format."}), 400

        db = SessionLocal()
        try:
            count = db.query(Reservation).filter(Reservation.time_slot == slot).count()
            available = max(0, TOTAL_TABLES - count)
            return jsonify({"ok": True, "available_tables": available})
        finally:
            db.close()

    @app.post("/api/reservations")
    def create_reservation():
        data = request.get_json(force=True)
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip().lower()
        phone = (data.get("phone") or "").strip() or None
        guests = int(data.get("guests") or 2)
        iso = data.get("datetime")

        if not name:
            return jsonify({"ok": False, "error": "Name is required."}), 400
        if not email or "@" not in email:
            return jsonify({"ok": False, "error": "Valid email is required."}), 400
        try:
            time_slot = datetime.fromisoformat(iso)
        except Exception:
            return jsonify({"ok": False, "error": "Invalid datetime."}), 400

        db = SessionLocal()
        try:
            # find or create customer
            customer = db.query(Customer).filter_by(email=email).one_or_none()
            if not customer:
                customer = Customer(name=name, email=email, phone=phone, newsletter=0)
                db.add(customer)
                db.flush()  # assign id

            # tables already booked for this slot
            booked = {r.table_number for r in db.query(Reservation).filter(Reservation.time_slot == time_slot).all()}
            if len(booked) >= TOTAL_TABLES:
                return jsonify({"ok": False, "error": "Selected time slot is fully booked."}), 409

            # choose a random available table
            available_tables = [t for t in range(1, TOTAL_TABLES + 1) if t not in booked]
            table_no = random.choice(available_tables)

            res = Reservation(customer_id=customer.id, time_slot=time_slot, table_number=table_no, guests=guests)
            db.add(res)
            db.commit()

            return jsonify({
                "ok": True,
                "message": "Reservation confirmed.",
                "reservation": {
                    "id": res.id,
                    "name": customer.name,
                    "email": customer.email,
                    "guests": guests,
                    "datetime": time_slot.isoformat(),
                    "table_number": table_no
                }
            })
        except Exception as e:
            db.rollback()
            return jsonify({"ok": False, "error": "Server error creating reservation."}), 500
        finally:
            db.close()

    return app

# Allow `flask --app backend.app run` usage
app = create_app()
