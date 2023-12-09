// SurveyList.jsx
import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import axios from 'axios';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Fetch user-specific surveys when the component mounts
    const fetchSurveys = async () => {
      try {
        // Replace 'userId' with the actual user ID or authentication token
        const response = await axios.get(`http://localhost:3000/surveys?userId=userId`);
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error.message);
      }
    };

    fetchSurveys();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleUpdateSurvey = (surveyId) => {
    // Implement the logic to update the survey with the given ID
    console.log(`Update survey with ID: ${surveyId}`);
  };

  const handleDeleteSurvey = (surveyId) => {
    // Implement the logic to delete the survey with the given ID
    console.log(`Delete survey with ID: ${surveyId}`);
  };

  return (
    <div>
      <NavigationBar />
      <h2>Your Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey._id}>
            {/* Display survey details here */}
            {survey.schoolName} - Online Rating: {survey.onlineClassesRating} - In-Person Rating: {survey.inPersonClassesRating}
            {/* Add update and delete buttons */}
            <button onClick={() => handleUpdateSurvey(survey._id)}>Update</button>
            <button onClick={() => handleDeleteSurvey(survey._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;
