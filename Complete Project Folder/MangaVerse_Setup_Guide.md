# 🧩 MangaVerse Setup Guide

### 📘 Overview
MangaVerse is a full-stack web application that allows users to **browse**, **review**, and **track manga reading history**.  
It uses a **Node.js + Express.js** backend, a **MongoDB** database, and a **vanilla HTML/CSS/JS** frontend.

---

## ⚙️ 1. Prerequisites
Before running the project, make sure you have the following installed:

- [Node.js (v18 or higher)](https://nodejs.org/)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) *(or local MongoDB instance)*
- A code editor (e.g., **VS Code** or **NetBeans**)
- Git (optional)

---

## 📂 2. Project Structure
```
MangaVerse/
├── Manga_Back_End_Revised.js     # Express.js backend server
├── Manga_FrontEnd_Revised.html   # Frontend file
├── env                           # Environment configuration
├── /public                       # Optional static folder for assets
└── /node_modules                 # Installed dependencies
```

---

## 🧾 3. Environment Variables
Your `.env` file (rename `env` → `.env`) should look like this:

```env
PORT=3000

# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mangaverse?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=this_is_a_very_secret_key_for_mangaverse
```

> ⚠️ **Important:** Replace `<username>`, `<password>`, and `<cluster>` with your actual MongoDB Atlas credentials.

---

## 📦 4. Installation Steps

### **Step 1 — Initialize Project**
Open a terminal in the project folder and run:
```bash
npm init -y
```

### **Step 2 — Install Dependencies**
```bash
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
```

### **Step 3 — Run the Backend Server**
```bash
node Manga_Back_End_Revised.js
```

✅ If successful, you’ll see:
```
✅ MongoDB Connected Successfully
🚀 Server is running at http://localhost:3000
```

---

## 🖥️ 5. Frontend Setup

Simply open **`Manga_FrontEnd_Revised.html`** in your browser  
or place it inside the `public/` folder (as the backend already serves it).

```bash
/public
└── Manga_FrontEnd_Revised.html
```

Then navigate to:
```
http://localhost:3000
```

---

## 📚 6. Available API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/register` | Register a new user |
| **POST** | `/api/login` | Log in and receive JWT token |
| **POST** | `/api/mangas/seed` | Insert sample manga into database |
| **GET** | `/api/mangas` | Get all manga with sorting and search |
| **GET** | `/api/mangas/:id` | Retrieve a specific manga |
| **POST** | `/api/mangas/:id/reviews` | Add a user review |
| **POST** | `/api/history` | Add a manga to user’s reading history |
| **GET** | `/api/history` | Retrieve user’s reading history |

---

## 🧠 7. Testing the System

1. **Register a user** using `/api/register`.  
2. **Login** to get your token.  
3. Use that token to test other endpoints (you can use [Postman](https://www.postman.com/) or the frontend).

---

## 🏁 8. Notes
- The frontend and backend can both run locally.  
- Make sure the backend (`PORT=3000`) is running before opening the HTML frontend.
- Use **CORS** if accessing from a different origin.

---

## 💬 9. Credits
Developed by the **MangaVerse Team** for educational purposes.
