import type { YearData, MonthData, DayVisual } from '../types/calendar';
import { getDaysInMonthCount, formatDateISO } from './dateUtils';

/**
 * יצירת DayVisual ריק
 */
export const createEmptyDay = (date: string): DayVisual => ({
  date,
  objects: [],
  hasDayDetail: false,
});

/**
 * יצירת MonthData ריק
 */
export const createEmptyMonth = (year: number, monthIndex: number): MonthData => {
  const daysInMonth = getDaysInMonthCount(year, monthIndex);
  const days: DayVisual[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndex, day);
    const dateStr = formatDateISO(date);
    days.push(createEmptyDay(dateStr));
  }

  return {
    monthIndex,
    year,
    days,
  };
};

/**
 * יצירת YearData ריק
 */
export const createEmptyYear = (year: number): YearData => {
  const months: MonthData[] = [];

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    months.push(createEmptyMonth(year, monthIndex));
  }

  return {
    year,
    months,
  };
};

/**
 * מציאת DayVisual לפי תאריך
 */
export const findDayInYear = (yearData: YearData, dateStr: string): DayVisual | undefined => {
  for (const month of yearData.months) {
    const day = month.days.find(d => d.date === dateStr);
    if (day) return day;
  }
  return undefined;
};

/**
 * עדכון DayVisual בתוך YearData
 */
export const updateDayInYear = (
  yearData: YearData,
  dateStr: string,
  updates: Partial<DayVisual>
): YearData => {
  return {
    ...yearData,
    months: yearData.months.map(month => ({
      ...month,
      days: month.days.map(day =>
        day.date === dateStr ? { ...day, ...updates } : day
      ),
    })),
  };
};
