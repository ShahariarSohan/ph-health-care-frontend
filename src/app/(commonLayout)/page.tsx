import FeaturedDoctors from "@/components/modules/home/FeaturedDoctors";
import { HeroSection } from "@/components/modules/home/hero/HeroSection";
import { heroSectionProps } from "@/props/heroSectionProps";

export default function Home() {
  return (
    <div className="">
      <HeroSection {...heroSectionProps}></HeroSection>
      <FeaturedDoctors></FeaturedDoctors>
    </div>
  );
}
