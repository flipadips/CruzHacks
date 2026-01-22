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

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: crypto.randomUUID()
    };
    setEvents([...events, eventWithId]);
  };

  // Fetch all existing posts from API on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://cruzhacks.onrender.com/api/v0/posts', {
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
          author: post.username,
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