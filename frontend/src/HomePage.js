import { useState, createContext, useEffect } from 'react';

import List from './EventList';
import MapWindow from './MapWindow';
import ParameterWindow from './ViewerControls';
import CreateButton from './CreateButton';

export const CreateModeContext = createContext();

// Main HomePage Component
function HomePage() {
  const [events, setEvents] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [popupCoords, setPopupCoords] = useState(null);
  const [focusLocation, setFocusLocation] = useState(null);

  // Fetch all existing posts from API on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v0/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch posts');
          return;
        }

        const posts = await response.json();
        
        // Transform posts to event format
        const transformedEvents = posts.map((post) => ({
          id: post.id,
          title: post.title,
          description: post.content,
          event_date: post.event_date,
          x: post.coordinates?.x || 0,
          y: post.coordinates?.y || 0,
        }));

        setEvents(transformedEvents);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
    };
    setEvents([...events, eventWithId]);
  };

  return (
    <CreateModeContext.Provider value={{ isCreateMode, setIsCreateMode, popupCoords, setPopupCoords, events, addEvent, focusLocation, setFocusLocation }}>
      <>    
        <div className="homepage-container">
          <List items={events}/>
          <div className="map-container">
            <MapWindow />
            <ParameterWindow />
            <CreateButton />
          </div>
        </div>
      </>
    </CreateModeContext.Provider>
  );
}

export default HomePage;