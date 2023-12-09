import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Sending request with credentials:", email, password);
      const response = await axios.post('http://localhost:3000/api/users/signin', { email, password });
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful');
  
        // Redirect to the homepage after successful login
        navigate('/homepage');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message, " PW:", password);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form>
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

        {/* Login Button */}
        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {/* Registration Button */}
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
