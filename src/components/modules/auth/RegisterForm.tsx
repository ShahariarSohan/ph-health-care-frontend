/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import registerPatient from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div>
      <form action={formAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            <InputFieldError field="name" state={state}></InputFieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
            />
            <InputFieldError field="email" state={state}></InputFieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="address">Address(Optional)</FieldLabel>
            <Input id="address" name="address" type="text" placeholder="ctg" />
            <InputFieldError field="address" state={state}></InputFieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />
            <InputFieldError field="password" state={state}></InputFieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
            />
            <InputFieldError
              field="confirmPassword"
              state={state}
            ></InputFieldError>
          </Field>
          <FieldGroup>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Register..." : "Register"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account? <Link href="/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
