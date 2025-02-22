import { query } from "./_generated/server";

export const getAllNgos = query(async ({ db }) => {
  return await db.query("ngos").collect();
});
