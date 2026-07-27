function StatusBadge({ status }) {
  const colors = {
    Applied:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",

    Interview:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",

    Offer:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",

    Rejected:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors duration-300 ${
        colors[status] || "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;