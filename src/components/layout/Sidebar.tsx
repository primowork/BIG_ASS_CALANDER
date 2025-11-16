import React from "react";

export type DayCellProps = {
  /** התאריך של התא */
  date?: Date;
  /** האם זה היום הנוכחי */
  isToday?: boolean;
  /** האם התא מסומן/נבחר */
  isSelected?: boolean;
  /** האם התא לא זמין ללחיצה */
  isDisabled?: boolean;
  /** האם היום שייך לחודש הנוכחי (לעומת ימים אפורים של חודש קודם/בא) */
  inCurrentMonth?: boolean;
  /** טקסט שיוצג בפינה (למשל מספר היום) */
  label?: string;
  /** כמה אירועים/טודוז יש ביום הזה (אופציונלי) */
  eventsCount?: number;
  /** צבע רקע (HEX / rgb / css color) */
  color?: string;
  /** קליק על התא – אם מועבר */
  onClick?: (date: Date) => void;
  /** כל פרופס נוספים שלא ידועים מראש – כדי לא לשבור שימושים קיימים */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const DayCell: React.FC<DayCellProps> = (props) => {
  const {
    date,
    isToday,
    isSelected,
    isDisabled,
    inCurrentMonth = true,
    label,
    eventsCount,
    color,
    onClick,
  } = props;

  const handleClick = () => {
    if (!isDisabled && date && onClick) {
      onClick(date);
    }
  };

  const baseClasses =
    "day-cell flex flex-col justify-between border border-neutral-800 text-xs cursor-pointer select-none p-1";
  const disabledClasses = isDisabled ? " opacity-40 cursor-not-allowed" : "";
  const fadedClasses = !inCurrentMonth ? " opacity-60" : "";
  const todayClasses = isToday ? " ring-2 ring-amber-400" : "";
  const selectedClasses = isSelected ? " bg-amber-500 text-black" : "";

  const backgroundStyle: React.CSSProperties = {
    backgroundColor: !isSelected && color ? color : undefined,
  };

  const displayLabel =
    label ??
    (date
      ? date.getDate().toString()
      : "");

  return (
    <div
      className={
        baseClasses +
        disabledClasses +
        fadedClasses +
        todayClasses +
        selectedClasses
      }
      style={backgroundStyle}
      onClick={handleClick}
    >
      {/* שורת הכותרת של היום */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold">{displayLabel}</span>
        {isToday && (
          <span className="rounded-full px-1.5 py-0.5 text-[10px] bg-amber-400 text-black">
            היום
          </span>
        )}
      </div>

      {/* אזור תוכן/אירועים בסיסי */}
      <div className="flex-1 flex items-end">
        {typeof eventsCount === "number" && eventsCount > 0 && (
          <span className="text-[10px] opacity-80">
            {eventsCount}{" "}
            {eventsCount === 1 ? "אירוע" : "אירועים"}
          </span>
        )}
      </div>
    </div>
  );
};

export default DayCell;
