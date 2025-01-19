import React from 'react';

import './mobileBlocker.css';

const MobileBlocker = () => {
  const handleLearnMore = () => {
    window.open('https://simply-minds.netlify.app/', '_blank');
  };

  return (
    <div id="mobile-blocker">
      <h1>Desktop Only</h1>
      <p>
        Sorry, this application is designed for desktop devices to provide the
        best user experience. Please access it from a desktop or laptop.
      </p>
      <button onClick={handleLearnMore}>Learn More</button>
    </div>
  );
};

export default MobileBlocker;
