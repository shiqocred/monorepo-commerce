import { dataApi } from "@/lib/api";
import { Treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppModels } from "api";

export const useRegister = () => {
  const registerApi = dataApi.admin.auth.signup.post;
  const result = useMutation<
    Treaty.Data<typeof registerApi>,
    Treaty.Error<typeof registerApi>,
    AppModels["auth"]["register"]["body"]
  >({
    mutationFn: async ({ name, email, password }) => {
      const { data, error } = await registerApi({ name, email, password });

      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.value.message);
      console.log("REGISTER_ERROR:", JSON.stringify(error));
    },
  });
  return result;
};
