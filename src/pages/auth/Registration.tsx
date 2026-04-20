import { registerUser } from "../../api/auth";
import { setToken } from "../../utils/auth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthCard from "../../components/auth/AuthCard";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../layouts/NavBar";
import { Eye, EyeOff } from "lucide-react";

type Error = { name?: string; email?: string; password?: string };

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      const data = await registerUser(name, email, password, role);
      setToken(data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
        }),
      );
      alert(`Welcome to Assessly, ${data.name}!`);
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.role === "STUDENT") {
        navigate("/student/dashboard");
      }
    } catch {
      alert("Registration failed. Email might be in use.");
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

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-400 mb-2 block ml-1">
            Register as:
          </label>
          <select
            className="w-full p-3 mb-3 bg-white/5 border border-slate-600 rounded-lg text-white outline-none focus:border-blue-500 transition-colors"
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
        </div>

        <Button
          label={loading ? "Creating Account..." : "Register & Start"}
          onClick={handleRegister}
          disabled={loading}
        />
        <div className="mt-1 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </AuthCard>
    </>
  );
}
