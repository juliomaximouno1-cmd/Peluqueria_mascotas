import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const connectDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(">>> PostgreSQL connected:", res.rows[0].now);
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error.message);
  }
};