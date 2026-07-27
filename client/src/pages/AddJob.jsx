import { useNavigate } from "react-router-dom";
import JobForm from "../components/jobs/JobForm";
import { createJob } from "../services/jobService";

function AddJob() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createJob(formData);

      alert("Job added successfully!");

      navigate("/dashboard/jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
        Add New Job
      </h1>

      <JobForm
        onSubmit={handleSubmit}
        submitText="Add Job"
      />
    </div>
  );
}

export default AddJob;