import React from 'react';
import { useCalendarStore } from '../../store/useCalendarStore';
import { MonthRow } from './MonthRow';

export const YearView: React.FC = () => {
  const { yearData, zoom } = useCalendarStore();

  return (
    <div 
      className="h-full overflow-auto bg-gradient-to-br from-gray-50 to-gray-100"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Year Container */}
      <div className="min-w-max p-8">
        {/* Months as horizontal rows */}
        <div className="space-y-1">
          {yearData.months.map((month) => (
            <MonthRow key={`${month.year}-${month.monthIndex}`} month={month} />
          ))}
        </div>
      </div>
    </div>
  );
};
