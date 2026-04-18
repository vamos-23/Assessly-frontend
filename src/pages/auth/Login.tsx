import { loginUser } from "../../api/auth";
import { setToken } from "../../utils/auth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthCard from "../../components/auth/AuthCard";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../layouts/NavBar";

type Error = {
  email?: string;
  password?: string;
};

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Error>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const newErrors: Error = {};
    if (!email) newErrors.email = "Email is required!";
    if (!password) newErrors.password = "Password is required!";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const token = await loginUser(email, password);
      setToken(token);
      navigate("/dashboard");
    } catch {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <AuthCard title="Login to Assessly Exam Portal">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Button
          label={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
        <div className="mt-2 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Register
          </Link>
        </div>
      </AuthCard>
    </>
  );
}
