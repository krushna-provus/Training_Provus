"use client";

import OptionButton from "../ui/OptionButton";
import { Options } from "@/app/types/review";
import logo from "./../../../public/provus_logo.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const optionsArray: Options[] = [
  { heading: "All Reviews", navLink: "/dashboard/reviews" },
  { heading: "Post Review", navLink: "/dashboard/post-review" },
];

export default function Header() {

  const router = useRouter();

  async function handleLogout(){
  await fetch("/api/auth/logout",{method : "POST"});
  router.push("/auth/login");
  }



  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center space-x-3">
            <Image
              src={logo}
              alt="Provus Logo"
              height={36}
              width={36}
              className="rounded-md object-contain"
            />
            <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
              Any Reviewer
            </h1>
          </div>

          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-4">
              {optionsArray.map((val) => (
                <div key={val.heading} className="min-w-30">
                  <OptionButton buttonText={val} />
                </div>
              ))}
            </nav>

            <div className="h-6 w-px bg-gray-200" />

            <button 
            onClick={handleLogout}
            className="bg-red-600 cursor-pointer text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-200 shadow-sm">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
