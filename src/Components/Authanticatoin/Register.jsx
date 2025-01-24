import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = (data) => {
    const fileReader = new FileReader();
    if (data.image[0]) {
      fileReader.readAsDataURL(data.image[0]); // Convert image to base64
      fileReader.onload = () => {
        const userData = { ...data, image: fileReader.result }; // Add image as base64 string
        localStorage.setItem("user", JSON.stringify(userData)); // Save user with image to local storage
        toast.success("Registration successful!", {
          position: "top-center",
          duration: 3000,
        });
        navigate("/login");
      };
    } else {
      toast.error("Please upload a valid image!", {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex items-center justify-between w-full max-w-6xl p-8">
        {/* Left Side: Image */}

        {/* Right Side: Form */}

        <div className="w-1/2 md:block hidden">
          <img
            src="/we-removebg-preview.png"
            alt="Authentication"
            className="w-full h-auto"
          />
        </div>
        <div className="text-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username Field */}
              <div>
                <label className="block mb-2">Username:</label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="w-full p-3 border rounded bg-white text-black"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-3 border rounded bg-white text-black"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block mb-2">Phone:</label>
              <input
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                className="w-full p-3 border rounded bg-white text-black"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block mb-2">Address:</label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="w-full p-3 border rounded bg-white text-black"
                placeholder="Enter your address"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Image Field */}
            <div>
              <label className="block mb-2">Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Profile picture is required",
                })}
                className="w-full p-3 border rounded bg-white text-black"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
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
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block mb-2">Confirm Password:</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="w-full p-3 border rounded bg-white text-black"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="absolute right-3 top-3"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white rounded"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
