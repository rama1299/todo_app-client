import LoginForm from "@/components/auth/LoginForm";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center bg-blue-50 space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-lg">
        <img src="/landing_image.png" alt="Sample image" />
      </div>
      <LoginForm></LoginForm>
    </section>
  );
}
