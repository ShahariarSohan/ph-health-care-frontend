
import svgPaths from "@/assets/svg/footerSvg";

export default function AddressIcon() {
  return (
    <div className="w-5 h-5 shrink-0 mt-1">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d={svgPaths.p26ddc800}
            stroke="#D1D5DB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p35ba4680}
            stroke="#D1D5DB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
