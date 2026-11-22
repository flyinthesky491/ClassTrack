# Class Attendance and Fee Management System

A website for a teacher to keep **student attendance** and **fee records** in one place.
Works on a phone, tablet or computer.

**Tech:** HTML / CSS / JavaScript (front end) · Node.js + Express (back end) · MySQL database (managed with SQLyog) · PDF reports with PDFKit.

## Features
- Teacher login (password stored securely, hashed)
- Classes / batches with a default monthly fee
- Add, edit, deactivate and delete students
- Mark attendance for a whole class on one screen (P / A / L), for any date
- Record fee payments (amount, date, mode, month covered); pending balance is calculated automatically
- Printable PDF receipt for every payment
- Dashboard: today's attendance, fees collected this month, total pending, low-attendance and unpaid students
- Monthly attendance and fee reports – view on screen, download CSV (Excel) or open as PDF

## How the numbers are worked out
- Attendance % = Present ÷ (Present + Absent) for the month. Leave is not counted against the student. Below 75% is shown as "low".
- Fees due = monthly fee × months since the joining month (joining month counts).
- Pending = fees due − all payments received. Negative = paid in advance.

## Folder structure
```
server.js            starts the website
db.js                MySQL connection; creates database + tables on first start
database/schema.sql  all tables (you can also run this in SQLyog)
lib/                 helpers (login, calculations, PDF)
routes/              API: auth, classes, students, attendance, payments, reports, dashboard
public/              the web pages (index.html, css/, js/app.js)
.env                 your settings (MySQL password etc.)
```

## Database tables
`teachers`, `classes`, `students`, `attendance` (unique per student per day), `payments`.
