import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if the user exists and if credentials match
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      // Setting the static secret code Pa$$w0rd! for this user on successful login
      const token = "Pa$$w0rd!";
      localStorage.setItem("token", token); // Store the secret code in localStorage

      toast.success("Login successful!", {
        position: "top-center", // Toast will show at the top center
        duration: 3000, // Toast will disappear after 3 seconds
      });
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between w-full max-w-6xl p-8 text-white">
        {/* Left Side: Image */}
        <div className="">
          <img src="/we-removebg-preview.png" alt="Authentication" className=" h-auto w-[15] md:w-[25]" />
        </div>

        {/* Right Side: Form */}
        <div className=" p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded bg-white text-black"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-2">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded bg-white text-black"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white rounded"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
