CREATE DATABASE tasks;

CREATE TYPE priority_check AS ENUM('High', 'Medium', 'Low');
CREATE TYPE status_check AS ENUM('To Do', 'In Progress', 'Done');

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(100),
    priority priority_check,
    status status_check
);