import React from "react";

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
  } = props;

  const formattedSelectedDate = selectedDate
    ? selectedDate.toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "אין בחירה";

  const handleViewModeClick = (mode: string) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  return (
    <aside className="sidebar w-64 min-w-[16rem] max-w-[18rem] border-r border-neutral-800 bg-neutral-950 text-neutral-100 flex flex-col">
      {/* כותרת שנה וניווט */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            className="px-2 py-1 text-sm border border-neutral-700 rounded hover:bg-neutral-800"
            onClick={onPrevYear}
          >
            ← שנה קודמת
          </button>
          <span className="text-lg font-semibold">
            {year ?? new Date().getFullYear()}
          </span>
          <button
            type="button"
            className="px-2 py-1 text-sm border border-neutral-700 rounded hover:bg-neutral-800"
            onClick={onNextYear}
          >
            שנה הבאה →
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="flex-1 px-2 py-1 text-sm border border-neutral-700 rounded hover:bg-neutral-800"
            onClick={onToday}
          >
            היום
          </button>
          <button
            type="button"
            className="flex-1 px-2 py-1 text-sm border border-neutral-700 rounded hover:bg-neutral-800"
            onClick={onClearSelection}
          >
            נקה בחירה
          </button>
        </div>
      </div>

      {/* מצב תצוגה */}
      <div className="p-4 border-b border-neutral-800">
        <h3 className="text-sm font-semibold mb-2">מצב תצוגה</h3>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className={
              "w-full px-2 py-1 text-sm border rounded text-left " +
              (viewMode === "full"
                ? "border-amber-400 bg-neutral-800"
                : "border-neutral-700 hover:bg-neutral-900")
            }
            onClick={() => handleViewModeClick("full")}
          >
            שנה מלאה
          </button>
          <button
            type="button"
            className={
              "w-full px-2 py-1 text-sm border rounded text-left " +
              (viewMode === "remaining"
                ? "border-amber-400 bg-neutral-800"
                : "border-neutral-700 hover:bg-neutral-900")
            }
            onClick={() => handleViewModeClick("remaining")}
          >
            ימים שנותרו
          </button>
        </div>
      </div>

      {/* אינפורמציה על היום הנבחר */}
      <div className="p-4 border-b border-neutral-800 text-sm">
        <h3 className="font-semibold mb-1">תאריך נבחר</h3>
        <p className="mb-2">{formattedSelectedDate}</p>
        <p className="text-xs opacity-70">
          אפשר להשתמש בחלונית הזו כדי להציג בעתיד הערות, תגים,
          מטרות חודשיות או כל מידע נוסף שתרצה לקשר ליום שנבחר.
        </p>
      </div>

      {/* מקום לגידול עתידי */}
      <div className="p-4 text-xs opacity-70">
        <p>כאן אפשר להוסיף:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>אג׳נדה חודשית / שנתית</li>
          <li>לג׳נדת צבעים לקטגוריות אירועים</li>
          <li>מספר מש
