# 📘 MangaVerse Full Setup Guide (MongoDB + Node.js)

This guide will help you set up and run your **MangaVerse** project with a real MongoDB database.

---

## 🧩 Project Overview

MangaVerse is a full-stack web application that lets users:
- Register and log in securely
- Browse and search manga titles
- View a beautiful animated frontend UI
- Communicate with a Node.js + Express backend
- Store user and manga data in a MongoDB database

---

## 🛠️ Prerequisites

Before starting, make sure you have:

1. **Node.js** (v16 or later)
   - [Download Node.js](https://nodejs.org/)

2. **MongoDB**
   - Option 1: Install **MongoDB locally**
     - [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
   - Option 2: Use **MongoDB Atlas (Online)**
     - [MongoDB Atlas Sign Up](https://www.mongodb.com/cloud/atlas)

3. **Git** *(optional, but recommended)*

---

## 📂 Folder Structure

Your project should look like this:

```
mangaverse/
├── public/
│   └── manga_frontend.html
├── manga_backend.js
├── package.json
└── README.md
```

> The `public` folder will serve your frontend files.

---

## ⚙️ Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm init -y
npm install express bcryptjs jsonwebtoken cors mongoose
```

This installs all required packages.

---

## 🧱 Step 2: Set Up MongoDB Connection

### ▶️ Option A — Local MongoDB
Start your MongoDB server:
```bash
mongod
```

Your backend code already connects here:
```js
mongoose.connect('mongodb://localhost:27017/mangaverse');
```

### ▶️ Option B — MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **free cluster**.
3. Add a new database user with a password.
4. Get your connection string (example):
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/mangaverse
   ```
5. Replace the connection line in `manga_backend.js`:
   ```js
   mongoose.connect('your-connection-string-here');
   ```

---

## 💾 Step 3: Add the Backend File

Use this file as your backend:
- `manga_backend.js` (Node.js + MongoDB + JWT + Express)

This file handles:
- User registration & login
- Password hashing (bcrypt)
- Token authentication (JWT)
- Manga list management

---

## 🎨 Step 4: Add the Frontend File

Place your `manga_frontend.html` inside the `/public` folder:
```
mangaverse/public/manga_frontend.html
```

This file:
- Connects to the backend API at `http://localhost:3000/api`
- Lets users log in, register, and view manga

---

## 🚀 Step 5: Run the Application

Run the server:
```bash
node manga_backend.js
```

If everything works, you’ll see:
```
✅ Connected to MongoDB
🚀 Server running at http://localhost:3000
📚 Default mangas inserted.
```

Then open your browser and visit:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 Default Routes

| Method | Endpoint | Description | Auth Required |
|:-------|:----------|:-------------|:--------------|
| `POST` | `/api/register` | Register a new user | No |
| `POST` | `/api/login` | Log in and receive JWT token | No |
| `GET` | `/api/mangas` | Get list of all mangas | Yes |
| `GET` | `/api/mangas/:id` | Get single manga details | Yes |

---

## 🧪 Testing with Postman

You can test API routes using [Postman](https://www.postman.com/).

1. Register a user with `POST /api/register`
2. Copy the `token` from the response
3. Use that token in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your_token>
   ```

---

## 🧰 Optional: Auto-Restart for Development

You can use `nodemon` to automatically restart your backend when files change:

```bash
npm install -g nodemon
nodemon manga_backend.js
```

---

## 🧼 Troubleshooting

| Problem | Cause | Solution |
|----------|--------|----------|
| `MongoNetworkError` | MongoDB not running | Start MongoDB (`mongod`) |
| `EADDRINUSE: Port 3000` | Port in use | Change `PORT` in code |
| `Invalid token` | Expired or malformed JWT | Log in again |

---

## 💡 Notes

- User passwords are **hashed** using bcrypt (secure).
- Tokens expire after **24 hours**.
- The default manga data is inserted once (if collection is empty).
- You can edit or add manga manually through MongoDB Compass or Atlas UI.

---

## 🏁 You're Done!

You now have a fully working **MangaVerse web app** with:
- A stunning animated frontend
- Node.js + Express backend
- MongoDB database with user and manga storage

Enjoy building your manga universe! 🌸
