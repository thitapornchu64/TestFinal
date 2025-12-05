const BASE_URL = "http://127.0.0.1:8000";

// @ts-ignore
export async function register({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

// @ts-ignore
export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function getPhotographers() {
  const res = await fetch(`${BASE_URL}/photographer`);
  return res.json();
}

// @ts-ignore
export async function getSlots(photographer_id) {
  const res = await fetch(`${BASE_URL}/slot/${photographer_id}`);
  return res.json();
}

// @ts-ignore
export async function createBooking({ user_id, photographer_id, slot_id, package_id }) {
  const res = await fetch(`${BASE_URL}/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, photographer_id, slot_id, package_id })
  });
  return res.json();
}