import { secretName } from "@/config";
import { dataApi } from "@/lib/api";
import { Treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next/client";
import { toast } from "sonner";
import { AppModels } from "api";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { applyValidationErrors } from "@/lib/utils";

export const useLogin = <T extends FieldValues>(form?: UseFormReturn<T>) => {
  const loginApi = dataApi.admin.auth.login.post;
  const result = useMutation<
    Treaty.Data<typeof loginApi>,
    Treaty.Error<typeof loginApi>,
    AppModels["auth"]["login"]["body"]
  >({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await loginApi({ email, password });

      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      setCookie(secretName, data.data.token, {
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      toast.success(data.message);
    },
    onError: (error) => {
      if (form) applyValidationErrors(form, error.value);
      toast.error(error?.value.message);
      console.log("LOGIN_ERROR:", JSON.stringify(error));
    },
  });
  return result;
};
