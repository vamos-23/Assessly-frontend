import { registerUser } from "../../api/auth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthCard from "../../components/auth/AuthCard";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../layouts/NavBar";

type Error = {
  name?: string;
  email?: string;
  password?: string;
};

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("STUDENT");
  const [errors, setErrors] = useState<Error>({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    const newErrors: Error = {};
    if (!name) newErrors.name = "Name is required!";
    if (!email) newErrors.email = "Email is required!";
    if (!password) newErrors.password = "Password is required!";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await registerUser(name, email, password, role);
      alert("Your registration was successful!");
      navigate("/login");
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <AuthCard title="Register for Assessly Exam Portal">
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <select
          className="w-full p-3 bg-white/5 border border-slate-600 rounded-lg text-white mb-6"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT" className="text-black">
            Student
          </option>
          <option value="ADMIN" className="text-black">
            Admin
          </option>
        </select>

        <Button
          label={loading ? "Registering..." : "Register"}
          onClick={handleRegister}
          disabled={loading}
        />

        <div className="mt-2 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </AuthCard>
    </>
  );
}
