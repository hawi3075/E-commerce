# Luu Safety E-Commerce Platform

A full-stack safety equipment and gear hub application designed for operator tools, catalog management, and seamless e-commerce transactions.

* **Live Frontend Application:** [https://e-commerce-msuo.vercel.app](https://e-commerce-msuo.vercel.app)

## 🚀 Tech Stack

* **Frontend:** React, React Router, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Hosting & Deployment:** Vercel (Frontend) & Render (Backend)

---

## 🛠️ Project Structure

```text
luu-safety/
├── backend/                  # Express backend API server
│   ├── config/               # Database connection configurations
│   ├── models/               # Mongoose schemas (User, Product, Order, etc.)
│   ├── routes/               # API route controllers (auth, users, products, etc.)
│   └── server.js             # Main entry point for the backend
└── frontend/                 # React frontend client
    ├── public/               # Public assets
    ├── src/
    │   ├── components/       # Reusable UI components & layouts
    │   ├── context/          # Auth context and state management
    │   ├── screens/          # Application views & admin dashboard panels
    │   ├── App.js            # Main application router and configurations
    │   └── index.js          # Client entry point
    └── package.json          # Frontend dependencies