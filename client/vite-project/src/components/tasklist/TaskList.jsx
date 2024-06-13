import React from 'react';


const TaskList = ({ tasks, onUpdate, onDelete }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <div className="task-item" key={task.id}>
                    <h3>{task.title}</h3>
                    <h3>{task.description}</h3>
                    <div className="task-buttons">
                        <span className={`status-indicator ${task.status}`}></span>
                        <button className="update-button" onClick={() => onUpdate(task.id)}>Update</button>
                        <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
