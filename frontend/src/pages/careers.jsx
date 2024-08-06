
import React, { useState } from 'react';
import './events.css';

function Careers() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const SDE = [
    { name: 'Microsoft',Requirements:"Java,C++" },
    { name: 'Amazon',Requirements:"Java,C++" },
    { name: 'Catalog',Requirements:"Full Stack" }
  ];

  const DataAnalyst = [
    { name: 'Microsoft',Requirements:"Java,C++" },
    { name: 'Amazon',Requirements:"Java,C++" },
    { name: 'Catalog',Requirements:"Full Stack" }
  ];
  const Technical = [
    { name: 'Microsoft',Requirements:"Java,C++" },
    { name: 'Amazon',Requirements:"Java,C++" },
    { name: 'Catalog',Requirements:"Full Stack" }
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
          <li onClick={() => handleItemClick('SDE')}>SDE</li>
          <li onClick={() => handleItemClick('DataAnalyst')}>Data Analyst</li>
          <li onClick={() => handleItemClick('Technical')}>Technical</li>
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
            {(selectedItem === 'SDE' ? SDE : selectedItem === 'DataAnalyst' ? DataAnalyst : Technical).filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((item, index) => (
              <div key={index} className="card">
                <h2>{item.name}</h2>
                <p>Requirements: {item.Requirements}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;
