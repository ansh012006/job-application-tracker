import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/jobs/JobForm";
import { getJobById, updateJob } from "../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.job);
      } catch (err) {
        console.error(err);
        alert("Unable to load job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateJob(id, formData);
      alert("Job updated successfully!");
      navigate("/dashboard/jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-slate-700 dark:text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
        Edit Job
      </h1>

      <JobForm
        initialValues={job}
        onSubmit={handleSubmit}
        submitText="Update Job"
      />
    </div>
  );
}

export default EditJob;