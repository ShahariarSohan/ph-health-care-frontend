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
import { createSpecialties } from "@/services/admin/specialtyManagement";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ISpecialtiesManagementDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SpecialtiesManagementDialog({
  open,
  onClose,
  onSuccess,
}: ISpecialtiesManagementDialogProps) {
  const [state, formAction, isPending] = useActionState(
    createSpecialties,
    null
  );
  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Specialty</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" placeholder="Cardiology" required />
            <InputFieldError field="title" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="file">Upload Icon</FieldLabel>

            <Input id="file" name="file" type="file" accept="image/*" />
            <InputFieldError field="file" state={state} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Specialty"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
