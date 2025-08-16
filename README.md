# NaukriBazaar  

NaukriBazaar is a **Job Portal Web Application** built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**.  
It provides a platform where companies can post jobs, and candidates can apply for them with authentication, authorization, and cloud storage support.  

---

## 🚀 Features  

- User Authentication & Authorization (JWT-based)  
- Role-based Access (Admin, Company, Job Seeker)  
- Job Posting, Editing & Deletion (Company Dashboard)  
- Job Search & Apply (Job Seeker Dashboard)  
- Resume/Logo Upload with **Cloudinary**  
- Secure API with Express.js & MongoDB  

---

## 🛠️ Tech Stack  

- **Frontend**: React.js, Tailwind CSS, shadcn/ui 
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication  
- **Cloud Storage**: Cloudinary  

---

## ⚙️ Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/Nikhil-Dadhich/NaukriBazaar.git
cd NaukriBazaar
```

### 2. Install dependencies  

#### Backend  
```bash
cd backend
npm install
```

#### Frontend  
```bash
cd frontend
npm install
```

### 3. Environment Variables  

Create a `.env` file in the **backend** folder with the following variables:  

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

## ▶️ Running the App  

### Backend  
```bash
cd backend
npm run dev
```

### Frontend  
```bash
cd frontend
npm run dev
```

---

## 📂 Folder Structure  

```
NaukriBazaar/
│
├── backend/          # Express + MongoDB API
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   ├── controllers/  # Route controllers
│   ├── utils/        # Helpers (cloudinary, datauri, etc.)
│   └── server.js     # Entry point
│
├── frontend/         # React + Vite client
│   ├── src/
│   │   ├── assets/        # Static assets (images, icons, etc.)
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main pages (Home, Jobs, Profile, etc.)
│   │   ├── context/       # React Context for state management
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions (Axios calls)
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   └── vite.config.js
│
└── README.md
```
