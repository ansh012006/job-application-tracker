import { useEffect, useState } from "react";

import SearchFilter from "../components/jobs/SearchFilter";
import JobCard from "../components/jobs/JobCard";

import {
  getJobs,
  deleteJob,
} from "../services/jobService";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    sort: "newest",
  });

  useEffect(() => {
    loadJobs();
  }, [filters]);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const res = await getJobs(filters);

      setJobs(res.jobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this job application?");

    if (!ok) return;

    await deleteJob(id);

    loadJobs();
  };

  return (
    <div className="transition-colors duration-300">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          All Jobs
        </h1>
      </div>

      <SearchFilter
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (
        <p className="mt-10 text-center text-slate-600 dark:text-slate-300">
          Loading jobs...
        </p>
      ) : jobs.length === 0 ? (
        <p className="mt-10 text-center text-slate-600 dark:text-slate-300">
          No jobs found.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJobs;