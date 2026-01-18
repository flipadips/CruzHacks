import { useContext } from 'react';
import './HomePage.css';
import { CreateModeContext } from './HomePage.js';

function List({items}) {
  const { setFocusLocation } = useContext(CreateModeContext);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${month} ${day} ${time}`;
  };

  const renderDescription = (description) => {
    // Parse URLs and make them clickable
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a 
            key={index} 
            href={part}
            onClick={(e) => e.stopPropagation()}
          >
            Here
          </a>
        );
      }
      return part;
    });
  };

  const handleItemClick = (item) => {
    console.log('Item clicked:', item.x); 
    console.log('Item clicked:', item.y);
    // Focus the map on this location
    setFocusLocation({ x: item.x, y: item.y });
  };
  return (
    <div className="list-container">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="list-item"
          onClick={() => handleItemClick(item)}
        >
          <div className="list-item-content">
            <div>
              <h2>{item.title}</h2>
              <p><i>By {item.author}</i></p>
              <p>{renderDescription(item.description)}</p>
            </div>
            <div className="list-item-date">
              {formatDate(item.event_date)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
