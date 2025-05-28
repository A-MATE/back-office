export async function fetcher<T>(
  url: string,
  token?: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

  if (!baseUrl) {
    throw new Error("API base URL is not defined");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-origin": process.env.NEXT_PUBLIC_ORIGIN ?? process.env.ORIGIN ?? "",
    "x-client-id":
      process.env.NEXT_PUBLIC_CLIENT_ID ?? process.env.CLIENT_ID ?? "",
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "API request failed");
  }

  return res.json();
}
