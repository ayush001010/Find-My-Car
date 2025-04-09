import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  // Basic check in case message is accidentally null or undefined
  if (!message) {
      return null; // Render nothing if no message
  }

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

// Define PropTypes for runtime checking
ErrorMessage.propTypes = {
  message: PropTypes.string, 
};


export default ErrorMessage;