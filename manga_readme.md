# Manga Website - Complete Setup Guide

A full-stack manga library website with user authentication, A-Z sorting, and search functionality.

## Features

✅ **User Authentication**
- User registration with password hashing
- Secure login system with JWT tokens
- Protected routes

✅ **Manga Library**
- Browse manga collection
- A-Z and Z-A sorting
- Real-time search functionality
- Beautiful responsive design

✅ **Security**
- Password hashing with bcrypt
- JWT token authentication
- Protected API endpoints

## Tech Stack

**Backend:**
- Node.js
- Express.js
- JWT for authentication
- Bcrypt for password hashing

**Frontend:**
- HTML5
- CSS3 (with animations)
- Vanilla JavaScript
- Responsive design

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- express
- bcryptjs
- jsonwebtoken
- cors

### Step 2: Project Structure

Create the following folder structure:

```
manga-website/
├── server.js          (Backend server)
├── package.json       (Dependencies)
├── public/
│   └── index.html    (Frontend)
└── README.md
```

### Step 3: Create the Public Folder

```bash
mkdir public
```

Move the `index.html` file into the `public` folder.

### Step 4: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Usage

### 1. Register a New Account
- Open `http://localhost:3000` in your browser
- Click "Register here"
- Fill in username, email, and password
- Click "Register"

### 2. Login
- Use your registered email and password
- Click "Login"

### 3. Browse Manga
- View all manga in the library
- Use the search box to filter by title
- Use the dropdown to sort A-Z or Z-A
- Click on manga cards for more details (expandable)

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Manga (Protected)
- `GET /api/mangas?sort=asc&search=keyword` - Get all manga with sorting and search
- `GET /api/mangas/:id` - Get specific manga details

## Customization

### Add More Manga
Edit the `mangas` array in `server.js`:

```javascript
const mangas = [
  {
    id: 11,
    title: 'Your Manga Title',
    author: 'Author Name',
    genre: 'Genre',
    chapters: 100,
    rating: 8.5,
    cover: 'image-url'
  }
];
```

### Change Secret Key
In production, change the SECRET_KEY in `server.js`:

```javascript
const SECRET_KEY = 'your-super-secure-secret-key-here';
```

### Database Integration
Replace the in-memory arrays with a real database:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- MySQL with Sequelize

Example with MongoDB:
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/manga-db');
```

## Security Notes

⚠️ **Important for Production:**

1. **Change the SECRET_KEY** - Use a strong, random secret key
2. **Use Environment Variables** - Store sensitive data in `.env` file
3. **Add Database** - Replace in-memory storage with a real database
4. **Add Input Validation** - Use libraries like `express-validator`
5. **Enable HTTPS** - Use SSL/TLS certificates
6. **Rate Limiting** - Add rate limiting to prevent abuse
7. **Password Requirements** - Enforce strong password policies

## Environment Variables (Recommended)

Create a `.env` file:

```env
PORT=3000
SECRET_KEY=your-secret-key-here
DB_CONNECTION=your-database-connection-string
```

Install dotenv:
```bash
npm install dotenv
```

Use in server.js:
```javascript
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
```

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in server.js or kill the process
lsof -ti:3000 | xargs kill
```

**CORS errors:**
- Make sure the frontend is accessing `http://localhost:3000`
- Check CORS configuration in server.js

**Token errors:**
- Clear localStorage in browser
- Re-login to get a new token

## Future Enhancements

- [ ] Add manga reading pages
- [ ] User favorites/bookmarks
- [ ] Comments and reviews
- [ ] Admin panel for managing manga
- [ ] File upload for manga covers
- [ ] Pagination for large collections
- [ ] User profiles and avatars
- [ ] Dark mode toggle

## License

MIT License - Feel free to use and modify for your projects

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API endpoints documentation
3. Ensure all dependencies are installed correctly

## Credits

Created with Node.js, Express, and vanilla JavaScript.