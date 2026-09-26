import { pool } from "../../db"

const createProductIntoDB = async (payload: any) => {
  const { user_id, name, price, description } = payload

  // ১. ইউজার আছে কিনা চেক করা
  const user = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [user_id]
  )

  if (user.rows.length === 0) {
    throw new Error("User does not exist")
  }

  // ২. ইউজার থাকলে products টেবিলে ডাটা ইনসার্ট করা
  const result = await pool.query(
    `INSERT INTO products(name, price, description) VALUES($1, $2, $3) RETURNING *`,
    [name, price, description]
  )

  return result
}

export const productService = {
  createProductIntoDB
}