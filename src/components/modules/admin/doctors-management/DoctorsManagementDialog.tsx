import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSpecialtySelection from "@/hooks/specialty/useSpecialtySelection";
import { createDoctor, updateDoctor } from "@/services/admin/doctorManagement";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialty.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SpecialtyMultiSelect from "./SpecialtyMultiSelect";
import Image from "next/image";

interface IDoctorManagementDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: IDoctor;
  specialties?: ISpecialty[];
}
export default function DoctorsManagementDialog({
  open,
  onClose,
  onSuccess,
  doctor,
  specialties,
}: IDoctorManagementDialogProps) {
  const isEdit = !!doctor;
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    doctor?.gender || "MALE"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [state, formAction, isPending] = useActionState(
    isEdit ? updateDoctor.bind(null, doctor.id!) : createDoctor,
    null
  );
  console.log("from doctors dialog", state);
  const specialtySelection = useSpecialtySelection({
    doctor,
    isEdit,
    open,
  });
  const getSpecialtyTitle = (id: string) => {
    return specialties?.find((s) => s.id === id)?.title || "unknown";
  };
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const file = e.target.files?.[0];
    setSelectedFile(file||null)
  }
 const handleClose = () => {
   if (fileInputRef.current) {
     fileInputRef.current.value = "";
   }
   if (selectedFile) {
     setSelectedFile(null); // Clear preview
   }
   formRef.current?.reset(); // Clear form
   onClose(); // Close dialog
 };
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message || "update or created doctor successful");
      if (formRef.current) {
        formRef.current.reset()
      }
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(selectedFile)
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose,selectedFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                defaultValue={
                  state?.formdata?.name || (isEdit ? doctor?.name : "")
                }
              />
              <InputFieldError state={state} field="name" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                defaultValue={
                  state?.formdata?.email || (isEdit ? doctor?.email : "")
                }
                disabled={isEdit}
              />
              <InputFieldError state={state} field="email" />
            </Field>

            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    defaultValue={state?.formdata?.password || ""}
                  />
                  <InputFieldError state={state} field="password" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    defaultValue={state?.formdata?.confirmPassword || ""}
                  />
                  <InputFieldError state={state} field="confirmPassword" />
                </Field>
              </>
            )}

            <SpecialtyMultiSelect
              selectedSpecialtyIds={specialtySelection.selectedSpecialtyIds}
              removedSpecialtyIds={specialtySelection.removedSpecialtyIds}
              currentSpecialtyId={specialtySelection.currentSpecialtyId}
              availableSpecialties={specialtySelection.getAvailableSpecialties(
                specialties!
              )}
              isEdit={isEdit}
              onCurrentSpecialtyChange={
                specialtySelection.setCurrentSpecialtyId
              }
              onAddSpecialty={specialtySelection.handleAddSpecialty}
              onRemoveSpecialty={specialtySelection.handleRemoveSpecialty}
              getSpecialtyTitle={getSpecialtyTitle}
              getNewSpecialties={specialtySelection.getNewSpecialties}
            ></SpecialtyMultiSelect>

            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                defaultValue={
                  state?.formdata?.contactNumber ||
                  (isEdit ? doctor?.contactNumber : "")
                }
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                defaultValue={
                  state?.formdata?.address || (isEdit ? doctor?.address : "")
                }
              />
              <InputFieldError state={state} field="address" />
            </Field>

            <Field>
              <FieldLabel htmlFor="registrationNumber">
                Registration Number
              </FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
                defaultValue={
                  state?.formdata?.registrationNumber ||
                  (isEdit ? doctor?.registrationNumber : "")
                }
              />
              <InputFieldError state={state} field="registrationNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="experience">
                Experience (in years)
              </FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                defaultValue={
                  state?.formdata?.experience ||
                  (isEdit ? doctor?.experience : "")
                }
                min="0"
              />
              <InputFieldError state={state} field="experience" />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Input
                id="gender"
                name="gender"
                placeholder="Select gender"
                defaultValue={gender}
                type="hidden"
              />
              <Select
                value={gender}
                onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="gender" />
            </Field>

            <Field>
              <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
              <Input
                id="appointmentFee"
                name="appointmentFee"
                type="number"
                placeholder="100"
                defaultValue={
                  state?.formdata?.appointmentFee ||
                  (isEdit ? doctor?.appointmentFee : "")
                }
                min="0"
              />
              <InputFieldError state={state} field="appointmentFee" />
            </Field>

            <Field>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                defaultValue={
                  state?.formdata?.qualification ||
                  (isEdit ? doctor?.qualification : "")
                }
              />
              <InputFieldError state={state} field="qualification" />
            </Field>

            <Field>
              <FieldLabel htmlFor="currentWorkingPlace">
                Current Working Place
              </FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
                defaultValue={
                  state?.formdata?.currentWorkingPlace ||
                  (isEdit ? doctor?.currentWorkingPlace : "")
                }
              />
              <InputFieldError state={state} field="currentWorkingPlace" />
            </Field>

            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
                defaultValue={
                  state?.formdata?.designation ||
                  (isEdit ? doctor?.designation : "")
                }
              />
              <InputFieldError state={state} field="designation" />
            </Field>

            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                {selectedFile && (
                  <Image
                    //get from state if available
                    src={
                      typeof selectedFile === "string"
                        ? selectedFile
                        : URL.createObjectURL(selectedFile)
                    }
                    alt="Profile Photo Preview"
                    width={50}
                    height={50}
                    className="mb-2 rounded-full"
                  />
                )}
                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile photo for the doctor
                </p>
                <InputFieldError state={state} field="profilePhoto" />
              </Field>
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Doctor"
                : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
