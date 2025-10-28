import StarIcon from "./StarIcon";

export default function StarRating() {
  return (
    <div className="flex items-center gap-1 mt-3">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}
