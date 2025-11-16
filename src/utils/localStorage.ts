import type { YearData, DayDetail, AppPreferences, ViewMode } from '../types/calendar';

const STORAGE_KEYS = {
  yearData: (year: number) => `calendar_year_${year}`,
  dayDetails: 'day_details',
  preferences: 'app_preferences',
};

// ========================================
// Year Data
// ========================================

export const saveYearData = (yearData: YearData): void => {
  try {
    const key = STORAGE_KEYS.yearData(yearData.year);
    localStorage.setItem(key, JSON.stringify(yearData));
  } catch (error) {
    console.error('Failed to save year data:', error);
  }
};

export const loadYearData = (year: number): YearData | null => {
  try {
    const key = STORAGE_KEYS.yearData(year);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load year data:', error);
    return null;
  }
};

// ========================================
// Day Details
// ========================================

export const saveDayDetails = (dayDetails: Record<string, DayDetail>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.dayDetails, JSON.stringify(dayDetails));
  } catch (error) {
    console.error('Failed to save day details:', error);
  }
};

export const loadDayDetails = (): Record<string, DayDetail> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.dayDetails);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to load day details:', error);
    return {};
  }
};

// ========================================
// Preferences
// ========================================

export const savePreferences = (preferences: AppPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

export const loadPreferences = (): AppPreferences | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.preferences);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return null;
  }
};

export const getDefaultPreferences = (): AppPreferences => ({
  lastViewMode: 'remaining' as ViewMode,
  lastYear: new Date().getFullYear(),
  zoom: 1.0,
  language: 'en',
});
