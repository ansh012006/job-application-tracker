import { useEffect, useState } from "react";
import StatsCharts from "../components/dashboard/StatsCharts";
import { getJobStats } from "../services/jobService";

function Analytics() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await getJobStats();
        setStats(res.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-slate-700 dark:text-slate-300">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analytics
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Visualize your job application progress.
        </p>
      </div>

      <StatsCharts stats={stats} />
    </div>
  );
}

export default Analytics;