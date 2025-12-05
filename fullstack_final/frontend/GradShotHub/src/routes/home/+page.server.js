import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  // @ts-ignore
  const user = locals.user || null;

  if (!user) throw redirect(302, "/");

  return { user };
};