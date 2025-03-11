import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to the OpenAI Prompt App</h1>
      <Link to="/prompt">Go to Prompt</Link>
    </div>
  );
};

export default Welcome;