# 📚 MangaVerse Setup Guide (With Reviews System)
**Updated:** October 16, 2025

This guide helps you run **MangaVerse**, a full-stack manga library website with:
- User registration & login (JWT)
- Reading history
- Review system (1 review per user per manga)
- MongoDB backend
- Beautiful animated frontend

---

## 🧩 1. Requirements

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community)
- A code editor (like **VS Code**)

---

## ⚙️ 2. Project Structure

```
MangaVerse/
│
├── Manga_Back End.js         # Node.js backend with MongoDB & API routes
├── public/
│   └── Manga_Front End.html  # Frontend (HTML + CSS + JS)
└── package.json              # Auto-created when initializing Node.js
```

---

## 🚀 3. Installation & Setup

### Step 1: Initialize Node.js Project

Open a terminal in your project folder and run:

```bash
npm init -y
```

This creates a `package.json` file.

### Step 2: Install Dependencies

```bash
npm install express mongoose bcryptjs jsonwebtoken cors
```

### Step 3: Place Your Files

Ensure your files are in this layout:
```
MangaVerse/
├── Manga_Back End.js
└── public/
    └── Manga_Front End.html
```

---

## 🗄️ 4. MongoDB Setup

### Option A: Local MongoDB
Start MongoDB locally:
```bash
mongod
```
It will run on: `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster and get your connection string.
3. Replace this line in **Manga_Back End.js**:
   ```js
   mongoose.connect('mongodb://localhost:27017/mangaverse', Ellipsis);
   ```
   with your Atlas URL, e.g.:
   ```js
   mongoose.connect('mongodb+srv://<username>:<password>@cluster.mongodb.net/mangaverse');
   ```

---

## 💻 5. Run the Backend Server

Run this command:

```bash
node "Manga_Back End.js"
```

Expected console output:
```
✅ Connected to MongoDB
📚 Default mangas inserted.
🚀 Server running at http://localhost:3000
```

---

## 🌐 6. Run the Frontend

Once the backend is running, open this URL in your browser:

```
http://localhost:3000
```

You’ll see the **MangaVerse login page**.

---

## 🔑 7. Features Overview

### 👤 User System
- Register a new account
- Login with JWT authentication
- Logout clears your token

### 📖 Manga Library
- Displays all manga
- Search & sort (A–Z or Z–A)
- Click **Read** to view details and chapter count

### 🕓 Reading History
- Each time you view a manga, it’s logged in your history
- Access history from the header **“History” button**

### 💬 Review System
- Each user can submit **one review per manga**
- Reviews include:
  - Username
  - Rating (1–5 stars)
  - Comment
  - Date posted
- Users can **edit/update** their review anytime
- All reviews for that manga display below the reader

### ⭐ Favorites (Local Only)
- Favorites are stored locally in browser storage (not in MongoDB).

---

## 🧠 8. Common Issues

| Issue | Solution |
|-------|-----------|
| ❌ Cannot connect to MongoDB | Ensure `mongod` is running or replace with Atlas URL. |
| ⚠️ CORS or Network error | Check backend is running on port **3000** and frontend points to `http://localhost:3000/api`. |
| 🛑 Login/Register fails | Delete your old MongoDB data and re-register new users. |
| 🗂️ Empty manga list | Run backend once to seed default manga automatically. |

---

## 🧰 9. Extra Commands

To stop the server:
```bash
Ctrl + C
```

To reinstall dependencies (if deleted):
```bash
npm install
```

---

## 🎓 10. Summary

You’re now ready to demo **MangaVerse** with these features:
✅ Stunning animated UI  
✅ Secure JWT login system  
✅ Reading history tracking  
✅ Review system with stars and comments  
✅ MongoDB database integration  

---

**Created by:** Your Team  
**Presented to:** Your Professor  
**Date:** October 16, 2025

✨ Enjoy showing off your project!
