import React, { useState } from 'react';
import type { DayVisual } from '../../types/calendar';
import { useCalendarStore } from '../../store/useCalendarStore';
import { isDatePast, isDateToday } from '../../utils/dateUtils';

type DayCellProps = {
  day: DayVisual;
  dayNumber: number;
  expandedMode?: boolean;
};

export const DayCell: React.FC<DayCellProps> = ({ day, dayNumber, expandedMode = false }) => {
  const { viewMode, selectDate, activeTool, setDayBackgroundColor, setActiveTool } = useCalendarStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const isPast = isDatePast(day.date);
  const isToday = isDateToday(day.date);
  
  // במצב "remaining" - לא מציגים ימים שעברו
  if (viewMode === 'remaining' && isPast) {
    return null;
  }

  const handleClick = () => {
    // Handle active tool actions
    if (activeTool.type === 'color' && activeTool.data?.color) {
      setDayBackgroundColor(day.date, activeTool.data.color);
      return;
    }
    
    if (activeTool.type === 'image' && activeTool.data?.imageData) {
      // TODO: Add image to day
      console.log('Adding image to', day.date);
      return;
    }
    
    if (activeTool.type === 'text') {
      // TODO: Add text to day
      console.log('Adding text to', day.date);
      return;
    }
    
    // Default: open day detail modal
    selectDate(day.date);
  };

  // Dynamic sizing based on mode
  const cellSize = expandedMode 
    ? { width: '120px', height: '120px' }
    : { width: '72px', height: '72px' };

  const fontSize = expandedMode ? 'text-base' : 'text-sm';
  const todayLabelSize = expandedMode ? 'text-xs' : 'text-[9px]';

  // Show color preview on hover when color tool is active
  const previewColor = activeTool.type === 'color' && isHovered ? activeTool.data?.color : null;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative
        ${expandedMode ? '' : 'aspect-square'}
        cursor-pointer
        transition-all
        duration-300
        ease-out
        rounded-xl
        ${isPast ? 'opacity-40' : ''}
        ${isToday && !previewColor ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/30' : ''}
        ${isHovered && !isPast ? 'scale-110 shadow-xl z-20' : 'shadow-md'}
        ${expandedMode ? 'flex-shrink-0' : ''}
        ${activeTool.type === 'color' && isHovered ? 'ring-2 ring-purple-500' : ''}
      `}
      style={{
        backgroundColor: previewColor || day.backgroundColor || (isToday ? '#3b82f6' : '#ffffff'),
        ...cellSize,
      }}
    >
      {/* Gradient Overlay on Hover */}
      {isHovered && !isPast && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl pointer-events-none transition-opacity duration-300" />
      )}

      {/* Day Number */}
      <div className={`
        absolute top-2 left-2
        ${fontSize} font-semibold
        transition-all duration-300
        ${isPast ? 'text-gray-400' : (isToday && !previewColor) ? 'text-white' : 'text-gray-700'}
        ${isHovered && !isPast && !isToday ? 'text-blue-600 scale-110' : ''}
      `}>
        {dayNumber}
      </div>

      {/* Day Detail Indicator */}
      {day.hasDayDetail && (
        <div className="absolute top-2 right-2">
          <div className={`
            rounded-full
            transition-all duration-300
            ${(isToday && !previewColor) ? 'bg-white' : 'bg-blue-500'}
            ${isHovered ? 'scale-150' : ''}
            ${expandedMode ? 'w-2 h-2' : 'w-1.5 h-1.5'}
          `} />
        </div>
      )}

      {/* Objects Container */}
      <div className={`
        absolute inset-0 overflow-hidden
        ${expandedMode ? 'p-3 pt-10' : 'p-2 pt-8'}
      `}>
        {/* TODO: Render PNG/Text objects here */}
      </div>

      {/* Today Label */}
      {isToday && !previewColor && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className={`${todayLabelSize} font-bold text-white/90 uppercase tracking-wide`}>
            Today
          </div>
        </div>
      )}
    </div>
  );
};

  // Dynamic sizing based on mode
  const cellSize = expandedMode 
    ? { width: '120px', height: '120px' }
    : { width: '72px', height: '72px' };

  const fontSize = expandedMode ? 'text-base' : 'text-sm';
  const todayLabelSize = expandedMode ? 'text-xs' : 'text-[9px]';

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative
        ${expandedMode ? '' : 'aspect-square'}
        cursor-pointer
        transition-all
        duration-300
        ease-out
        rounded-xl
        ${isPast ? 'opacity-40' : ''}
        ${isToday ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/30' : ''}
        ${isHovered && !isPast ? 'scale-110 shadow-xl z-20' : 'shadow-md'}
        ${expandedMode ? 'flex-shrink-0' : ''}
      `}
      style={{
        backgroundColor: day.backgroundColor || (isToday ? '#3b82f6' : '#ffffff'),
        ...cellSize,
      }}
    >
      {/* Gradient Overlay on Hover */}
      {isHovered && !isPast && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl pointer-events-none transition-opacity duration-300" />
      )}

      {/* Day Number */}
      <div className={`
        absolute top-2 left-2
        ${fontSize} font-semibold
        transition-all duration-300
        ${isPast ? 'text-gray-400' : isToday ? 'text-white' : 'text-gray-700'}
        ${isHovered && !isPast && !isToday ? 'text-blue-600 scale-110' : ''}
      `}>
        {dayNumber}
      </div>

      {/* Day Detail Indicator */}
      {day.hasDayDetail && (
        <div className="absolute top-2 right-2">
          <div className={`
            rounded-full
            transition-all duration-300
            ${isToday ? 'bg-white' : 'bg-blue-500'}
            ${isHovered ? 'scale-150' : ''}
            ${expandedMode ? 'w-2 h-2' : 'w-1.5 h-1.5'}
          `} />
        </div>
      )}

      {/* Objects Container */}
      <div className={`
        absolute inset-0 overflow-hidden
        ${expandedMode ? 'p-3 pt-10' : 'p-2 pt-8'}
      `}>
        {/* TODO: Render PNG/Text objects here */}
      </div>

      {/* Today Label */}
      {isToday && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className={`${todayLabelSize} font-bold text-white/90 uppercase tracking-wide`}>
            Today
          </div>
        </div>
      )}
    </div>
  );
};
