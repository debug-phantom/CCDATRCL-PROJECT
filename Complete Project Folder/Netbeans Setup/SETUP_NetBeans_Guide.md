# 🧩 MangaVerse NetBeans Setup Guide

This guide explains how to set up and run **MangaVerse** (frontend + backend) inside **Apache NetBeans** using Node.js and MongoDB.

---

## ⚙️ 1. Prerequisites

Before starting, make sure you have installed the following:

- **Node.js** → [https://nodejs.org/](https://nodejs.org/)
- **MongoDB** → [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **Apache NetBeans IDE** with **HTML5 / Node.js** plugin support

To verify Node.js installation, run this in terminal:
```bash
node -v
npm -v
```

---

## 📁 2. Create a Project Folder

1. Open **NetBeans**.
2. Go to **File → New Project → HTML5/JS Application** (or **Node.js Application**).
3. Name your project **MangaVerse**.
4. Choose a folder location (e.g., `Documents/MangaVerse`).

---

## 💾 3. Add Project Files

Copy your files into the project folder:

```
MangaVerse/
├── Manga_Back End.js
├── Manga_Front End.html
├── package.json
└── setup.md (optional)
```

Install dependencies in the terminal:
```bash
npm install express mongoose bcryptjs cors jsonwebtoken
```

---

## 🖥️ 4. Configure and Run Backend

1. In NetBeans, right-click the project → **Properties → Run**.
2. Set **Main File** to:
   ```
   Manga_Back End.js
   ```
3. Apply and click **OK**.
4. Start the server using **Run Project (F6)** or terminal:
   ```bash
   node "Manga_Back End.js"
   ```
5. Expected output:
   ```
   Server running on port 3000
   Connected to MongoDB
   ```

---

## 🌐 5. Run the Frontend

### Option 1: Run directly in browser
Right-click **Manga_Front End.html → Run File**  
This opens the website in your default browser.

### Option 2: Use a local dev server
If the API doesn’t load properly, run:
```bash
npx http-server .
```
Then open the displayed link (e.g., `http://127.0.0.1:8080`).

---

## 🧪 6. Test Functionality

1. Open your frontend in the browser.
2. Register a new account and log in.
3. Manga data and user info should load properly.
4. Check MongoDB — a new database named **mangaverse** will appear.

---

## 🧠 Optional Structure

You can organize your files like this:

```
MangaVerse/
├── backend/
│   ├── Manga_Back End.js
│   ├── package.json
│   └── node_modules/
└── frontend/
    ├── Manga_Front End.html
    └── assets/
```

Then update your frontend API URL:
```js
const API_URL = 'http://localhost:3000/api';
```

---

## ✅ Done!

Your **MangaVerse** project is now running on **NetBeans**, fully connected to **MongoDB**.
