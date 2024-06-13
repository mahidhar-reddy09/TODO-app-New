import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios.js';
import './createtask.scss';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await makeRequest.post('/tasks', { title, description });
            navigate('/');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="task-form-container">
            <form className="task-form" onSubmit={handleSubmit}>
                <h2>Create New Task</h2>
                <div className="form-group">
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        placeholder="Enter task title"
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                        placeholder="Enter task description"
                    ></textarea>
                </div>
                <button type="submit" className="create-button">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
