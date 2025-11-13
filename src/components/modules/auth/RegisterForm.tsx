/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  console.log("state", state);
const getFieldError = (field: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === field);
      if (error) {
        console.log("error found", error);
        return error.message;
      }
    }
    return null;
  };
  useEffect(() => {
    if (state && !state.success && state.message) {
    toast.error(state.message)
  }
},[state])
  return (
    <div>
      <form action={formAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              
            />
          {getFieldError("name") && (
              <FieldDescription className="text-red-600">
                {getFieldError("name")}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              
            />
          {getFieldError("email") && (
              <FieldDescription className="text-red-600">
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="ctg"
              
            />
          {getFieldError("address") && (
              <FieldDescription className="text-red-600">
                {getFieldError("address")}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password"  />
            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              
            />
            {getFieldError("confirmPassword") && (
              <FieldDescription className="text-red-600">
                {getFieldError("confirmPassword")}
              </FieldDescription>
            )}
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
