"use client";

import React, { useId, useTransition } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/ui/components/input-group";
import { Button } from "@repo/ui/components/button";
import { AtSign, LogInIcon } from "lucide-react";
import { InputPassword } from "@repo/ui/components/input-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import Image from "next/image";
import { useLogin } from "../_api";
import { useRouter } from "next/navigation";
import { Spinner } from "@repo/ui/components/spinner";

const formSchema = z.object({ email: z.email(), password: z.string() });
type FormSchema = z.infer<typeof formSchema>;

export const LoginClient = () => {
  const idLoginForm = useId();
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: { email: "", password: "" },
  });

  const { mutate: login, isPending: isLoggingIn } = useLogin(form);

  const handleLogin = async (values: FormSchema) => {
    login(values, {
      onSuccess: () => {
        startTransition(() => router.push("/"));
      },
    });
  };

  return (
    <Card className="z-10 w-sm p-6 shadow-xl border border-gray-100 ring-0">
      <CardHeader className="p-0">
        <div className="relative w-24 aspect-8/3 mb-3">
          <Image src={"/next.svg"} fill sizes="100vw" alt="logo" />
        </div>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="w-full flex flex-col"
      >
        <FieldGroup className="grid grid-cols-1">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}-${idLoginForm}`} required>
                  Email
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={`${field.name}-${idLoginForm}`}
                    placeholder="m@example.com"
                    autoComplete="email"
                    type="email"
                    autoFocus
                    required
                  />
                  <InputGroupAddon>
                    <AtSign />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="password" required>
                  Password
                </FieldLabel>
                <InputPassword
                  withIcon
                  {...field}
                  aria-invalid={fieldState.invalid}
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <Button type="submit">
              {isLoggingIn || isNavigating ? <Spinner /> : <LogInIcon />}
              {isLoggingIn
                ? "Logging in..."
                : isNavigating
                  ? "Navigating..."
                  : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Card>
  );
};
