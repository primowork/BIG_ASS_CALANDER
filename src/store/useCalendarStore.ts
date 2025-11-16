// @ts-nocheck
import { create } from 'zustand';
import type { 
  YearData, 
  DayDetail, 
  ViewMode, 
  CalendarObject,
  DayVisual,
  ChecklistItem,
  AppPreferences 
} from '../types/calendar';
import { 
  createEmptyYear, 
  updateDayInYear 
} from '../utils/dataInit';
import {
  saveYearData,
  loadYearData,
  saveDayDetails,
  loadDayDetails,
  savePreferences,
  loadPreferences,
  getDefaultPreferences,
} from '../utils/localStorage';

type ActiveTool = {
  type: 'select' | 'color' | 'image' | 'text';
  data?: {
    color?: string;
    imageData?: string;
    text?: string;
  };
};

type AppState = {
  // קנבס שנתי
  currentYear: number;
  yearData: YearData;
  viewMode: ViewMode;
  zoom: number;
  language: 'en' | 'he';
  
  // מסך מיקרו
  dayDetails: Record<string, DayDetail>;
  selectedDate: string | null;
  
  // Active Tool
  activeTool: ActiveTool;
  
  // UI
  isLoading: boolean;
  
  // Actions - Year & View
  setYear: (year: number) => void;
  setViewMode: (mode: ViewMode) => void;
  setZoom: (zoom: number) => void;
  setLanguage: (lang: 'en' | 'he') => void;
  
  // Actions - Active Tool
  setActiveTool: (tool: ActiveTool) => void;
  
  // Actions - Day Visual
  updateDayVisual: (date: string, updates: Partial<DayVisual>) => void;
  setDayBackgroundColor: (date: string, color: string) => void;
  addObjectToDay: (date: string, obj: CalendarObject) => void;
  updateObject: (date: string, objId: string, updates: Partial<CalendarObject>) => void;
  removeObject: (date: string, objId: string) => void;
  
  // Actions - Day Detail (Checklist)
  selectDate: (date: string | null) => void;
  updateDayDetail: (date: string, detail: Partial<DayDetail>) => void;
  addChecklistItem: (date: string, text: string) => void;
  toggleChecklistItem: (date: string, itemId: string) => void;
  deleteChecklistItem: (date: string, itemId: string) => void;
  updateChecklistItemText: (date: string, itemId: string, text: string) => void;
  setDayNotes: (date: string, notes: string) => void;
  
  // Init
  initializeApp: () => void;
};

