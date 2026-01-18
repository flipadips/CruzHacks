import { useRef, useState, useEffect, useContext } from 'react';
import './Map.css';
import mapImage from './assets/map.webp';
import { CreateModeContext } from './HomePage.js';

export default function Map({ events: initialEvents = null, width = '100%', height = '600px', focusLocation = null }) {
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, startTranslate: { x: 0, y: 0 } });
  const [selected, setSelected] = useState(null);
  const { isCreateMode, setPopupCoords, events: contextEvents } = useContext(CreateModeContext);

  // Use events from props if provided, otherwise use context events
  const events = initialEvents !== null ? initialEvents : contextEvents;

  // Handle focusing on a specific location when item is clicked
  useEffect(() => {
    if (focusLocation && containerRef.current) {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Center the location in the viewport
      const offsetX = -(focusLocation.x - containerWidth / 2);
      const offsetY = -(focusLocation.y - containerHeight / 2);

      setTranslate({ x: offsetX, y: offsetY });
    }
  }, [focusLocation]);

  // Mouse handlers
  const onPointerDown = (clientX, clientY) => {
    dragState.current.dragging = true;
    dragState.current.startX = clientX;
    dragState.current.startY = clientY;
    dragState.current.startTranslate = { ...translate };
    // clear selection while panning
    setSelected(null);
  };

  const onPointerMove = (clientX, clientY) => {
    if (!dragState.current.dragging) return;
    const dx = clientX - dragState.current.startX;
    const dy = clientY - dragState.current.startY;
    setTranslate({
      x: dragState.current.startTranslate.x + dx,
      y: dragState.current.startTranslate.y + dy,
    });
  };

  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  const handleMouseDown = (e) => {
    onPointerDown(e.clientX, e.clientY);
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  };

  const handleWindowMouseMove = (e) => onPointerMove(e.clientX, e.clientY);
  const handleWindowMouseUp = (e) => {
    onPointerUp();
    window.removeEventListener('mousemove', handleWindowMouseMove);
    window.removeEventListener('mouseup', handleWindowMouseUp);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    onPointerDown(t.clientX, t.clientY);
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: false });
    window.addEventListener('touchend', handleWindowTouchEnd);
  };

  const handleWindowTouchMove = (e) => {
    // prevent page scroll while panning
    e.preventDefault();
    const t = e.touches[0];
    onPointerMove(t.clientX, t.clientY);
  };

  const handleWindowTouchEnd = () => {
    onPointerUp();
    window.removeEventListener('touchmove', handleWindowTouchMove);
    window.removeEventListener('touchend', handleWindowTouchEnd);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
    };
  }, []);

  // Helper to render marker popup inside the translated map
  const Marker = ({ event }) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      if (selected && selected.id !== event.id) setOpen(false);
    }, [selected, event.id]);

    const handleClick = (e) => {
      // prevent panning start
      e.stopPropagation();
      setSelected(event);
      setOpen(true);
    };

    return (
      <div
        className="map-marker"
        style={{ left: `${event.x}px`, top: `${event.y}px` }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      >
        <div className="map-marker-dot" />
        {selected && selected.id === event.id && (
          <div className="map-popup" onClick={(ev) => ev.stopPropagation()}>
            <div className="map-popup-title">{event.title}</div>
            <div className="map-popup-body">{event.description}</div>
          </div>
        )}
      </div>
    );
  };

  const handleMapClick = (e) => {
    if (isCreateMode && !dragState.current.dragging) {
      // Calculate the click position relative to the map inner
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left - translate.x;
      const clickY = e.clientY - rect.top - translate.y;
      setPopupCoords({ x: Math.round(clickX), y: Math.round(clickY) });
    }
    setSelected(null);
  };

  return (
    <div
      className={`map-viewport ${dragState.current.dragging ? 'dragging' : ''}`}
      style={{ width, height }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleMapClick}
    >
      <div
        className="map-inner"
        style={{ transform: `translate(${translate.x}px, ${translate.y}px)` }}
      >

        {/* The actual map iself */}
        <img 
        src={mapImage} 
        alt="Map background"
        className="map-grid"
        style={{
            width: '3000px',
            height: '2643px',
            pointerEvents: 'none'
        }}
        />

        {events.map((ev) => (
          <Marker key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
}
