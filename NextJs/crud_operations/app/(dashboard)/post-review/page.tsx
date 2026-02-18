"use client";

import { dummyData } from "@/app/lib/dummy-data";
import { CreateReview, Review } from "@/app/types/review";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateReviewForm() {
  const router = useRouter();
  const [userInput, setUserInput] = useState<CreateReview>({
    name: "",
    email: "",
    review: "",
  });
  const [success,setSuccess] = useState<boolean>(false);
  const [error,setError] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccess(false);
    setError([]);

    const validationCheck = Review.safeParse(userInput);
    if(!validationCheck.success){
      const errorMessageArray : string[] = [];
      validationCheck.error._zod.def.forEach((err)=>{
        errorMessageArray.push(err.message);
      })
      setError(errorMessageArray);
      return;
    }

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userInput,
        id: dummyData.length + 1,
        createdAt: Date.now(),
      }),
    });

    if (!response.ok) {
      console.log("Failed to submit");
      return;
    }
    const result = await response.json();
    if(result.success){
        setSuccess(true);
        router.replace("/reviews");
    }

    setUserInput({
      name: "",
      email: "",
      review: "",
    });
  }

  return (
 <>
  <div className="min-h-screen bg-gray-50 flex items-start justify-center py-16">
    <div className="bg-white w-full max-w-xl p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Post a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
            required
          type="text"
          value={userInput.name}
          placeholder="Name..."
          onChange={(e) =>
            setUserInput({ ...userInput, name: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <input
            required
          type="email"
          value={userInput.email}
          placeholder="Email..."
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <textarea
            required
          value={userInput.review}
          placeholder="Write your review..."
          onChange={(e) =>
            setUserInput({ ...userInput, review: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
        >
          Post Review
        </button>
      </form>

      {error.length > 0 ? (
        error.map((err)=>{
          return <div key={err} className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
          {err}
        </div>
        })
      ) : success ? 
      (<div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm font-medium">
          Review posted successfully!
        </div>) : null
    }
    </div>
  </div>
</>
  );
}
