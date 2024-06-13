import { db } from "../connect.js";

export const getTasks = (req, res) => {
    const userId = req.userId;
    const q = "SELECT * FROM tasks WHERE user_id = ?"

    db.query(q, [userId], (err, data) => {
        if(err){
            return res.status(500).json({ message: "Error retrieving tasks", error: err });
        }
        res.status(200).json(data)
    })

};

export const getCurrentTasks = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id
    const q = "SELECT * FROM tasks WHERE id = ? AND user_id = ?"

    db.query(q, [taskId, userId], (err, data) => {
        if(err){
            return res.status(500).json({ message: "Error retrieving tasks", error: err });
        }
        res.status(200).json(data)
    })
} 

export const createTask = (req, res) => {
    const userId = req.userId
    const {title, description} = req.body
    const q = "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)"

    db.query(q, [userId, title, description], (err, results) => {

        if (err) {
            return res.status(500).json({ message: "Error creating task", error: err });
        }
        res.status(201).json({ id: results.insertId, user_id: userId, title, description, status: 'pending' });

    })

};

export const updateTask = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id
    const {title, description, status} = req.body
    const q = "UPDATE tasks SET title = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP where id = ? AND user_id = ?"
    db.query(q, [title, description, status, taskId, userId], (err, results) => {
        if (err){
            return res.status(500).json({ message: "Error updating task", error: err });
        }

        if(results.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.status(200).json("Updated tasks successfully!")
    })
};

export const deleteTask = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id

    const q = "DELETE FROM tasks WHERE id = ? AND user_id = ?"
    db.query(q, [taskId, userId], (err, results) => {
        if (err){
            return res.status(500).json({message: "Error deleting tasks", error: err})
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }
        res.status(200).json({ message: "Task deleted successfully" });

    })
};
