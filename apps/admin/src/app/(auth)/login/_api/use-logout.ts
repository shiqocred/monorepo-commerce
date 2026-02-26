import { secretName } from "@/config";
import { dataApi } from "@/lib/api";
import { isGuard } from "@/lib/utils";
import { Treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next/client";
import { toast } from "sonner";

export const useLogout = () => {
  const logoutApi = dataApi.admin.auth.logout.post;
  const result = useMutation<
    Treaty.Data<typeof logoutApi>,
    Treaty.Error<typeof logoutApi>
  >({
    mutationFn: async () => {
      const { data, error } = await logoutApi({}, isGuard);

      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      deleteCookie(secretName);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.value.message);
      console.log("LOGOUT_ERROR:", JSON.stringify(error));
    },
  });
  return result;
};
