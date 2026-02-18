import { ReviewSchema } from "@/app/types/review";

type ReviewCardProps = {
  review: ReviewSchema;
};

async function handleDelete(reviewId : number){
    const response = await fetch(`/api/reviews/${reviewId}`,{method : "DELETE"});
    if(!response.ok){
        console.log("error");
        return;
    }
    const result = await response.json();
    console.log(result.message);

}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border cursor-pointer border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            {review.name}
          </h3>
          <p className="text-sm text-gray-500">
            {review.email}
          </p>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">
        {review.review}
      </p>

      <button 
      className="cursor-pointer bg-red-500 p-3.5 text-white"
      onClick={()=>handleDelete(review.id)}>Delete</button>
    </div>
  );
}
