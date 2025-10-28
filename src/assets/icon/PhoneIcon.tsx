import svgPaths from "@/assets/svg/footerSvg";

export default function PhoneIcon() {
  return (
    <div className="w-5 h-5 shrink-0">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g clipPath="url(#clip0_1_24)">
          <path
            d={svgPaths.p28f08480}
            stroke="#D1D5DB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_24">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
