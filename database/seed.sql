-- CREATE DATABASE db_app_todo;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS todos;

-- Crear tabla "users"
CREATE TABLE users (
  	user_id SERIAL PRIMARY KEY,
  	username VARCHAR(50),
  	email VARCHAR(100) NOT NULL UNIQUE,
	  password VARCHAR(300) NOT NULL
);

-- crear tabla todos
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

-- insertar datos de ejemplo
-- INSERT INTO todos (title, done) VALUES ('Tarea 1', false);
-- INSERT INTO todos (title, done) VALUES ('Tarea 2', true);
-- INSERT INTO todos (title, done) VALUES ('Tarea 3', false);