# Alexander Arzola
# Web Application & Interface Design Project - 11/21/2025
# https://github.com/aarzola5010/cafe-fausse/

# Café Fausse Website

Cafe Fausse is a full-stack, responsive web application built with **React (JSX)** on the front-end and **Flask + PostgreSQL** on the back-end.

# Development and Tools Used

The AI model used to create the code was Chatgpt 5.  This was done evaluating other AI models and it was the most recommended for Web Development.  The Code Modifications were done using Visual Studio Code (VSC)

Used Vite Dev Server 5.0 for running front-end / React JSCx files. Used Vite Debug package/logs capability to troubleshoot and root cause issues with front end when calling back end through proxy.

Used Flask to run the Back End Dev Environment.

When running frontend and backend separately during development, a proxy was added for /api in vite.config.js.  This helped with the development and troubleshooting of the website.  It allowed to modify the front end and see the results without to have to restart back end and deal with CORS Configuration/errors.

# Final Deployment

Two local servers in my iMAC PC:

Gunicorn / Flask → http://127.0.0.1:8000 (for FLASK API)
 
Vite dev → http://localhost:5173 (React App UI)

Both connected via proxy

Deployed Gunicorn locally to host backend

# Cafe Fausse Features (per SRS)

- Home, Menu, Reservations, About Us, and Gallery pages
- Email newsletter signup (validated, persisted)
- Reservation system with availability checks and random table assignment (30 tables)
- Lightbox gallery with awards and reviews
- Responsive styling using CSS Grid/Flexbox
- RESTful Flask API, PostgreSQL via SQLAlchemy
- CORS configured for local dev

# Instructions on How to run the solution locally 

## Backend (Flask + Postgres)

1. Create a PostgreSQL database, e.g. `cafe_fausse`.

Download PostgreSQL form: https://www.postgresql.org/download/

When installing PostgreSQL set the following as specified:
- database superuser: postgres
- password: iMAC322
- port number the server to listen on: 5432

Open pgAdmin4
- Click on Servers and enter the password: iMAC322
- Right-click Databases → Create → Database.
- Enter name cafe_fausse, then Save.

COMMENTS: That’s all—your empty DB is ready.

2. Download all the source code used (front-end and back-end) for the Cafe-Fausse website from the GitHub repository:

https://github.com/aarzola5010/cafe-fausse

In Project root directory (cafe-fausse-main directory): 
- Rename `env_file` to `.env` using "mv env_file.txt .env"
- Make sure the  `DATABASE_URL` of .env file is updated the Postgres credentials below: (already done)

DATABASE_URL=postgresql+psycopg2://postgres:iMAC322@localhost:5432/cafe_fausse
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173


3. Create a virtual environment and install dependencies:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install flask
pip install flask-cors
pip install SQLAlchemy
pip install psycopg2-binary
pip install python-dotenv

```

4. Run the API:

```bash
export FLASK_APP=backend.app  #from /backend directory

cd ..  #To go up one level to the project root (if currently in backend/)
flask run --port 8000

```

Exit flask dev server by pressing CTRL+C

COMMENTS:
- Make sure flask dev server launches
- On first run, database tables are created automatically.

## Back End Deployment


1. Activate your backend venv (if not done already)
2. Install and configure Gunicorn (backend)

From project root (cafe-fausse-main directory) execute the following commands:

```bash
source backend/.venv/bin/activate     # activate your virtualenv
pip install gunicorn                  # install gunicorn into that venv
```

2. Make sure backend is a package (if not present) by executing the following command:
```bash
touch backend/__init__.py
```


This lets Python import backend.app as a module. In backend/app.py you already present:
app = create_app()

So Gunicorn can use that.

3. Run Gunicorn from the project root (with the venv active):

```bash

gunicorn -b 127.0.0.1:8000 backend.app:app
```

4.  Test the API directly
In a second terminal:

```bash
curl -i http://127.0.0.1:8000/api/health
```

You should see something like:
HTTP/1.1 200 OK
...
{"status":"ok"}

If that works, Gunicorn is correctly serving Café Fausse backend.



# 2) Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev

```
App runs at http://localhost:5173
to open web site type the following in the browser:  http://localhost:5173


COMMENTS:
Now two local servers are running:

Gunicorn / Flask → http://127.0.0.1:8000 (API)

Vite dev → http://localhost:5173 (React UI)


# Things done that helped during Development/Integration/Development Phase


1) For Connecting Frontend to Backend the following was done:

For running frontend and backend separately during dev, a proxy was added for /api in vite.config.js.  This helped with the development/troubleshooting of the website.

Created in `frontend/vite.config.js` a proxy section:

export default defineConfig({
  plugins: [react(), apiRequestLogger()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    }
  }


2) To Turn on Vite’s debug logs
- Vite uses the debug package. Enable it with an env var (MAC OS/ Linux)
```bash
cd frontend
DEBUG=vite:* npm run dev
```
3) API Endpoints Tests

- `GET /api/health` — health check
- `POST /api/newsletter` — body: `{ email, name }`
- `GET /api/reservations/availability?datetime=YYYY-MM-DDTHH:MM` — returns available tables
- `POST /api/reservations` — body: `{ name, email, phone?, guests, datetime }`
 
