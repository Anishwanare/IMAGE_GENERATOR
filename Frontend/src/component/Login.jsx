import React, { useContext, useEffect, useState } from "react";
import { iconData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion"; // Corrected import
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { setToggle, setUser, setToken } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = { name, email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASEURL}/api/v1/user/register`,
        formdata,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (response.data?.success) {
        localStorage.setItem("token", response.data?.token);
        setUser(response.data?.user);
        setToken(response.data?.token);
        toast.success(response.data?.message);
        setToggle(false)
      }
      else {
        toast.error(response.data?.message)
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASEURL}/api/v1/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      // localStorage.setItem("token", response.data?.token);
      if (response.data?.success) {
        localStorage.setItem('token', response.data?.token)
        localStorage.setItem('user', JSON.stringify(response.data?.user))
        setUser(response.data?.user);
        setToken(response.data?.token);
        toast.success(response.data?.message);
        setToggle(false)
      }
      else {
        toast.error(response.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-72 sm:w-[400px] relative bg-white p-10 rounded-xl text-slate-500"
        onSubmit={register ? handleSignup : handleLogin}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {register ? "Sign Up" : "Login"}
        </h1>
        <p className="text-sm mt-2">
          Welcome back! Please {register ? "sign up" : "sign in"} to continue
        </p>

        {register && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={iconData.profile_icon} alt="" width={30} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="outline-none text-sm"
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={iconData.email_icon} alt="" width={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email id"
            required
            className="outline-none text-sm"
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={iconData.lock_icon} alt="" width={15} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            className="outline-none text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-neutral-600 hover:text-neutral-800"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {!register && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full my-4 text-white py-2 rounded-full"
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Loading..." : register ? "Create Account" : "Login"}
        </button>

        {!register ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setRegister((prev) => !prev)}
            >
              Sign up!
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setRegister((prev) => !prev)}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={iconData.cross_icon}
          alt="close"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        />
      </motion.form>
    </div>
  );
};

export default Login;
