const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// 🟢 Connect MongoDB
mongoose.connect('mongodb://localhost:27017/mangaverse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB error:', err));

// 🧱 Schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const mangaSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  chapters: Number,
  rating: Number,
  cover: String
});

const historySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  mangaId: mongoose.Schema.Types.ObjectId,
  title: String,
  lastReadChapter: Number,
  lastReadAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Manga = mongoose.model('Manga', mangaSchema);
const History = mongoose.model('History', historySchema);

// 📚 Seed default manga
(async () => {
  const count = await Manga.countDocuments();
  if (count === 0) {
    await Manga.insertMany([
      { title: 'Attack on Titan', author: 'Hajime Isayama', genre: 'Action', chapters: 139, rating: 9.0, cover: 'https://via.placeholder.com/200x280?text=AOT' },
      { title: 'Berserk', author: 'Kentaro Miura', genre: 'Dark Fantasy', chapters: 364, rating: 9.5, cover: 'https://via.placeholder.com/200x280?text=Berserk' },
      { title: 'Chainsaw Man', author: 'Tatsuki Fujimoto', genre: 'Action', chapters: 97, rating: 8.8, cover: 'https://via.placeholder.com/200x280?text=CSM' },
      { title: 'Death Note', author: 'Tsugumi Ohba', genre: 'Psychological', chapters: 108, rating: 9.0, cover: 'https://via.placeholder.com/200x280?text=DN' },
      { title: 'One Piece', author: 'Eiichiro Oda', genre: 'Adventure', chapters: 1100, rating: 9.2, cover: 'https://via.placeholder.com/200x280?text=OP' },
      { title: 'Naruto', author: 'Masashi Kishimoto', genre: 'Action', chapters: 700, rating: 8.5, cover: 'https://via.placeholder.com/200x280?text=Naruto' },
    ]);
    console.log('📚 Default mangas inserted.');
  }
})();

// 🔐 JWT Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// 🧍 Register
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    const token = jwt.sign({ id: user._id, email }, SECRET_KEY, { expiresIn: '24h' });
    res.status(201).json({ token, user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// 📚 Get all mangas
app.get('/api/mangas', authenticateToken, async (req, res) => {
  const { sort = 'asc', search = '' } = req.query;
  const mangas = await Manga.find({
    title: { $regex: search, $options: 'i' }
  }).sort({ title: sort === 'asc' ? 1 : -1 });
  res.json(mangas);
});

// 📖 View a manga (and record in reading history)
app.get('/api/mangas/:id', authenticateToken, async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    if (!manga) return res.status(404).json({ message: 'Manga not found' });

    // Update reading history
    await History.findOneAndUpdate(
      { userId: req.user.id, mangaId: manga._id },
      {
        title: manga.title,
        lastReadChapter: manga.chapters,
        lastReadAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({
      title: manga.title,
      author: manga.author,
      chapters: manga.chapters,
      genre: manga.genre,
      message: `You viewed ${manga.title}. It has ${manga.chapters} chapters.`,
    });
  } catch {
    res.status(500).json({ message: 'Failed to load manga' });
  }
});

// 🕒 Get reading history
app.get('/api/history', authenticateToken, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ lastReadAt: -1 });
    res.json(history);
  } catch {
    res.status(500).json({ message: 'Failed to load reading history' });
  }
});

// Serve frontend
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'manga_frontend.html')));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
