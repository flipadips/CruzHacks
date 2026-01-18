import { useState, createContext } from 'react';

import List from './EventList';
import MapWindow from './MapWindow';
import ParameterWindow from './ViewerControls';
import CreateButton from './CreateButton';

export const CreateModeContext = createContext();

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
  const [events, setEvents] = useState([
    { id: 1, title: 'Food Drive', x: 500, y: 525, description: 'Community food drive at the park.' },
    { id: 2, title: 'Concert', x: 1200, y: 300, description: 'Outdoor concert near the river.' },
    { id: 3, title: 'Workshop', x: 900, y: 1050, description: 'Free coding workshop.' },
  ]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [popupCoords, setPopupCoords] = useState(null);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
    };
    setEvents([...events, eventWithId]);
  };

  return (
    <CreateModeContext.Provider value={{ isCreateMode, setIsCreateMode, popupCoords, setPopupCoords, events, addEvent }}>
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
    </CreateModeContext.Provider>
  );
}

export default HomePage;