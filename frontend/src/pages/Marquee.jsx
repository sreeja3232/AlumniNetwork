

import React from 'react';

// Simple Marquee Component
const Marquee = ({ text }) => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <marquee>{text}</marquee>
    </div>
  );
};

export default Marquee;
