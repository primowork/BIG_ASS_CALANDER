// @ts-nocheck
import { 
  format, 
  getDaysInMonth, 
  startOfMonth, 
  getDay,
  addDays,
  isAfter,
  isBefore,
  startOfDay,
  parseISO
} from 'date-fns';
import { he, enUS } from 'date-fns/locale';

/**
 * קבלת locale לפי שפה
 */
export const getLocale = (lang: 'en' | 'he') => {
  return lang === 'he' ? he : enUS;
};

/**
 * פורמט תאריך ל-ISO string (YYYY-MM-DD)
 */
export const formatDateISO = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * פורמט תאריך לתצוגה
 */
export const formatDateDisplay = (date: Date | string, lang: 'en' | 'he'): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'PPP', { locale: getLocale(lang) });
};

/**
 * קבלת מספר ימים בחודש
 */
export const getDaysInMonthCount = (year: number, monthIndex: number): number => {
  return getDaysInMonth(new Date(year, monthIndex));
};

/**
 * קבלת יום בשבוע של היום הראשון בחודש (0-6, ראשון-שבת)
 */
export const getFirstDayOfMonth = (year: number, monthIndex: number): number => {
  return getDay(startOfMonth(new Date(year, monthIndex)));
};

/**
 * בדיקה אם תאריך עבר
 */
export const isDatePast = (dateStr: string): boolean => {
  const date = parseISO(dateStr);
  const today = startOfDay(new Date());
  return isBefore(date, today);
};

/**
 * בדיקה אם תאריך היום
 */
export const isDateToday = (dateStr: string): boolean => {
  const date = parseISO(dateStr);
  const today = startOfDay(new Date());
  return formatDateISO(date) === formatDateISO(today);
};

/**
 * בדיקה אם תאריך בעתיד
 */
export const isDateFuture = (dateStr: string): boolean => {
  const date = parseISO(dateStr);
  const today = startOfDay(new Date());
  return isAfter(date, today);
};

/**
 * קבלת שמות חודשים
 */
export const getMonthNames = (lang: 'en' | 'he'): string[] => {
  const locale = getLocale(lang);
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1);
    return format(date, 'MMMM', { locale });
  });
};

/**
 * קבלת שם חודש
 */
export const getMonthName = (monthIndex: number, lang: 'en' | 'he'): string => {
  const date = new Date(2024, monthIndex, 1);
  return format(date, 'MMMM', { locale: getLocale(lang) });
};

/**
 * קבלת שמות ימים בשבוע (קצרים)
 */
export const getDayNamesShort = (lang: 'en' | 'he'): string[] => {
  const locale = getLocale(lang);
  return Array.from({ length: 7 }, (_, i) => {
    // מתחילים מיום ראשון (0)
    const date = new Date(2024, 0, i);
    return format(date, 'EEEEEE', { locale }); // 2 אותיות
  });
};
