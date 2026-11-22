require('dotenv').config({ quiet: true });
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./db');
const { requireAuth } = require('./lib/auth');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/classes', requireAuth, require('./routes/classes'));
app.use('/api/students', requireAuth, require('./routes/students'));
app.use('/api/attendance', requireAuth, require('./routes/attendance'));
app.use('/api/payments', requireAuth, require('./routes/payments'));
app.use('/api/reports', requireAuth, require('./routes/reports'));
app.use('/api/dashboard', requireAuth, require('./routes/dashboard'));
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

app.use(express.static(path.join(__dirname, 'public')));

// Error handler: friendly JSON for the browser
app.use((err, req, res, next) => {
  if (err.status) return res.status(err.status).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

const PORT = Number(process.env.PORT) || 3000;
db.init()
  .then(() => app.listen(PORT, () => console.log(`\nAttendance & Fees app running:  http://localhost:${PORT}\n`)))
  .catch((e) => {
    console.error('\nCould not connect to MySQL: ' + e.message);
    console.error('Check DB_HOST / DB_USER / DB_PASSWORD in your .env file and that MySQL is running.\n');
    process.exit(1);
  });
