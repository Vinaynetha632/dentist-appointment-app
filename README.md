# OroGlee Dentist Appointment Booking Platform

This repository contains the submission for the **OroGlee MERN Stack Assignment**. It is a full-stack platform that allows users to browse a list of verified dentists, book an appointment seamlessly, and view existing appointments through an Admin dashboard.

## 🔗 Live Links
- **Frontend (Live Demo):** [Insert Frontend URL after deployment]
- **Backend API:** [Insert Backend URL after deployment]
- **Video Walkthrough:** [Insert screen recording link here]

---

## 🛠️ Architecture Overview

The application follows a standard Client-Server Architecture:

* **Client (Frontend)**: Built with React and Vite. It handles the User Interface, Client-Side Routing (using React Router), and State Management. It communicates with the backend via RESTful API calls.
* **Server (Backend)**: Built with Node.js and Express.js. It securely handles incoming HTTP requests, processes data, and interacts with the database.
* **Database**: Uses SQLite. It persists data natively in a local `.sqlite` file, meaning it requires zero external setup or database server connections, making testing and deployment incredibly smooth.

---

## 💻 Tech Stack Used

### Frontend
- **React.js**: Functional components and Hooks for dynamic UI rendering.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for modern, responsive styling.
- **React Router DOM**: For seamless client-side navigation.
- **Axios**: Promise-based HTTP client for API requests.
- **Lucide React**: Beautiful, scalable icon library.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Minimalist web framework for building robust REST APIs.
- **SQLite3**: Lightweight, file-based relational database.
- **CORS**: Middleware to securely handle cross-origin requests.

---

## 🚀 Setup Instructions

Follow these steps to run the application locally on your machine.

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18 or higher recommended)
- **npm** (Node Package Manager)

### 2. Installation
Clone the repository and install the required dependencies for both the frontend and backend simultaneously.

```bash
# Clone the repository
git clone <your-github-repo-url>

# Navigate into the project directory
cd dentist-appointment

# Install all dependencies (Frontend and Backend)
npm install
```

### 3. Running the Application
This project is configured using `concurrently` to start both the Frontend and Backend servers with a single command.

```bash
# Start both servers locally
npm run start
```

### 4. Viewing the App
Once the script is running, open your browser and navigate to:
- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API Server:** [http://localhost:5000](http://localhost:5000)

> **💡 Note on the Database:**
> The SQLite database is configured to automatically initialize itself the first time the backend server runs. It will securely create the necessary tables (`dentists` and `appointments`) and instantly seed 5 sample dentists so you can test the booking flow immediately without any manual database setup.

---

## 📂 Project Structure

```text
dentist-appointment/
├── backend/
│   ├── models/
│   │   ├── Appointment.js   # Appointment database queries
│   │   └── Dentist.js       # Dentist database queries
│   ├── routes/
│   │   ├── appointmentRoutes.js # API endpoints for appointments
│   │   └── dentistRoutes.js     # API endpoints for dentists
│   ├── database.js          # SQLite connection and auto-seeding logic
│   └── server.js            # Express application entry point
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx      # Admin dashboard for viewing appointments
│   │   ├── BookAppointment.jsx # Booking form logic
│   │   ├── DentistList.jsx     # Landing page displaying dentists
│   │   └── Navbar.jsx          # Top navigation bar
│   ├── App.jsx              # Main React component & Routing
│   ├── index.css            # Tailwind CSS directives
│   └── main.jsx             # React application entry point
├── package.json             # Project dependencies and start scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project documentation
```
