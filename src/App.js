import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './protected/protected-route';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/auth/Profile';

function App() {
  return (
    <BrowserRouter>
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
      
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Authenticated Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/auth/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/auth/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }  
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
