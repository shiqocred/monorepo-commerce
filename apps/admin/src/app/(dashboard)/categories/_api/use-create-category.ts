import { dataApi } from "@/lib/api";
import { Treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppModels } from "api";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { applyValidationErrors, isGuard } from "@/lib/utils";

export const useCreateCategory = <T extends FieldValues>(
  form?: UseFormReturn<T>,
) => {
  const createCategory = dataApi.admin.categories.post;
  const result = useMutation<
    Treaty.Data<typeof createCategory>,
    Treaty.Error<typeof createCategory>,
    AppModels["categories"]["create"]["body"]
  >({
    mutationFn: async ({ image, name }) => {
      const { data, error } = await createCategory({ image, name }, isGuard);

      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      if (form) applyValidationErrors(form, error.value);
      toast.error(error?.value.message);
      console.log("CREATE_CATEGORIES_ERROR:", JSON.stringify(error));
    },
  });
  return result;
};
