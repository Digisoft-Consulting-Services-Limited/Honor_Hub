// src/lib/apiFetch.ts
import { ensureValidToken } from "../lib/GuestUserAuth";

// A thin fetch wrapper that:
// 1. Gets (or refreshes) a valid token before each request.
// 2. Attaches the Authorization header automatically.
// 3. Leaves the global `fetch` completely untouched.
//
// Usage:
//   import { apiFetch } from "@/lib/apiFetch";
//   const res = await apiFetch("/some/upstream/endpoint", { method: "GET" });

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const token = await ensureValidToken();

  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, { ...init, headers });
}