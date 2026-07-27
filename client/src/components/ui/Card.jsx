function Card({ children }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      {children}
    </div>
  );
}

export default Card;