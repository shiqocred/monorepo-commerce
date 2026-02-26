import { secretName } from "@/config";
import { getCookie } from "cookies-next/client";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ApiValidationResponse } from "./types";

export const formatRole = (role: string) => {
  return role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (s) => s.toUpperCase());
};

export function applyValidationErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  response?: ApiValidationResponse<T>,
) {
  if (response?.message !== "Validation Error") return;

  response.data?.forEach((err) => {
    form.setError(err.key, { message: err.message });
  });
}

export const isGuard = {
  headers: { Authorization: `Bearer ${getCookie(secretName)}` },
};

export const sizesImage = "(max-width: 768px) 100vw, 50vw";
