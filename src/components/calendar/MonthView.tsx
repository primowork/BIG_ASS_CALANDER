import React from 'react';
import type { MonthData } from '../../types/calendar';
import { DayCell } from './DayCell';
import { getMonthName, getFirstDayOfMonth } from '../../utils/dateUtils';
import { useCalendarStore } from '../../store/useCalendarStore';

type MonthViewProps = {
  month: MonthData;
};

export const MonthView: React.FC<MonthViewProps> = ({ month }) => {
  const { language } = useCalendarStore();
  const monthName = getMonthName(month.monthIndex, language);
  const firstDayOfWeek = getFirstDayOfMonth(month.year, month.monthIndex);

  // יצירת grid של ימים עם ריווחים ריקים בהתחלה
  const gridDays: (typeof month.days[0] | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...month.days,
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      {/* Month Header */}
      <div className="text-center font-semibold text-gray-900 mb-3 text-sm">
        {monthName}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {gridDays.map((day, index) => {
          if (!day) {
            // Empty cell for alignment
            return <div key={`empty-${index}`} className="w-[80px] h-[80px]" />;
          }
          
          const dayNumber = new Date(day.date).getDate();
          return <DayCell key={day.date} day={day} dayNumber={dayNumber} />;
        })}
      </div>
    </div>
  );
};
