import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios.js';
import './dashboard.scss';
import TaskList from '../tasklist/TaskList.jsx';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const userName = localStorage.getItem("name")


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await makeRequest.get('/tasks');
                console.log(response)
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleCreateTask = () => {
        navigate('/create-task');
    };

    const handleUpdateTask = (taskId) => {
        navigate(`/update-task/${taskId}`);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await makeRequest.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Welcome {userName} to your Task Dashboard</h2>
            <button className="create-task-button" onClick={handleCreateTask}>Create New Task</button>
            <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        </div>
    );
};

export default Dashboard;
