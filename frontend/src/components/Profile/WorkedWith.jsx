import React from 'react';
import './WorkedWith.css';

const people = [
  { name: 'Addodle', image: '/path/to/image.jpg' },
  { name: 'Marketplace', image: '/path/to/image.jpg' },
  { name: 'Von Dracula', image: '/path/to/image.jpg' },
  // Add more as needed
];

const WorkedWith = () => {
  return (
    <div className="worked-with">
      <h2>Worked with</h2>
      <div className="people">
        {people.map((person, index) => (
          <div key={index} className="person">
            <img src={person.image} alt={person.name} />
            <p>{person.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkedWith;
