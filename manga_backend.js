const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key-change-this-in-production';

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// In-memory databases (replace with real database in production)
const users = [];
const mangas = [
  { id: 1, title: 'Attack on Titan', author: 'Hajime Isayama', genre: 'Action', chapters: 139, rating: 9.0, cover: 'https://via.placeholder.com/200x280?text=AOT' },
  { id: 2, title: 'Berserk', author: 'Kentaro Miura', genre: 'Dark Fantasy', chapters: 364, rating: 9.5, cover: 'https://via.placeholder.com/200x280?text=Berserk' },
  { id: 3, title: 'Chainsaw Man', author: 'Tatsuki Fujimoto', genre: 'Action', chapters: 97, rating: 8.8, cover: 'https://via.placeholder.com/200x280?text=CSM' },
  { id: 4, title: 'Death Note', author: 'Tsugumi Ohba', genre: 'Psychological', chapters: 108, rating: 9.0, cover: 'https://via.placeholder.com/200x280?text=DN' },
  { id: 5, title: 'One Piece', author: 'Eiichiro Oda', genre: 'Adventure', chapters: 1100, rating: 9.2, cover: 'https://via.placeholder.com/200x280?text=OP' },
  { id: 6, title: 'Naruto', author: 'Masashi Kishimoto', genre: 'Action', chapters: 700, rating: 8.5, cover: 'https://via.placeholder.com/200x280?text=Naruto' },
  { id: 7, title: 'Tokyo Ghoul', author: 'Sui Ishida', genre: 'Horror', chapters: 143, rating: 8.7, cover: 'https://via.placeholder.com/200x280?text=TG' },
  { id: 8, title: 'Vinland Saga', author: 'Makoto Yukimura', genre: 'Historical', chapters: 200, rating: 9.1, cover: 'https://via.placeholder.com/200x280?text=VS' },
  { id: 9, title: 'Fullmetal Alchemist', author: 'Hiromu Arakawa', genre: 'Adventure', chapters: 116, rating: 9.3, cover: 'https://via.placeholder.com/200x280?text=FMA' },
  { id: 10, title: 'Demon Slayer', author: 'Koyoharu Gotouge', genre: 'Action', chapters: 205, rating: 8.6, cover: 'https://via.placeholder.com/200x280?text=DS' }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(user);

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Manga Routes (Protected)
app.get('/api/mangas', authenticateToken, (req, res) => {
  const { sort = 'asc', search = '' } = req.query;
  
  let filteredMangas = mangas.filter(manga => 
    manga.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sort A-Z or Z-A
  filteredMangas.sort((a, b) => {
    if (sort === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  res.json(filteredMangas);
});

app.get('/api/mangas/:id', authenticateToken, (req, res) => {
  const manga = mangas.find(m => m.id === parseInt(req.params.id));
  if (!manga) {
    return res.status(404).json({ message: 'Manga not found' });
  }
  res.json(manga);
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Instructions to run:
// 1. Install dependencies: npm install express bcryptjs jsonwebtoken cors
// 2. Create a 'public' folder in the same directory
// 3. Place the frontend files in the 'public' folder
// 4. Run: node server.js