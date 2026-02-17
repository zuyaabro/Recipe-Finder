const BASE_URL = "https://api.spoonacular.com";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

function withKey(params) {
  if (!apiKey) throw new Error("Missing VITE_SPOONACULAR_API_KEY");
  return { ...params, apiKey };
}

async function request(path, params = {}) {
  const url = new URL(BASE_URL + path);
  const allParams = withKey(params);

  Object.entries(allParams).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "")
      url.searchParams.set(k, String(v));
  });

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function searchRecipes({ query, cuisine, page }) {
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  return request("/recipes/complexSearch", {
    query,
    cuisine,
    number: pageSize,
    offset,
  });
}

export async function getRecipeInfo(id) {
  return request(`/recipes/${id}/information`, {
    includeNutrition: false,
  });
}
