import './HomePage.css';

import Map from './Map.js';

function MapWindow({ markers }) {
  return (
    <div className="map-window">
      <Map/>
    </div>
  );
}

export default MapWindow;