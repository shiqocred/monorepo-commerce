import { jwtVerify, createRemoteJWKSet } from "jose";

export const successRes = <T>(data: T, message: string) => ({
  status: true,
  message,
  data,
});

export const errorRes = <T>(data: T, message: string) => ({
  status: false,
  message,
  data,
});

export const buildPaginationParams = (page?: number, limit?: number) => {
  const MAX_LIMIT = 100;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  const currentPage = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const perPage =
    !isNaN(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, MAX_LIMIT)
      : 10;

  const offset = (currentPage - 1) * perPage;

  return {
    currentPage,
    perPage,
    offset,
  };
};

export const buildPaginationMeta = ({
  total,
  currentPage,
  perPage,
}: {
  total: number;
  currentPage: number;
  perPage: number;
}) => {
  const lastPage = Math.ceil(total / perPage);
  const offset = (currentPage - 1) * perPage;

  return {
    firstPage: 1,
    lastPage,
    currentPage,
    from: total === 0 ? 0 : offset + 1,
    last: Math.min(offset + perPage, total),
    total,
    perPage,
  };
};

export async function validateToken(token: string) {
  try {
    const JWKS = createRemoteJWKSet(
      new URL("http://localhost:3002/api/auth/jwks"),
    );
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: "http://localhost:3002",
      audience: "http://localhost:3002",
    });
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw error;
  }
}
