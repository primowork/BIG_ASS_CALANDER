import React from 'react';
import { Event } from '../../types';
import { format } from 'date-fns';

interface DayCellProps {
  date: Date;
  events: Event[];
  isSelected: boolean;
  onSelect: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, events, isSelected, onSelect }) => {
  const handleClick = () => onSelect(date);

  return (
    <div
      className={`day-cell ${isSelected ? 'selected' : ''} ${
        events.length ? 'has-events' : ''
      }`}
      onClick={handleClick}
    >
      <div className="day-number">{format(date, 'd')}</div>

      {/* Event badges */}
      <div className="events">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-badge"
            style={{ backgroundColor: event.color }}
            title={event.title}
          >
            {event.title}
          </div>
        ))}   {/* ← THIS CLOSING ) was missing */}
      </div>
    </div>
  );
};

export default DayCell;
