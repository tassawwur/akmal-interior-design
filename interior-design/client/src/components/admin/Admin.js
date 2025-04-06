import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './auth/AdminLogin';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './AdminDashboard';

// Function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const Admin = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin dashboard as index route */}
        <Route index element={<AdminDashboard />} />
        
        {/* Add more admin routes here */}
        {/* <Route path="blogs" element={<BlogsManager />} /> */}
        {/* <Route path="projects" element={<ProjectsManager />} /> */}
        {/* <Route path="services" element={<ServicesManager />} /> */}
        {/* <Route path="team" element={<TeamManager />} /> */}
      </Route>
      
      {/* Redirect any undefined admin routes to admin dashboard */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default Admin; 