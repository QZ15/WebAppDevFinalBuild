import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the server to store the account details
    axios
      .post('http://localhost:3000/api/users', { name, email, password })
      .then((result) => {
        console.log('Registration successful:', result.data);
        // Perform any additional actions after successful registration
      })
      .catch((err) => {
        console.error('Registration error:', err);
        // Handle registration error (e.g., display an error message)
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Field */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Register Button */}
        <button type="submit">Register</button>

        {/* Login Button */}
        <Link to="/">
          <button type="button">Go to Login</button>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
