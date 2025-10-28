import SparkleIcon from "@/assets/icon/SparkleIcon";
import { IHeroSectionProps } from "@/types/heroPropType";
import { Search } from "lucide-react";

export default function ContentSection({
  badge,
  heading,
  subheading,
  description,
  formLabel,
  formPlaceholder,
  buttonText,
}:Partial<IHeroSectionProps>) {
  return (
    <div className="flex flex-col gap-8 lg:gap-10 py-10">
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-2 rounded-full w-fit">
          {badge.icon || <SparkleIcon />}
          <span className="text-xs sm:text-sm">{badge.text}</span>
        </div>
      )}

      {/* Heading */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900">
          {heading}
        </h1>
        {subheading && (
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900">
            {subheading}
          </h1>
        )}
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg text-gray-600 max-w-lg">
        {description}
      </p>

      {/* Form */}
      <form className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-w-full sm:max-w-xl">
        <div className="space-y-2">
          <label
            htmlFor="symptoms"
            className="block text-xs sm:text-sm text-gray-700"
          >
            {formLabel}
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            rows={4}
            placeholder={formPlaceholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Search className="size-5" />
          <span>{buttonText}</span>
        </button>
      </form>
    </div>
  );
}
