export async function apiClient(endpoint, options = {}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    }
  );

  const data = await res.json();


  if (data.status && data.status !== "success") {
    throw new Error(data.message || "Request failed");
  }

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
