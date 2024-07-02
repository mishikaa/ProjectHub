// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './assets/styles/main.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/user/signin" element={<Signin />} />
                    <Route path="/user/signup" element={<Signup />} />
                    <Route path="/user/profile" element={<Profile />} />

                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
