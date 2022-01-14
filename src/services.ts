export async function fetchData(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: object
) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
