import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Admin layout and auth components
import AdminLayout from '../components/admin/layout/AdminLayout';
import AdminLogin from '../components/admin/auth/AdminLogin';

// Dashboard pages
import Dashboard from '../components/admin/dashboard/Dashboard';

// Blog management pages
import BlogList from '../components/admin/blogs/BlogList';
import BlogForm from '../components/admin/blogs/BlogForm';

// Project management pages
import ProjectList from '../components/admin/projects/ProjectList';
import ProjectForm from '../components/admin/projects/ProjectForm';

// Service management pages
import ServiceList from '../components/admin/services/ServiceList';
import ServiceForm from '../components/admin/services/ServiceForm';

// Team management pages
import TeamList from '../components/admin/team/TeamList';
import TeamForm from '../components/admin/team/TeamForm';

// Other admin pages
import TestimonialList from '../components/admin/testimonials/TestimonialList';
import TestimonialForm from '../components/admin/testimonials/TestimonialForm';
import Stats from '../components/admin/stats/Stats';
import MediaGallery from '../components/admin/media/MediaGallery';
import SeoManager from '../components/admin/seo/SeoManager';

// Protected route component to check admin authentication
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('adminToken');
  
  // If we have a token, render the child routes
  if (isAuthenticated) {
    return <Outlet />;
  }
  
  // If not authenticated, redirect to login
  return <Navigate to="/admin/login" />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public admin routes */}
      <Route path="login" element={<AdminLogin />} />
      
      {/* Protected admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Blog management */}
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/create" element={<BlogForm />} />
          <Route path="blogs/edit/:id" element={<BlogForm />} />
          
          {/* Project management */}
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/create" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          
          {/* Service management */}
          <Route path="services" element={<ServiceList />} />
          <Route path="services/create" element={<ServiceForm />} />
          <Route path="services/edit/:id" element={<ServiceForm />} />
          
          {/* Team management */}
          <Route path="team" element={<TeamList />} />
          <Route path="team/create" element={<TeamForm />} />
          <Route path="team/edit/:id" element={<TeamForm />} />
          
          {/* Testimonial management */}
          <Route path="testimonials" element={<TestimonialList />} />
          <Route path="testimonials/create" element={<TestimonialForm />} />
          <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
          
          {/* Stats and Analytics */}
          <Route path="stats" element={<Stats />} />
          
          {/* Media Gallery */}
          <Route path="media" element={<MediaGallery />} />
          
          {/* SEO Management */}
          <Route path="seo" element={<SeoManager />} />
        </Route>
      </Route>
      
      {/* Redirect /admin to /admin/dashboard */}
      <Route path="" element={<Navigate to="dashboard" replace />} />
      
      {/* Catch any other routes and redirect to dashboard */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes; 