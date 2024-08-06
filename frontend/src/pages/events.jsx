

// import React, { useState } from 'react';
// import './events.css';

// function Events() {
//   const [selectedItem, setSelectedItem] = useState(null);

//   const competitions = [
//     { name: 'Competition 1', date: 'Date 1', venue: 'Venue 1' },
//     { name: 'Competition 2', date: 'Date 2', venue: 'Venue 2' },
//     { name: 'Competition 3', date: 'Date 3', venue: 'Venue 3' }
//   ];

//   const hackathons = [
//     { name: 'Hackathon 1', date: 'Date 1', venue: 'Venue 1' },
//     { name: 'Hackathon 2', date: 'Date 2', venue: 'Venue 2' },
//     { name: 'Hackathon 3', date: 'Date 3', venue: 'Venue 3' }
//   ];

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//   };

//   return (
//     <div className="events-container">
//       <div className="sidebar">
//         <ul>
//           <li onClick={() => handleItemClick('Competitions')}>Competitions</li>
//           <li onClick={() => handleItemClick('Hackathons')}>Hackathons</li>
//         </ul>
//       </div>

//       <div className="content">
//         <h1>{selectedItem}</h1>
//         <div className="cards-container">
//           {selectedItem === 'Competitions' && competitions.map((competition, index) => (
//             <div key={index} className="card">
//               <h2>{competition.name}</h2>
//               <p>Date: {competition.date}</p>
//               <p>Venue: {competition.venue}</p>
//             </div>
//           ))}
//           {selectedItem === 'Hackathons' && hackathons.map((hackathon, index) => (
//             <div key={index} className="card">
//               <h2>{hackathon.name}</h2>
//               <p>Date: {hackathon.date}</p>
//               <p>Venue: {hackathon.venue}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Events;

import React, { useState } from 'react';
import './events.css';

function Events() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const competitions = [
    { name: 'Competition 1', date: 'Date 1', venue: 'Venue 1' },
    { name: 'Competition 2', date: 'Date 2', venue: 'Venue 2' },
    { name: 'Competition 3', date: 'Date 3', venue: 'Venue 3' },
    { name: 'Competition 4', date: 'Date 4', venue: 'Venue 4' }
  ];

  const hackathons = [
    { name: 'Hackathon 1', date: 'Date 1', venue: 'Venue 1' },
    { name: 'Hackathon 2', date: 'Date 2', venue: 'Venue 2' },
    { name: 'Hackathon 3', date: 'Date 3', venue: 'Venue 3' }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="events-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleItemClick('Competitions')}>Competitions</li>
          <li onClick={() => handleItemClick('Hackathons')}>Hackathons</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="search-bar">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
          <button className="search-button" onClick={() => console.log("Search button clicked")}>Search</button>
        </div>
        
        <div className="content">
          <h1>{selectedItem}</h1>
          <div className="cards-container">
            {(selectedItem === 'Competitions' ? competitions : selectedItem === 'Hackathons' ? hackathons : [...competitions, ...hackathons]).filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((item, index) => (
              <div key={index} className="card">
                <h2>{item.name}</h2>
                <p>Date: {item.date}</p>
                <p>Venue: {item.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
