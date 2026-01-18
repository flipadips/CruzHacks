import { useState } from 'react';

import List from './EventList';
import MapWindow from './MapWindow';
import ParameterWindow from './ViewerControls';
import CreateButton from './CreateButton';

// Main HomePage Component
function HomePage() {
  const [parameters, setParameters] = useState({});
  const [items, setItems] = useState([
    { id: 1, name: 'Photography Club walk' },
    { id: 2, name: 'Venstra: Office hours' },
    { id: 3, name: 'Spongebob Musical' },
  ]);
  const [markers, setMarkers] = useState([
    { id: 1, x: 550, y: 330, label: '9' },
    { id: 2, x: 880, y: 580, label: '9' },
  ]);

  return (
    <>    
      <div className="homepage-container">
        <List items={items}/>
        <div className="map-container">
          <MapWindow markers={markers} />
          <ParameterWindow 
            parameters={parameters}
          />
          <CreateButton />
        </div>
      </div>
    </>
  );
}

export default HomePage;