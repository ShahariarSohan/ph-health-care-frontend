"use client";
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

import { updatePatient } from "@/services/admin/patientManagement";

import { IPatient } from "@/types/patient.interface";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface IPatientManagementDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  patient: IPatient;
}
export default function PatientsManagementDialog({
  open,
  onClose,
  onSuccess,
  patient,
}: IPatientManagementDialogProps) {
  const isEdit = !!patient;
  const [state, formAction, isPending] = useActionState(updatePatient, null);
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message || "updated  patient successfully");
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit && "Edit patient"}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          {isEdit && <input type="hidden" name="id" value={patient.id} />}
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                defaultValue={isEdit ? patient?.name : undefined}
              />
              <InputFieldError state={state} field="name" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="patient@example.com"
                defaultValue={isEdit ? patient?.email : undefined}
                disabled={isEdit}
              />
              <InputFieldError state={state} field="email" />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                defaultValue={isEdit ? patient?.address : undefined}
              />
              <InputFieldError state={state} field="address" />
            </Field>
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
              {isPending ? "Saving..." : isEdit && "Update patient"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
