import { getPhotographers } from "$lib/api.js";

export const load = async () => {
  const photographers = await getPhotographers();
  return { photographers };
};