/* eslint-disable @typescript-eslint/no-explicit-any */
import getInputFieldError, { IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface IInputFieldError {
  field: string;
  state: IInputErrorState;
}
export default function InputFieldError({ field, state }: IInputFieldError) {
  if (getInputFieldError(field, state)) {
    return (
      <FieldDescription className="text-red-600">
        {getInputFieldError(field, state)}
      </FieldDescription>
    );
  }
  return null;
}
