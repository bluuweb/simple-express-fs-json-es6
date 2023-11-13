-- CREATE DATABASE db_app_todo;

DROP TABLE IF EXISTS todos;

-- crear tabla todos
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false
);

-- insertar datos de ejemplo
INSERT INTO todos (title, done) VALUES ('Tarea 1', false);
INSERT INTO todos (title, done) VALUES ('Tarea 2', true);
INSERT INTO todos (title, done) VALUES ('Tarea 3', false);