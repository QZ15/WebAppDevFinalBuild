import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Homepage from './Homepage';
import SurveyForm from './SurveyForm'; 
import UserProfile from './UserProfile'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/profile" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
