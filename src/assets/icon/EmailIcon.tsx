import svgPaths from "@/assets/svg/footerSvg";

export default function EmailIcon() {
  return (
    <div className="w-5 h-5 shrink-0">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g>
          <path
            d={svgPaths.p24d83580}
            stroke="#D1D5DB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={svgPaths.pd919a80}
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
