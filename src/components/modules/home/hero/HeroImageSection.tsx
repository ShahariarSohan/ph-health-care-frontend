import Image from "next/image";

export default function HeroImageSection() {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[438px]">
      <Image
        src="https://i.ibb.co.com/GfjXDmKw/doctor.jpg"
        alt="Doctor-patient"
        width={500}
        height={500}
      />
    </div>
  );
}
