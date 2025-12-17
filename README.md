# 🎉 MERN Event Platform

Hey there! 👋
This is a **full‑stack MERN Event Platform** that I built as part of a **Full Stack Developer Intern technical assignment**. The goal was to create a real‑world, production‑ready application where users can create events and manage RSVPs, while handling **authentication, capacity limits, and concurrency issues** properly.

This project focuses not just on features, but on **clean backend logic, safe database operations, and real deployment**.

---

## 🚀 Live Application

* **Frontend (Render):** [https://event-platform-t32l.onrender.com](https://event-platform-t32l.onrender.com)
* **Backend (Render):** [https://event-platform-backend-98el.onrender.com](https://event-platform-backend-98el.onrender.com)

---

## 🧠 What This Project Does

* Users can **sign up and log in securely**
* Authenticated users can **create events** with details like title, date, location, capacity, and image
* Anyone can **view upcoming events**
* Logged‑in users can **RSVP to events** or cancel their RSVP
* The system strictly **prevents overbooking**, even when multiple users try to RSVP at the same time

This project was designed to behave like a real production system, not a demo app.

---

## ✨ Key Features

### 🔐 Authentication

* Secure user registration and login
* Password hashing using `bcrypt`
* JWT‑based authentication
* Protected backend routes

### 📅 Event Management

* Create, edit, and delete events
* Only the event creator can modify or delete their events
* Event details include:

  * Title
  * Description
  * Date & Time
  * Location
  * Capacity
  * Image upload (Cloudinary)

### 📝 RSVP System (Core Logic)

* Users can RSVP to events
* One RSVP per user per event (no duplicates)
* Capacity is strictly enforced
* Users can leave events

---

## ⚙️ RSVP Capacity & Concurrency Handling (Important)

To prevent **overbooking**, the backend uses **atomic database operations**.

When a user tries to RSVP:

* The system checks that:

  * Event capacity is greater than zero
  * The user has not already RSVPed
* Capacity decrement and attendee addition happen in a **single atomic operation**

This ensures:

* No race conditions
* No duplicate RSVPs
* No overbooking, even with simultaneous requests

This approach makes the RSVP logic safe and production‑ready.

---

## 🧱 Tech Stack

### Frontend

* React.js
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Cloud & Tools

* MongoDB Atlas
* Cloudinary (image uploads)
* Render (frontend & backend deployment)

---

## 📁 Project Structure

```
event-platform/
│
├── frontend/        # React frontend
│
├── backend/         # Node & Express backend
│
└── README.md
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file with:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌱 What I Learned

* Building secure authentication flows
* Designing RESTful APIs
* Handling real‑world concurrency issues
* Deploying full‑stack applications
* Debugging production‑level issues

This project significantly improved my confidence in building and deploying complete web applications.

---

## 🚀 Future Improvements

* Event search and filtering
* User dashboard (created events & attending events)
* Email notifications
* UI/UX enhancements

---

## 👨‍💻 Author

**Doss Cyril**
B.Tech – Artificial Intelligence & Machine Learning
Aspiring Full‑Stack Developer

---

⭐ If you found this project interesting, feel free to star the repository!
