import { useState, useEffect } from "react";

function JobForm({
  initialValues,
  onSubmit,
  submitText = "Save Job",
}) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    location: "",
    jobType: "Full-Time",
    status: "Applied",
    salary: "",
    notes: "",
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        company: initialValues.company || "",
        position: initialValues.position || "",
        location: initialValues.location || "",
        jobType: initialValues.jobType || "Full-Time",
        status: initialValues.status || "Applied",
        salary: initialValues.salary || "",
        notes: initialValues.notes || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400";

  const labelClass =
    "mb-2 block font-medium text-slate-700 dark:text-gray-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Company</label>

        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Google"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Position</label>

        <input
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Software Engineer"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Location</label>

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Bangalore"
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Job Type</label>

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Salary</label>

        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="1000000"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Notes</label>

        <textarea
          rows="4"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Interview notes..."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
      >
        {submitText}
      </button>
    </form>
  );
}

export default JobForm;