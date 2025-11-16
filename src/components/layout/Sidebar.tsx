import React from "react";
import { format } from "date-fns";

export type SidebarProps = {
  /** השנה הנוכחית שמוצגת בלוח */
  year?: number;
  /** התאריך שנבחר כרגע */
  selectedDate?: Date | null;
  /** מעבר לשנה קודמת */
  onPrevYear?: () => void;
  /** מעבר לשנה הבאה */
  onNextYear?: () => void;
  /** חזרה להיום */
  onToday?: () => void;
  /** ניקוי בחירה */
  onClearSelection?: () => void;
  /** מצב תצוגה (למשל: "full", "remaining") */
  viewMode?: string;
  /** שינוי מצב תצוגה */
  onViewModeChange?: (mode: string) => void;
  /** כל דבר נוסף שלא ידוע מראש */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    year,
    selectedDate,
    onPrevYear,
    onNextYear,
    onToday,
    onClearSelection,
    viewMode,
    onViewModeChange,
    ...rest
  } = props;

  const handleViewModeChange = (mode: string) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  return (
    <aside className="sidebar" {...rest}>
      <header className="sidebar-header">
        <h1 className="sidebar-title">
          {year ?? new Date().getFullYear()}
        </h1>
        <div className="sidebar-nav-buttons">
          <button type="button" onClick={onPrevYear}>
            ◀ שנה קודמת
          </button>
          <button type="button" onClick={onNextYear}>
            שנה הבאה ▶
          </button>
        </div>
      </header>

      <section className="sidebar-section">
        <h2>תאריך נבחר</h2>
        <div className="selected-date-box">
          {selectedDate
            ? format(selectedDate, "dd.MM.yyyy")
            : "לא נבחר תאריך"}
        </div>
        <div className="sidebar-actions">
          <button type="button" onClick={onToday}>
            היום
          </button>
          <button type="button" onClick={onClearSelection}>
            ניקוי בחירה
          </button>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>מצב תצוגה</h2>
        <div className="view-mode-buttons">
          <button
            type="button"
            className={viewMode === "full" ? "active" : ""}
            onClick={() => handleViewModeChange("full")}
          >
            שנה מלאה
          </button>
          <button
            type="button"
            className={viewMode === "remaining" ? "active" : ""}
            onClick={() => handleViewModeChange("remaining")}
          >
            ימים שנותרו
          </button>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
