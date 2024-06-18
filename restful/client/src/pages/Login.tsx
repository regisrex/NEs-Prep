import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import Button from "../components/button/button";
import { axios } from "../utils/axios.config";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    try {
      setLoading(true);

      event.preventDefault();
      if (!email || !password) {
        throw new Error("Please fill in all fields.");
      }

      const response = await axios.post("/auth/login", { email, password });
      if (response.status !== 200) {
        console.log(response)
        setError(response.data.message);
      }
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("fullNames", response.data.data.user.fullNames);
      navigate("/dashboard");

    } catch (error: any) {
      if(error.name =="AxiosError"){
        setError(error.response.data.message || "Something went wrong");
      } 
       else 
         setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Enter your credentials
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            _controller={{
              value: email,
              setValue: setEmail,
              initialValue: "",
            }}
            label="Email"
            type="text"
            placeholder="Email address"
          />
          <Input
            _controller={{
              value: password,
              setValue: setPassword,
              initialValue: "",
            }}
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <Button>{loading ? "Loading..." : "Login"}</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
