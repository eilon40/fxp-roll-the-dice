const Explanation = ({ toggle, show }: IExplanationProps) => {
  if (!show) return;
  return (
    <div className="z-[999] min-h-screen bg-slate-900/50 fixed top-0 right-0 w-screen flex items-center justify-center">
      <p className="mx-auto max-w-xl my-8 bg-white p-5 rounded-xl w-[90%] md:w-full">
        אנא הזינו בתיבה שלמטה את מספר האשכול שמתוכו תרצו להגריל משתמשים.
        <br />
        חשוב לציין כי פותח האשכול, כלומר ההודעה הראשונה, אינה נחשבת ופותח האשכול{" "}
        <b>לא נכלל בהגרלה</b>. אשכולות עם המון תגובות יכולים לקחת זמן.
        <br />
        <br />
        אם לא נבחרה כמות תמיד יוגרל משתמש אחד, שימו לב לבחור את כמות המשתמשים
        בתיבה בין הכפתור חיפוש לתיבת החיפוש.
        <br />
        במידה ומספר התגובות הייחודיות באשכול קטן יותר ממספר הזוכים שהגדרתם תוחזר
        לכם רשימה מוגרלת של מקסימום התגובות באשכול.
        <br />
        <br />
        <button className="main-btn" onClick={toggle}>
          סגירה
        </button>
      </p>
    </div>
  );
};

interface IExplanationProps {
  show: boolean;
  toggle: () => void;
}

export default Explanation;
