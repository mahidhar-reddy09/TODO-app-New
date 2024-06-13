import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import HomePage from './pages/home/Home.jsx';
import { isAuthenticated } from './utils/Auth.js';
import CreateTask from './pages/createtask/CreateTask.jsx';
import UpdateTask from './pages/updatetask/UpdateTask.jsx';

function App() {

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/create-task",
      element: <CreateTask/>
    },
    {
      path: "/update-task/:id",
      element: <UpdateTask/>
    }

  ]);

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
