/* eslint-disable react/no-unescaped-entities */
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

import loginUser from "@/services/auth/loginUser";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm({redirect}:{redirect?:string}) {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  
  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message)
    }
  },[state])
  return (
    <div>
      <form action={formAction}>
        {redirect && <Input   type="hidden" name="redirect" value={redirect}/>}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
            <InputFieldError field="email" state={state}></InputFieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" name="password" required  />
            <InputFieldError field="password" state={state}></InputFieldError>
          </Field>
          <FieldGroup>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Logging in ...." : "Login"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Doesn't have an account? <Link href="/register">Register</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
