"use client";

import ReviewCard from "@/app/components/ui/ReviewCard";
import {ReviewSchema } from "@/app/types/review";
import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewSchema[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        console.log("Error Occured!");
        return;
      }
      const result = await response.json();
      setReviews(result.reviewData);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reviews
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and monitor user feedback
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews?.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
