import React, { useState } from 'react';

// List Component
const List = ({ items, onItemClick }) => {
  return (
    <div className="list-container">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="list-item"
          onClick={() => onItemClick(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

// Map Window Component
const MapWindow = ({ markers }) => {
  return (
    <div className="map-window">
      <svg className="map-svg" viewBox="0 0 800 600">
        {/* Coastline path */}
        <path
          d="M 460 50 Q 500 150 450 250 Q 400 350 350 450 Q 300 550 250 600"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 850 150 Q 800 250 850 350 Q 900 450 950 550"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Map markers */}
        {markers.map((marker) => (
          <g key={marker.id}>
            <path
              d={`M ${marker.x} ${marker.y - 25} Q ${marker.x - 15} ${marker.y - 10} ${marker.x} ${marker.y} Q ${marker.x + 15} ${marker.y - 10} ${marker.x} ${marker.y - 25}`}
              stroke="black"
              strokeWidth="2"
              fill="white"
            />
            <text
              x={marker.x}
              y={marker.y - 10}
              textAnchor="middle"
              fontSize="14"
              fill="black"
            >
              {marker.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Parameter Window Component
const ParameterWindow = ({ parameters, onParameterChange }) => {
  return (
    <div className="parameter-window">
      <h3>Parameters</h3>
      {/* Add your parameter controls here */}
    </div>
  );
};

// Create Button Component
const CreateButton = ({ onClick }) => {
  return (
    <button className="create-button" onClick={onClick}>
      +
    </button>
  );
};

// Main HomePage Component
const HomePage = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
    { id: 3, name: 'Location 3' },
  ]);

  const [markers, setMarkers] = useState([
    { id: 1, x: 550, y: 330, label: '9' },
    { id: 2, x: 880, y: 580, label: '9' },
  ]);

  const [parameters, setParameters] = useState({});

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
  };

  const handleCreateClick = () => {
    console.log('Create button clicked');
    // Add logic to create new item
  };

  const handleParameterChange = (param, value) => {
    setParameters({ ...parameters, [param]: value });
  };

  return (
    <>
      <style>{`
        .homepage-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          background-color: #f0f0f0;
          box-sizing: border-box;
          padding: 20px;
          gap: 20px;
        }

        .list-container {
          width: 300px;
          padding: 20px;
          background-color: white;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
          border-radius: 15px;
        }

        .list-item {
          background-color: #d3d3d3;
          padding: 20px;
          border-radius: 15px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .list-item:hover {
          background-color: #c0c0c0;
        }

        .map-container {
          flex: 1;
          position: relative;
          background-color: #e0e0e0;
        }

        .map-window {
          width: 100%;
          height: 100%;
          background-color: #d0d0d0;
          border-radius: 15px;
        }

        .map-svg {
          width: 100%;
          height: 100%;
        }

        .parameter-window {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 200px;
          background-color: #696969;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .parameter-window h3 {
          margin: 0;
          color: white;
          font-size: 16px;
        }

        .create-button {
          position: absolute;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #696969;
          color: white;
          border: none;
          font-size: 32px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .create-button:hover {
          background-color: #505050;
        }
      `}</style>
      
      <div className="homepage-container">
        <List items={items} onItemClick={handleItemClick} />
        
        <div className="map-container">
          <MapWindow markers={markers} />
          <ParameterWindow 
            parameters={parameters} 
            onParameterChange={handleParameterChange} 
          />
          <CreateButton onClick={handleCreateClick} />
        </div>
      </div>
    </>
  );
};

export default HomePage;