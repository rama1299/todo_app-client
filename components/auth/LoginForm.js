import React, { useState } from "react";
import Link from "next/link";
import { loginAuth } from "@/modules/fetchAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await loginAuth(data);
      const { token, id, username } = response;
      toast.success(response.message, { autoClose: 2000 });
      Cookies.set("token", token);
      Cookies.set("id", id);
      Cookies.set("username", username);
      router.push("/app/lists");
    } catch (error) {
      console.error(error);
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div className="md:w-1/3 max-w-sm bg-white py-7 px-5 rounded-md drop-shadow-md">
      <div className="text-center md:text-left mb-5">
        <h1 className="text-3xl font-bold text-gray-700">Sign In</h1>
      </div>
      <form onSubmit={handleLogin}>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-700 rounded"
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-700 rounded mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/auth/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        Don't have an account?{" "}
        <Link
          className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
          href="/auth/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
