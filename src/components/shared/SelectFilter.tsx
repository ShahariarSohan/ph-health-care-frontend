import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTransition } from "react";
interface ISelectFilterProps {
  paramName: string; // ?gender=
  placeholder?: string;
  options: { label: string; value: string }[];
}
export default function SelectFilter({ paramName, placeholder, options }: ISelectFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition()
    const currentValue = searchParams.get(paramName) || "all"
    const handleChange = (value:string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === "all") {
            params.delete(paramName)
        }
        else if (value) {
            params.set(paramName,value)
        }
        else {
            params.delete(paramName)
        }
        startTransition(() => {
            router.push(`?${params.toString()}`);
        })
        
    }
  return (
    <Select
      value={currentValue}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}