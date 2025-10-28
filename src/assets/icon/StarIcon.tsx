import svgPaths from "@/assets/svg/reviewSvg";
export default function StarIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 20 20">
      <path
        d={svgPaths.pa6d0980}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
