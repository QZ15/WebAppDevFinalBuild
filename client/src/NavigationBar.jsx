// NavigationBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = ({ isLoggedIn }) => {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <>
          <li>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/survey" className={location.pathname === '/survey' ? 'active' : ''}>
              Survey
            </Link>
          </li>
          <li>
            {/* Add the following line for SurveyList */}
            <Link to="/SurveyList" className={location.pathname === '/SurveyList' ? 'active' : ''}>
              Survey List
            </Link>
          </li>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Signout
            </Link>
          </li>
        </>
      </ul>
    </nav>
  );
};

export default NavigationBar;
