import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// --- PUBLIC PAGES ---
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUsPage from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import UserDashboard from './pages/UserDashboard';
import BrowsePage from './pages/BrowsePage';
import MyMessagesPage from './pages/MyMessagesPage';
import ChatPage from './pages/ChatPage';


// --- PROPERTY MANAGEMENT PAGES (User/Owner Side) ---
import MyPropertiesPage from './pages/MyPropertiesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import WishlistPage from './pages/WishlistPage';
import MyVisitsPage from './pages/MyVisitsPage';


// --- LAYOUTS ---
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

// --- ADMIN PAGES ---
import Dashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageProperties from './pages/admin/ManageProperties';
import ManageBookings from './pages/admin/ManageBooking';

// Simple placeholder
const MyVisits = () => (
  <div className="p-4 text-center">
    <h2>My Visits</h2>
    <p>Customer's booked visits.</p>
  </div>
);

// --- ProtectedRoute (login required) ---
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // or a small loader

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// --- AdminRoute (admin role required) ---
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    // non-admin trying to hit /admin routes
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER AREA (with UserLayout) */}
        <Route path="/" element={<UserLayout />}>
          {/* Public user-facing routes */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="browse" element={<BrowsePage />} />

          {/* Property routes (public + protected) */}
          <Route path="properties/:id" element={<PropertyDetailPage />} />

          <Route
            path="properties/add"
            element={
              <ProtectedRoute>
                <AddPropertyPage />
              </ProtectedRoute>
            }
          />

          <Route
  path="chats"
  element={
    <ProtectedRoute>
      <MyMessagesPage />
    </ProtectedRoute>
  }
/>

<Route
  path="chats/:propertyId"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>


          <Route
            path="properties/edit/:id"
            element={
              <ProtectedRoute>
                <EditPropertyPage />
              </ProtectedRoute>
            }
          />

          {/* Protected User Routes */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="my-properties"
            element={
              <ProtectedRoute>
                <MyPropertiesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="my-visits"
            element={
              <ProtectedRoute>
                <MyVisitsPage />
              </ProtectedRoute>
            }
          />
          /</Route>

          <Route
            path="my-messages"
            element={
              <ProtectedRoute>
                <MyMessagesPage />
              </ProtectedRoute>
            }
          />




        <Route
          path="wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />


        {/* ADMIN AREA */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="properties" element={<ManageProperties />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
