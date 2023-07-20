import React from "react";
import ForgotPassForm from "@/components/auth/ForgotPassForm";

function forgotPassword() {
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center bg-blue-50 space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <ForgotPassForm></ForgotPassForm>
    </section>
  );
}

export default forgotPassword;
