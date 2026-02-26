import "server-only";

import { apiUrl, secretName } from "@/config";
import { cookies } from "next/headers";

export const getSession = async () => {
  const cookie = await cookies();
  const res = await fetch(`${apiUrl}/admin/auth/session`, {
    method: "GET",
    headers: { Authorization: `Bearer ${cookie.get(secretName)?.value}` },
    cache: "no-store",
  });

  if (!res.ok) return false;

  return true;
};
