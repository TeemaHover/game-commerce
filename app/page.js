import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
