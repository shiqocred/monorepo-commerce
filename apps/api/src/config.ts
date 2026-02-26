export const apiUrl = Bun.env.BASE_URL_API! ?? "http://localhost:3002";
export const imageUrl = `${apiUrl}/images`;
export const tokoUrl = Bun.env.BASE_URL_TOKO! ?? "http://localhost:3000";
export const adminUrl = Bun.env.BASE_URL_ADMIN! ?? "http://localhost:3001";
export const databaseUrl =
  Bun.env.DATABASE_URL! ?? "postgresql://postgress:secret@localhost:5432/mydb";
export const nodeEnv = Bun.env.NODE_ENV! ?? "development";
