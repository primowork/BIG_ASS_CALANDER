import React from 'react';
import type { MonthData } from '../../types/calendar';
import { DayCell } from './DayCell';
import { getMonthName } from '../../utils/dateUtils';
import { useCalendarStore } from '../../store/useCalendarStore';

type MonthRowProps = {
  month: MonthData;
};

export const MonthRow: React.FC<MonthRowProps> = ({ month }) => {
  const { language, viewMode } = useCalendarStore();
  const monthName = getMonthName(month.monthIndex, language);

  // Filter days based on viewMode
  const visibleDays = viewMode === 'remaining' 
    ? month.days.filter(day => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayDate = new Date(day.date);
        return dayDate >= today;
      })
    : month.days;

  // Don't render empty months in remaining mode
  if (viewMode === 'remaining' && visibleDays.length === 0) {
    return null;
  }

  // Calculate dynamic sizing in remaining mode
  const isRemainingMode = viewMode === 'remaining';
  const daySize = isRemainingMode ? 'flexible' : 'fixed';

  return (
    <div className={`
      flex items-stretch gap-3
      group hover:bg-white/50 transition-all duration-300 rounded-2xl p-4
      ${isRemainingMode ? 'min-h-[120px]' : ''}
    `}>
      {/* Month Label - Fixed Width */}
      <div className="flex items-center justify-end w-28 shrink-0">
        <div className="text-right">
          <div className={`
            font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
            ${isRemainingMode ? 'text-3xl' : 'text-2xl'}
          `}>
            {monthName.toUpperCase().slice(0, 3)}
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">
            {month.year}
          </div>
          {isRemainingMode && (
            <div className="text-xs text-gray-500 font-medium mt-1">
              {visibleDays.length} days
            </div>
          )}
        </div>
      </div>

      {/* Days Row */}
      <div className={`
        flex gap-2 flex-1
        ${isRemainingMode ? 'flex-wrap' : 'overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2'}
      `}>
        {visibleDays.map((day) => {
          const dayNumber = new Date(day.date).getDate();
          return (
            <DayCell 
              key={day.date} 
              day={day} 
              dayNumber={dayNumber}
              expandedMode={isRemainingMode}
            />
          );
        })}
      </div>
    </div>
  );
};
