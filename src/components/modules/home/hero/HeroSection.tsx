
import { IHeroSectionProps } from "@/types/heroPropType";



import ContentSection from "./ContentSection";
import HeroImageSection from "./HeroImageSection";





export function HeroSection(
  heroProps: IHeroSectionProps) {
  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const symptoms = formData.get("symptoms") as string;
    if (heroProps.onSubmit) {
      heroProps.onSubmit(symptoms);
    }
  };

 
 

  

  return (
    <div className="min-h-screen w-full relative ">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 container mx-auto relative">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center   ${
              heroProps.reversed ? "lg:grid-flow-dense" : ""
            }`}
          >
            <div className={heroProps.reversed ? "lg:col-start-2" : ""}>
              <ContentSection {...heroProps}></ContentSection>
            </div>
            <div
              className={
                heroProps.reversed ? "lg:col-start-1 lg:row-start-1" : ""
              }
            >
              <HeroImageSection></HeroImageSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
