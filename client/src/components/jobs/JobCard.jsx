import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import StatusBadge from "./StatusBadge";

function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {job.company}
          </h2>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {job.position}
          </p>
        </div>

        <StatusBadge status={job.status} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 text-gray-600 dark:text-gray-300 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" />
          <span>{job.location || "Remote"}</span>
        </div>

        <div>💼 {job.jobType}</div>

        <div>💰 ₹{job.salary || 0}</div>
      </div>

      <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">
        Applied on{" "}
        {new Date(job.appliedDate).toLocaleDateString()}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => navigate(`/dashboard/jobs/edit/${job._id}`)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
          title="Edit Job"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(job._id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg"
          title="Delete Job"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default JobCard;