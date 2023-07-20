import React from "react";
import { useState } from "react";
import Link from "next/link";
import { registerAuth } from "@/modules/fetchAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await registerAuth(data);
      toast.success(response.message, { autoClose: 2000 });
      router.push("/");
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div className="md:w-1/3 max-w-sm bg-white py-7 px-5 rounded-md drop-shadow-md">
      <div className="text-center md:text-left mb-5">
        <h1 className="text-3xl font-bold text-gray-700">Sign Up</h1>
      </div>
      <form onSubmit={handleRegister}>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-700 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-700 rounded mt-4"
          type="email"
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
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        Already have an account?{" "}
        <Link
          className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
          href="/"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
