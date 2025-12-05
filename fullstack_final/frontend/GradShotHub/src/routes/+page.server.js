import { fail, redirect } from "@sveltejs/kit";
import { register, login } from "$lib/api.js";

export const actions = {
  login: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    const res = await login({ email: data.email, password: data.password });

    if (!res.user) return fail(400, { message: res.detail || "Login failed" });

    // redirect ไป home หลัง login
    return {
      success: true,
      user: res.user
    };
  },

  register: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    const res = await register({ name: data.name, email: data.email, password: data.password });

    if (!res.message) return fail(400, { message: res.detail || "Register failed" });

    return {
      success: true,
      message: "Register success! Please login."
    };
  }
};