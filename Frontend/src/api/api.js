const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export async function fetchProducts() {
  console.log("API_URL:", API_URL);
  console.log("API_TOKEN:", API_TOKEN);

  const res = await fetch(`${API_URL}/oils?populate=*`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  const data = await res.json();
  console.log("Strapi Response:", data);
  return data;
}
