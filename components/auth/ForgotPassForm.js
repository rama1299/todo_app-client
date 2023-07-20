import React, { useState } from "react";
import Link from "next/link";
import { forgotPasswordAuth } from "@/modules/fetchAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function ForgotPassForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await forgotPasswordAuth(data);
      toast.success(response.message, { autoClose: 2000 });
      router.push("/");
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div className="md:w-1/3 max-w-sm bg-white py-7 px-5 rounded-md drop-shadow-md">
      <div className="text-center md:text-left mb-5">
        <h1 className="text-3xl font-bold text-gray-700">Reset Password</h1>
      </div>
      <form onSubmit={forgotPasswordHandler}>
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
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        <Link
          className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
          href="/"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassForm;
