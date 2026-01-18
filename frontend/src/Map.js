import { useRef, useState, useEffect } from 'react';
import './Map.css';
import mapImage from './assets/map.png';

export default function Map({ events: initialEvents = null, width = '100%', height = '600px' }) {
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, startTranslate: { x: 0, y: 0 } });
  const [selected, setSelected] = useState(null);

  // sample events when none provided
  const sampleEvents = [
    { id: 1, title: 'Food Drive', x: 25, y: 35, description: 'Community food drive at the park.' },
    { id: 2, title: 'Concert', x: 60, y: 20, description: 'Outdoor concert near the river.' },
    { id: 3, title: 'Workshop', x: 45, y: 70, description: 'Free coding workshop.' },
  ];

  const events = initialEvents && initialEvents.length ? initialEvents : sampleEvents;

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
        style={{ left: `${event.x}%`, top: `${event.y}%` }}
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

  return (
    <div
      className={`map-viewport ${dragState.current.dragging ? 'dragging' : ''}`}
      style={{ width, height }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className="map-inner"
        style={{ transform: `translate(${translate.x}px, ${translate.y}px)` }}
        // clicking the map clears any selection
        onClick={() => setSelected(null)}
      >

        {/* The actual map iself */}
        <img 
        src={mapImage} 
        alt="Map background"
        className="map-grid"
        style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
        }}
        />

        {events.map((ev) => (
          <Marker key={ev.id} event={ev} />
        ))}
      </div>

      {/* Controls hint */}
      <div className="map-controls">
        <div className="map-control">Drag to pan</div>
        <div className="map-control">Tap/click a marker for details</div>
      </div>
    </div>
  );
}
