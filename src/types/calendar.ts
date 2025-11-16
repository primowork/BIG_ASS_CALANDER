// ========================================
// 1. אובייקטים בתוך תא יום (PNG/Text)
// ========================================

export type CalendarObjectBase = {
  id: string;
  x: number;      // px יחסית לתא
  y: number;      // px יחסית לתא
  zIndex?: number;
};

export type PngObject = CalendarObjectBase & {
  type: "png";
  src: string;         // data URL או path
  width: number;       // px
  height: number;      // px
  alt?: string;
  rotation?: number;   // מעלות
};

export type TextObject = CalendarObjectBase & {
  type: "text";
  text: string;
  fontSize: number;    // px
  fontWeight?: number; // 400, 700, etc.
  color?: string;      // hex
  align?: "left" | "center" | "right";
  fontFamily?: string;
};

export type CalendarObject = PngObject | TextObject;

// ========================================
// 2. תא יום בודד (Day Cell)
// ========================================

export type DayVisual = {
  date: string;              // ISO format: "2026-10-17"
  backgroundColor?: string;  // hex או CSS color
  objects: CalendarObject[]; // רשימת PNG/Text
  hasDayDetail?: boolean;    // אינדיקטור ויזואלי שיש צ'ק-ליסט
};

// ========================================
// 3. חודש (פרגמנט לוגי)
// ========================================

export type MonthData = {
  monthIndex: number;  // 0-11 (Jan=0, Dec=11)
  year: number;
  days: DayVisual[];   // 28-31 ימים
};

// ========================================
// 4. שנה שלמה (הקנבס השנתי)
// ========================================

export type YearData = {
  year: number;
  months: MonthData[]; // תמיד 12 חודשים
};

// ========================================
// 5. מסך יומי-מיקרו (Checklist)
// ========================================

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;  // ISO timestamp
  order: number;      // למיון ידני
};

export type DayDetail = {
  date: string;              // "2026-10-17"
  checklist: ChecklistItem[];
  notes?: string;            // טקסט חופשי
  lastModified?: string;     // ISO timestamp
};

// ========================================
// 6. View Mode
// ========================================

export type ViewMode = "remaining" | "fullYear";

// ========================================
// 7. App Preferences
// ========================================

export type AppPreferences = {
  lastViewMode: ViewMode;
  lastYear: number;
  zoom: number; // 0.5 - 2.0
  language: "en" | "he";
};