export const useCalendarStore = create<AppState>((set, get) => ({
  // Initial state
  currentYear: new Date().getFullYear(),
  yearData: createEmptyYear(new Date().getFullYear()),
  viewMode: 'remaining',
  zoom: 1.0,
  language: 'en',
  dayDetails: {},
  selectedDate: null,
  activeTool: { type: 'select' },
  isLoading: false,

  // ========================================
  // Year & View Actions
  // ========================================
  
  setYear: (year: number) => {
    set({ isLoading: true });
    
    // שמירת השנה הנוכחית
    const currentState = get();
    saveYearData(currentState.yearData);
    
    // טעינת השנה החדשה
    let newYearData = loadYearData(year);
    if (!newYearData) {
      newYearData = createEmptyYear(year);
      saveYearData(newYearData);
    }
    
    set({ 
      currentYear: year, 
      yearData: newYearData,
      isLoading: false 
    });
    
    // שמירת העדפות
    const prefs = loadPreferences() || getDefaultPreferences();
    savePreferences({ ...prefs, lastYear: year });
  },

  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
    const prefs = loadPreferences() || getDefaultPreferences();
    savePreferences({ ...prefs, lastViewMode: mode });
  },

  setZoom: (zoom: number) => {
    const clampedZoom = Math.max(0.5, Math.min(2.0, zoom));
    set({ zoom: clampedZoom });
    const prefs = loadPreferences() || getDefaultPreferences();
    savePreferences({ ...prefs, zoom: clampedZoom });
  },

  setLanguage: (lang: 'en' | 'he') => {
    set({ language: lang });
    const prefs = loadPreferences() || getDefaultPreferences();
    savePreferences({ ...prefs, language: lang });
    
    // Update HTML dir attribute
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  },

  // ========================================
  // Active Tool Actions
  // ========================================
  
  setActiveTool: (tool: ActiveTool) => {
    set({ activeTool: tool });
  },

  // ========================================
  // Day Visual Actions
  // ========================================
  
  updateDayVisual: (date: string, updates: Partial<DayVisual>) => {
    const state = get();
    const updatedYearData = updateDayInYear(state.yearData, date, updates);
    set({ yearData: updatedYearData });
    saveYearData(updatedYearData);
  },

  setDayBackgroundColor: (date: string, color: string) => {
    get().updateDayVisual(date, { backgroundColor: color });
  },

  addObjectToDay: (date: string, obj: CalendarObject) => {
    const state = get();
    const updatedYearData = updateDayInYear(state.yearData, date, {
      objects: [...(state.yearData.months
        .flatMap(m => m.days)
        .find(d => d.date === date)?.objects || []), obj]
    });
    set({ yearData: updatedYearData });
    saveYearData(updatedYearData);
  },

  updateObject: (date: string, objId: string, updates: Partial<CalendarObject>) => {
    const state = get();
    const day = state.yearData.months
      .flatMap(m => m.days)
      .find(d => d.date === date);
    
    if (!day) return;
    
    const updatedObjects = day.objects.map(obj =>
      obj.id === objId ? { ...obj, ...updates } : obj
    );
    
    get().updateDayVisual(date, { objects: updatedObjects });
  },

  removeObject: (date: string, objId: string) => {
    const state = get();
    const day = state.yearData.months
      .flatMap(m => m.days)
      .find(d => d.date === date);
    
    if (!day) return;
    
    const updatedObjects = day.objects.filter(obj => obj.id !== objId);
    get().updateDayVisual(date, { objects: updatedObjects });
  },

  // ========================================
  // Day Detail Actions
  // ========================================
  
  selectDate: (date: string | null) => {
    set({ selectedDate: date });
  },

  updateDayDetail: (date: string, detail: Partial<DayDetail>) => {
    const state = get();
    const updatedDetails = {
      ...state.dayDetails,
      [date]: {
        ...state.dayDetails[date],
        date,
        checklist: state.dayDetails[date]?.checklist || [],
        ...detail,
        lastModified: new Date().toISOString(),
      },
    };
    
    set({ dayDetails: updatedDetails });
    saveDayDetails(updatedDetails);
    
    // עדכון אינדיקטור
    const hasContent = updatedDetails[date].checklist.length > 0 || 
                       (updatedDetails[date].notes?.trim().length || 0) > 0;
    get().updateDayVisual(date, { hasDayDetail: hasContent });
  },

  addChecklistItem: (date: string, text: string) => {
    const state = get();
    const currentDetail = state.dayDetails[date] || { date, checklist: [] };
    const newItem: ChecklistItem = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      done: false,
      createdAt: new Date().toISOString(),
      order: currentDetail.checklist.length,
    };
    
    get().updateDayDetail(date, {
      checklist: [...currentDetail.checklist, newItem],
    });
  },

  toggleChecklistItem: (date: string, itemId: string) => {
    const state = get();
    const detail = state.dayDetails[date];
    if (!detail) return;
    
    const updatedChecklist = detail.checklist.map(item =>
      item.id === itemId ? { ...item, done: !item.done } : item
    );
    
    get().updateDayDetail(date, { checklist: updatedChecklist });
  },

  deleteChecklistItem: (date: string, itemId: string) => {
    const state = get();
    const detail = state.dayDetails[date];
    if (!detail) return;
    
    const updatedChecklist = detail.checklist.filter(item => item.id !== itemId);
    get().updateDayDetail(date, { checklist: updatedChecklist });
  },

  updateChecklistItemText: (date: string, itemId: string, text: string) => {
    const state = get();
    const detail = state.dayDetails[date];
    if (!detail) return;
    
    const updatedChecklist = detail.checklist.map(item =>
      item.id === itemId ? { ...item, text } : item
    );
    
    get().updateDayDetail(date, { checklist: updatedChecklist });
  },

  setDayNotes: (date: string, notes: string) => {
    get().updateDayDetail(date, { notes });
  },

  // ========================================
  // Initialization
  // ========================================
  
  initializeApp: () => {
    set({ isLoading: true });
    
    // טעינת העדפות
    const prefs = loadPreferences() || getDefaultPreferences();
    
    // טעינת שנה
    const year = prefs.lastYear;
    let yearData = loadYearData(year);
    if (!yearData) {
      yearData = createEmptyYear(year);
      saveYearData(yearData);
    }
    
    // טעינת day details
    const dayDetails = loadDayDetails();
    
    // הגדרת שפה
    document.documentElement.dir = prefs.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = prefs.language;
    
    set({
      currentYear: year,
      yearData,
      viewMode: prefs.lastViewMode,
      zoom: prefs.zoom,
      language: prefs.language,
      dayDetails,
      isLoading: false,
    });
  },
}));
