import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios.js';
import './updatetask.scss';

const UpdateTask = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await makeRequest.get(`/tasks/current/${id}`);
                console.log(response);
                setTitle(response.data[0].title);
                setDescription(response.data[0].description);
                setStatus(response.data[0].status);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await makeRequest.put(`/tasks/${id}`, { title, description, status });
            navigate('/');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="task-form-container">
            <form className="task-form" onSubmit={handleSubmit}>
                <h2>Update Task</h2>
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
                <div className="form-group">
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="update-button">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;
