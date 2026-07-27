import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);

      alert(res.data.message || "Registration successful!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 transition-colors duration-300 dark:bg-slate-950">
      <Card>
        <h1 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
          Create Account
        </h1>

        <p className="mb-8 mt-2 text-center text-gray-500 dark:text-gray-400">
          Register to start tracking your job applications.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit">
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600 transition hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;