

import React from 'react';
import CarouselComponent from './CarouselComponent';

// Split Page Component
const SplitPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <h2>College Description</h2>
        <p>This section contains the college description...</p>
      </div>
      <div style={{ flex: 1 }}>
        <CarouselComponent />
      </div>
    </div>
  );
};

export default SplitPage;
