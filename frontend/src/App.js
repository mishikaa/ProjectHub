// frontend/src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './assets/styles/main.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/Auth/rivateRoute';
import ProjectPage from './components/Project/ProjectPage';
// import { messaging } from './firebase';

const App = () => {
    // useEffect(() => {
    //     // Request permission and get FCM token
    //     messaging.requestPermission()
    //       .then(() => {
    //         return messaging.getToken();
    //       })
    //       .then((token) => {
    //         console.log('FCM Token:', token);
    //         // Send this token to your backend to associate with the user
    //       })
    //       .catch((error) => {
    //         console.error('Error getting FCM token:', error);
    //       });
    //   }, []);
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/user/signin" element={<Signin />} />
                    <Route path="/user/signup" element={<Signup />} />
                    <Route path="/user/profile" element={<Profile />} />
                    {/* <Route exact path="/dashboard" element={<PrivateRoute element={Dashboard} />} /> */}
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects/:id" element={<ProjectPage />} />
                    <Route path="/user/profile/:id" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
