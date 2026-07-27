export default function SearchFilter({
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-slate-900 placeholder-gray-400 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400";

  return (
    <div className="mb-6 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 md:grid-cols-3 dark:border-slate-700 dark:bg-slate-800">
      <input
        type="text"
        name="search"
        placeholder="Search company or position..."
        value={filters.search}
        onChange={handleChange}
        className={inputClass}
      />

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className={inputClass}
      >
        <option>All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <select
        name="sort"
        value={filters.sort}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="company">Company</option>
      </select>
    </div>
  );
}