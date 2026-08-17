import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'resumecraft-secret-key-2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Root Route & Automatic Redirect to Frontend
app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.redirect('http://localhost:5173');
  }
  res.json({
    message: 'ResumeCraft API Backend Server is running!',
    frontendUrl: 'http://localhost:5173',
    status: 'healthy'
  });
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
        isGuest: false
      }
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      user: { id: user.id, email: user.email, name: user.name, isGuest: user.isGuest },
      token
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Email or password is wrong try again.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Email or password is wrong try again.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      user: { id: user.id, email: user.email, name: user.name, isGuest: user.isGuest },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/guest', async (req, res) => {
  try {
    const guestId = Date.now();
    const email = `guest_${guestId}@guest.local`;
    const hashedPassword = await bcrypt.hash(`guest_${guestId}`, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Guest User',
        isGuest: true
      }
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      user: { id: user.id, email: user.email, name: user.name, isGuest: user.isGuest },
      token
    });
  } catch (err) {
    console.error('Guest login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, isGuest: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Resume Helper
const formatResume = (r) => {
  if (!r) return r;
  let parsedData = r.data;
  if (typeof r.data === 'string') {
    try { parsedData = JSON.parse(r.data); } catch (e) { parsedData = {}; }
  }
  return { ...r, data: parsedData };
};

// Resume CRUD Routes
app.get('/api/resumes', authenticateToken, async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(resumes.map(formatResume));
  } catch (err) {
    console.error('Fetch resumes error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/resumes/:id', authenticateToken, async (req, res) => {
  try {
    const resume = await prisma.resume.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(formatResume(resume));
  } catch (err) {
    console.error('Fetch resume error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/resumes', authenticateToken, async (req, res) => {
  const { title, data } = req.body;
  try {
    const stringifiedData = typeof data === 'object' ? JSON.stringify(data) : (data || '{}');
    const resume = await prisma.resume.create({
      data: {
        userId: req.user.id,
        title: title || 'Untitled Resume',
        data: stringifiedData
      }
    });
    res.status(201).json(formatResume(resume));
  } catch (err) {
    console.error('Create resume error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/resumes/:id', authenticateToken, async (req, res) => {
  const { title, data } = req.body;
  try {
    const existing = await prisma.resume.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!existing) return res.status(404).json({ error: 'Resume not found' });

    const stringifiedData = data ? (typeof data === 'object' ? JSON.stringify(data) : data) : existing.data;
    const updated = await prisma.resume.update({
      where: { id: req.params.id },
      data: {
        title: title || existing.title,
        data: stringifiedData,
        updatedAt: new Date()
      }
    });
    res.json(formatResume(updated));
  } catch (err) {
    console.error('Update resume error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/api/resumes/:id', authenticateToken, async (req, res) => {
  try {
    const existing = await prisma.resume.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!existing) return res.status(404).json({ error: 'Resume not found' });

    await prisma.resume.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (err) {
    console.error('Delete resume error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
