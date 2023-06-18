const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json());

// REST API

// Create New Task
app.post('/tasks', async (req, res) => {
    try {
        const { description, priority, status } = req.body;
        const newTask = await pool.query(
            'INSERT INTO task (description, priority, status) VALUES ($1, $2, $3) RETURNING *',
            [description, priority, status]
        );
        res.json(newTask.rows);
    } catch (err) { console.error(err.message); }

})

// GET List of Tasks
app.get('/tasks', async (req, res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task');

        res.json(allTasks.rows);
    } catch (err) { console.error(err.message); }
});

// GET Task details by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query(
            'SELECT * FROM task WHERE task_id = $1', [id]
        );

        res.json(task.rows);
    } catch (err) { console.error(err.message); }
})

// Update Task by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description, priority, status } = req.body;
        const updateTask = await pool.query(
            'UPDATE task SET description = $1, priority = $2, status = $3 WHERE task_id = $4',
            [description, priority, status, id]
        );

        res.json("Task Updated");
    } catch (err) { console.error(err.message); }
});

// Delete Task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query('DELETE FROM task WHERE task_id = $1',
            [id]
        );

        res.json("Task Deleted");
    } catch (err) { console.error(err.message); }
})


app.listen(port, () => {
    console.log(`Server started on port: ${port} `)
})