from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .db import Base

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, unique=True, index=True)
    phone = Column(String(40), nullable=True)
    newsletter = Column(Integer, default=0)  # 1 = subscribed, 0 = not

    reservations = relationship("Reservation", back_populates="customer")

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    time_slot = Column(DateTime, nullable=False, index=True)
    guests = Column(Integer, nullable=False, default=2)
    table_number = Column(Integer, nullable=False)

    customer = relationship("Customer", back_populates="reservations")
    __table_args__ = (
        # Prevent the same table being booked twice at the same time slot
        UniqueConstraint("time_slot", "table_number", name="uq_slot_table"),
    )
