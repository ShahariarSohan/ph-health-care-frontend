import FeaturedDoctors from "@/components/modules/home/featuredDoctor/FeaturedDoctors";
import Footer from "@/components/modules/home/footer/Footer";
import { HeroSection } from "@/components/modules/home/hero/HeroSection";
import ReviewSection from "@/components/modules/home/review/ReviewSection";
import { heroSectionProps } from "@/props/heroSectionProps";


export default function Home() {
  return (
    <>
      <header>
        <title>PH Health Care</title>
        <meta
          name="description"
          content="Your health is our priority. Experience top-notch medical services with PH Health Care."
        />
        <link rel="icon" href="/favicon.ico" />
      </header>
      <main>
        <HeroSection {...heroSectionProps}></HeroSection>
        <FeaturedDoctors></FeaturedDoctors>
        <ReviewSection></ReviewSection>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
