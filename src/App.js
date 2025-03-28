import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       {/**
        * Home Route
        */}
      <Route path="/" element={<Home />} />
      {/**
       * Authenticated Routes
       */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
