import { FieldValues, Path } from "react-hook-form";

export interface MetaPageProps {
  last: number;
  from: number;
  total: number;
  perPage: number;
}

export type PaginationMeta = {
  firstPage: number;
  lastPage: number;
  currentPage: number;
  from: number;
  last: number;
  total: number;
  perPage: number;
};

export type ApiValidationResponse<T extends FieldValues> = {
  message?: string;
  data?: {
    key: Path<T>;
    message: string;
  }[];
};
