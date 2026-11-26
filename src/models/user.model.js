import { pool } from "./db.js";

export const createUser = async ({
  identification,
  first_name,
  last_name,
  email,
  password,
  role_id,
  status = "active",
}) => {
  const cleanIdentification = identification?.trim();
  const cleanFirstName = first_name?.trim();
  const cleanLastName = last_name?.trim();
  const cleanEmail = email?.trim().toLowerCase();
  const cleanStatus = status?.trim();

  const query = `
    INSERT INTO "users" (
      "identification",
      "first_name",
      "last_name",
      "email",
      "password",
      "role_id",
      "status",
      "created_at",
      "updated_at"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
    RETURNING "user_id", "identification", "first_name", "last_name", "email", "role_id", "status", "created_at"
  `;

  const values = [
    cleanIdentification,
    cleanFirstName,
    cleanLastName,
    cleanEmail,
    password,
    role_id,
    cleanStatus,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const cleanEmail = email?.trim().toLowerCase();
  const { rows } = await pool.query(
    'SELECT * FROM "users" WHERE "email" = $1',
    [cleanEmail]
  );
  return rows[0];
};

export const findUserById = async (userId) => {
  const { rows } = await pool.query(
    'SELECT "user_id", "identification", "first_name", "last_name", "email", "role_id", "status", "created_at", "updated_at" FROM "users" WHERE "user_id" = $1',
    [userId]
  );
  return rows[0];
};