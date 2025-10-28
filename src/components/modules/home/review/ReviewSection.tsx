


import { reviews } from "@/props/reviewData";
import ReviewCard from "./ReviewCard";


export default function ReviewSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          What Our Patients Say
        </h2>
        <p className="text-gray-600 mt-2 text-base">
          Real experiences from real patients
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review ={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
