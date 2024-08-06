

// HomePage.js
import React from 'react';
import Marquee from './Marquee'; // Adjust the import path as needed
import SplitPage from './SplitPage'; // Adjust the import path as needed
// import Contact from './Contact'; // Adjust the import path as needed

const HomePage = () => {
  return (
    <>
      <Marquee text="Welcome to Our Alumni Website!"/>
      <SplitPage />
      {/* <Contact /> */}
    </>
  );
}

export default HomePage;
