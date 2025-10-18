// MangaVerse Backend (with Links)

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// --- INITIAL SETUP ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_super_secret_key';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mangaverse')
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- DATABASE SCHEMAS & MODELS ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  history: [{
    mangaTitle: String,
    chaptersRead: Number,
    date: { type: Date, default: Date.now }
  }]
});

const mangaSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  cover: String,
  chapters: Number,
  rating: Number,
  // **NEW:** Added a field for an external link
  link: { type: String, default: '#' },
  reviews: [{
    username: String,
    review: String,
    date: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model('User', userSchema);
const Manga = mongoose.model('Manga', mangaSchema);

// --- AUTH MIDDLEWARE ---
// ... (verifyToken function remains the same) ...
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

// --- API ROUTES ---
// ... (register, login routes remain the same) ...
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed. The email might already be in use.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed due to a server error.' });
  }
});


// MODIFIED: Seed data now includes a 'link' for each manga
app.post('/api/mangas/seed', async (req, res) => {
    try {
        await Manga.deleteMany({});
        const sampleMangas = [
            { title: "Attack on Titan", author: "Hajime Isayama", chapters: 139, rating: 4.8, genre: "Action, Fantasy", cover: "https://placehold.co/240x340/a32a28/ffffff?text=Attack+on+Titan", link: "https://www.viz.com/shonenjump/chapters/attack-on-titan" },
            { title: "Bleach", author: "Tite Kubo", chapters: 686, rating: 4.5, genre: "Shonen", cover: "https://placehold.co/240x340/1a1a1a/ffffff?text=Bleach", link: "https://www.viz.com/shonenjump/chapters/bleach" },
            { title: "One Piece", author: "Eiichiro Oda", chapters: 1100, rating: 4.9, genre: "Adventure", cover: "https://placehold.co/240x340/0077c2/ffffff?text=One+Piece", link: "https://www.viz.com/shonenjump/chapters/one-piece" },
            { title: "Naruto", author: "Masashi Kishimoto", chapters: 700, rating: 4.7, genre: "Action, Ninja", cover: "https://placehold.co/240x340/ff7f00/ffffff?text=Naruto", link: "https://www.viz.com/shonenjump/chapters/naruto" },
            { title: "Jujutsu Kaisen", author: "Gege Akutami", chapters: 230, rating: 4.9, genre: "Supernatural", cover: "https://placehold.co/240x340/7b2cbf/ffffff?text=Jujutsu+Kaisen", link: "https://www.viz.com/shonenjump/chapters/jujutsu-kaisen" }
        ];
        const result = await Manga.insertMany(sampleMangas);
        res.status(201).json({ message: `${result.length} manga titles were successfully added.` });
    } catch (err) {
        res.status(500).json({ message: 'Error seeding manga data.' });
    }
});

// ... (GET /api/mangas, GET /api/mangas/:id, reviews, and history routes remain the same) ...
app.get('/api/mangas', verifyToken, async (req, res) => {
  try {
    const { sort = 'asc', search = '' } = req.query;
    const mangas = await Manga.find({ title: { $regex: search, $options: 'i' } })
      .sort({ title: sort === 'asc' ? 1 : -1 });
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ message: 'Error loading mangas.' });
  }
});

app.get('/api/mangas/:id', verifyToken, async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id);
        if (!manga) return res.status(404).json({ message: 'Manga not found.' });
        res.json(manga);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load manga details.' });
    }
});

app.post('/api/mangas/:id/reviews', verifyToken, async (req, res) => {
  try {
    const { review } = req.body;
    const manga = await Manga.findById(req.params.id);
    if (!manga) return res.status(404).json({ message: 'Manga not found.' });
    manga.reviews.push({ username: req.user.username, review });
    await manga.save();
    res.status(201).json({ message: 'Review added successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review.' });
  }
});

app.post('/api/history', verifyToken, async (req, res) => {
  try {
    const { mangaTitle, chaptersRead } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    user.history.push({ mangaTitle, chaptersRead, date: new Date() });
    await user.save();
    res.status(201).json(user.history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update history.' });
  }
});

app.get('/api/history', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user.history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load history.' });
  }
});


// --- SERVE FRONTEND ---
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Manga_FrontEnd_Revised.html'));
});

// --- START SERVER ---
app.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT}`));

