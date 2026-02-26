"use client";

import { useState } from "react";
import { useDebounce } from "./use-debounce";
import { parseAsString, useQueryState } from "nuqs";

/**
 * @description
 * Custom hook untuk mengelola query parameter `?q=` dari URL.
 * Termasuk `useDebounce` otomatis agar search tidak terlalu cepat trigger.
 *
 * @returns
 * - `search`: nilai dari URL (?q=)
 * - `searchValue`: hasil debounced dari search
 * - `setSearch`: setter untuk update query ?q=
 *
 * Example Usage:
 * ```ts
 *   const { search, searchValue, setSearch } = useSearchQuery();
 *   const { data, ... } = useGet({ q: searchValue });
 *
 *   return <Input value={search ?? ""} onChange={(e) => setSearch(e.target.value)} />
 * ```
 */
export const useSearchQuery = (indicator: string = "q") => {
  const [search, setSearch] = useQueryState(
    indicator,
    parseAsString.withDefault(""),
  );
  const searchValue = useDebounce(search);

  return { search, searchValue, setSearch };
};

/**
 * @description
 * Custom hook untuk mengelola query bukan searchParams.
 * Termasuk `useDebounce` otomatis agar search tidak terlalu cepat trigger.
 *
 * @returns
 * - `search`: nilai dari
 * - `searchValue`: hasil debounced dari search
 * - `setSearch`: setter untuk update query
 *
 * Example Usage:
 * ```ts
 *   const { search, searchValue, setSearch } = useSearch();
 *   const { data, ... } = useGet({ q: searchValue });
 *
 *   return <Input value={search ?? ""} onChange={(e) => setSearch(e.target.value)} />
 * ```
 */
export const useSearch = () => {
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);

  return { search, searchValue, setSearch };
};
