import QuoteIcon from "@/assets/icon/QuoteIcon";
import StarRating from "@/assets/icon/StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { IReview } from "@/types/review";
import Image from "next/image";


interface ReviewCardProps {
  review: IReview;
}
export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="w-full max-w-sm bg-white rounded-xl shadow-md">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <QuoteIcon />
          <StarRating />
        </div>

        <p className="text-sm text-gray-700 mt-4 leading-relaxed">
          {review.review}
        </p>

        <div className="flex items-center gap-3 mt-6">
          <Image
            src={review.avatar}
            alt={review.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
            <p className="text-xs text-gray-500">{review.timestamp}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
