import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

function Register() {
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center bg-blue-50 space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <RegisterForm></RegisterForm>
    </section>
  );
}

export default Register;
