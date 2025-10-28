export interface IHeroSectionProps {
  badge?: {
    text?: string;
    icon?: React.ReactNode;
  };
  heading?: string;
  subheading?: string;
  description?: string;
  formLabel?: string;
  formPlaceholder?: string;
  buttonText?: string;
  onSubmit?: (value: string) => void;
  reversed?: boolean; // When true, image on left, form on right
}
