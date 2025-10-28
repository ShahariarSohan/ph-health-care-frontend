import Image from "next/image";
import { Star, MapPin, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuredDoctorData } from "@/props/featuredDoctorData";

export default function FeaturedDoctors() {
  return (
    <section className="w-full bg-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-3">Featured Doctors</h2>
          <p className="text-gray-600">
            Meet our highly qualified healthcare professionals
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctorData.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden border-gray-200 p-0">
              <CardContent className="p-0">
                {/* Doctor Image */}
                <div className="relative w-full h-64">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    // className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  {/* Name */}
                  <h3 className="text-gray-900 mb-2">{doctor.name}</h3>

                  {/* Specialty */}
                  <p className="text-teal-600 mb-4">{doctor.specialty}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-gray-900">{doctor.rating}</span>
                    <span className="text-gray-500 text-xs">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>

                  {/* Location & Experience */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <Calendar className="w-4 h-4" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                  </div>

                  {/* Book Appointment Button */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
