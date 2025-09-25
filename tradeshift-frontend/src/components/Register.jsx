import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { username, password });
      alert("Register success!");
      navigate("/login");
    } catch (err) {
      alert("Register failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl mb-6">Register</h2>
      <input
        className="mb-4 px-4 py-2 rounded text-black"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="mb-4 px-4 py-2 rounded text-black"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}
