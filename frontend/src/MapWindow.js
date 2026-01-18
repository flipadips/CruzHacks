import { useContext, useState } from 'react';
import './HomePage.css';

import Map from './Map.js';
import { CreateModeContext } from './HomePage.js';

function MapWindow({ markers }) {
  const { isCreateMode, setIsCreateMode, popupCoords, setPopupCoords, events, addEvent, focusLocation } = useContext(CreateModeContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v0/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          title: title,
          content: description,
          event_date: eventDate,
          coordinates: { x: popupCoords.x, y: popupCoords.y }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Post creation failed:', data.error);
        return;
      }

      const newEvent = {
        title,
        description,
        event_date: eventDate,
        author: data.username,
        x: popupCoords.x,
        y: popupCoords.y
      };
      addEvent(newEvent);
      console.log('New event created:', newEvent);
      // Reset form
      setTitle('');
      setDescription('');
      setEventDate('');
      setPopupCoords(null);
      setIsCreateMode(!isCreateMode);
    } catch (err) {
      console.error('Post creation error:', err);
    }
  };

  return (
    <div 
      className="map-window" 
      style={isCreateMode ? { border: '10px solid #f9bf00' } : {}}
    >
      <Map events={events} focusLocation={focusLocation} />
      
      {/* Create Event Popup */}
      {popupCoords && (
        <div className="event-popup-overlay">
          <div className="event-popup-form">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Event Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter event description"
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Event Date & Time:</label>
                <input
                  type="datetime-local"
                  id="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <p>Location: X: {popupCoords.x}, Y: {popupCoords.y}</p>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-submit">Create Event</button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setPopupCoords(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div className="map-controls">
        <div className="map-control">Drag to pan</div>
        <div className="map-control">Tap/click a marker for details</div>
      </div>
    </div>
  );
}

export default MapWindow;