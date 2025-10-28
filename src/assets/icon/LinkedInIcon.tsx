
import svgPaths from "@/assets/svg/footerSvg";

export default function LinkedInIcon() {
  return (
    <div className="w-5 h-5">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d={svgPaths.peba4c00}
            stroke="#D1D5DB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M5 7.5H1.66667V17.5H5V7.5Z"
            stroke="#D1D5DB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p25677470}
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
