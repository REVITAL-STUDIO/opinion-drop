import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envPath });

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432; // Default to 5432 if DB_PORT is not set or invalid

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.DB_PASSWORD,
  port: port,
  ssl: {
    rejectUnauthorized: false, 
  },
});

export default pool;