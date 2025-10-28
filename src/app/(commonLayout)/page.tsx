import FeaturedDoctors from "@/components/modules/home/featuredDoctor/FeaturedDoctors";
import Footer from "@/components/modules/home/footer/Footer";
import { HeroSection } from "@/components/modules/home/hero/HeroSection";
import ReviewSection from "@/components/modules/home/review/ReviewSection";
import { heroSectionProps } from "@/props/heroSectionProps";

export default function Home() {
  return (
    <div className="">
      <HeroSection {...heroSectionProps}></HeroSection>
      <FeaturedDoctors></FeaturedDoctors>
      <ReviewSection></ReviewSection>
      <Footer></Footer>
    </div>
  );
}
