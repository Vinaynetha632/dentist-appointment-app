
🦷 OroGlee Dentist Appointment Booking Platform

A full-stack Dentist Appointment Booking web application built using React, Node.js, Express, and SQLite.
Users can browse verified dentists, book appointments seamlessly, and administrators can view scheduled appointments.

This project was developed as part of the OroGlee Full-Stack Assignment.

🌐 Live Application

🔗 Live Website:
https://dentist-appointment-app-9grs.onrender.com

🔗 Backend API Endpoint Example:
https://dentist-appointment-app-9grs.onrender.com/api/dentists

🏗️ Application Architecture

The application follows a monolithic full-stack deployment architecture:

Frontend: React (Vite build) served as static files by Express

Backend: Node.js + Express REST API

Database: SQLite (file-based relational database)

Hosting: Render cloud platform

This architecture ensures:

✅ Single deployment
✅ Easy testing
✅ Fast load performance
✅ Simple maintenance

💻 Tech Stack
🎨 Frontend

React.js (Hooks + Functional Components)

Vite (Fast bundler & dev server)

Tailwind CSS (Modern responsive UI)

React Router DOM (Client-side routing)

Axios (API communication)

Lucide React (Icon library)

⚙️ Backend

Node.js

Express.js

better-sqlite3 (High-performance SQLite driver)

CORS middleware

🗄️ Database

SQLite local file database

Auto table creation on first run

Auto dentist seed data

✨ Features
👨‍⚕️ Patient Side

View list of available dentists

See qualification, experience & clinic details

Book appointment with simple form

Responsive mobile-friendly UI

🧑‍💼 Admin Side

View all booked appointments

Organized appointment listing

Real-time data fetch from database

⚡ Technical Features

RESTful API design

Production deployment on Render

Server-side React build serving

Optimized image rendering

Error-handled database operations

🚀 Local Setup Guide
✅ Prerequisites

Node.js (v18+ recommended)

npm

📦 Installation
git clone https://github.com/Vinaynetha632/dentist-appointment-app.git
cd dentist-appointment-app
npm install
▶️ Run Locally
npm run dev

Then open:

Frontend → http://localhost:5173

Backend → http://localhost:5000

📁 Project Structure
dentist-appointment-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── database.js
│   └── server.js
│
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│   └── images/
│
├── dist/ (production build)
└── package.json
🧠 Future Improvements

PostgreSQL cloud database integration

Dentist search & filter functionality

Authentication system (Admin login)

Appointment notifications

UI animation enhancements

👨‍💻 Author

Vinaynetha632
Full-Stack Developer (React + Node.js)