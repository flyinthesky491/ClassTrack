require('dotenv').config({ quiet: true });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const base = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};
const DB_NAME = process.env.DB_NAME || 'attendance_fees';
let pool;

// Creates the database and tables if they do not exist yet, then opens a pool.
async function init() {
  const conn = await mysql.createConnection({ ...base, multipleStatements: true });
  const sql = fs
    .readFileSync(path.join(__dirname, 'database', 'schema.sql'), 'utf8')
    .replace(/attendance_fees/g, DB_NAME);
  await conn.query(sql);
  await conn.end();
  pool = mysql.createPool({
    ...base,
    database: DB_NAME,
    dateStrings: true,      // DATE columns come back as 'YYYY-MM-DD' text
    decimalNumbers: true,   // DECIMAL columns come back as numbers
    connectionLimit: 10,
    charset: 'utf8mb4',
  });
}

async function q(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = { init, q, DB_NAME };
