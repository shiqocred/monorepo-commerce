import { dataApi } from "@/lib/api";
import { isGuard } from "@/lib/utils";
import { Treaty } from "@elysiajs/eden";
import { useQuery } from "@tanstack/react-query";

export const categoriesListApi = dataApi.admin.categories.get;

export const useGetCategories = ({
  q,
  sort,
  order,
  limit,
  page,
}: {
  q: string;
  sort: string;
  order: string;
  limit: number;
  page: number;
}) => {
  const result = useQuery<
    Treaty.Data<typeof categoriesListApi>,
    Treaty.Error<typeof categoriesListApi>
  >({
    queryKey: ["categories-list"],
    queryFn: async () => {
      const response = await categoriesListApi({
        ...isGuard,
        query: {
          q,
          sort,
          order,
          limit,
          page,
        },
      });

      return response.data;
    },
  });
  return result;
};
