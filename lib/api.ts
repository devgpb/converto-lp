export const API_URL = ((): string => {
  // Prefer runtime-configurable public env var for client components
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Sensible local default
  return "http://localhost:3000/api";
})();

export async function apiFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
  const base = API_URL.replace(/\/$/, "");
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

