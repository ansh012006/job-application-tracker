import { useEffect, useState } from "react";
import StatCard from "../../components/ui/StatCard";
import { getJobStats, getJobs } from "../../services/jobService";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsData = await getJobStats();
        setStats(statsData.stats);

        const jobsData = await getJobs();
        setRecentJobs(jobsData.jobs.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-slate-900 dark:text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Applications" value={stats.total} />
        <StatCard title="Applied" value={stats.applied} />
        <StatCard title="Interviews" value={stats.interview} />
        <StatCard title="Offers" value={stats.offer} />
      </div>

      <div className="mt-6">
        <StatCard title="Rejected" value={stats.rejected} />
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-5 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
          Recent Applications
        </h2>

        {recentJobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No job applications found.
          </p>
        ) : (
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:bg-gray-50 md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:hover:bg-slate-700"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {job.position}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300">
                    {job.company} • {job.location}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Salary: ₹{job.salary}
                  </p>
                </div>

                <span
                  className={`self-start rounded-full px-3 py-1 text-sm font-semibold md:self-auto ${
                    job.status === "Applied"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      : job.status === "Interview"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                      : job.status === "Offer"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;