function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default StatCard;