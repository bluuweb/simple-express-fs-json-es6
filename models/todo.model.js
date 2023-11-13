import { pool } from "../database/connection.js";

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM todos");
  return rows;
};

const findById = async (id) => {
  const query = "SELECT * FROM todos WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const create = async (todo) => {
  const query = "INSERT INTO todos (title, done) VALUES ($1, $2) RETURNING *";
  const { rows } = await pool.query(query, [todo.title, todo.done]);
  return rows[0];
};

const remove = async (id) => {
  const query = "DELETE FROM todos WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const update = async (id) => {
  const query = "UPDATE todos SET done = NOT done WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const todoModel = {
  findAll,
  findById,
  create,
  remove,
  update,
};
