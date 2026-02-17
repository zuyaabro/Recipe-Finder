# Recipe Search (React + Spoonacular)

A React + Vite web app that lets users search recipes using the Spoonacular API, filter by cuisine, and view recipe details.

## Live Demo
- GitHub Pages: https://zuyaabro.github.io/Recipe-Finder/

---

## Features

### Home Page
- Search input + Search button
- Press **Enter** to search
- Filter by **Cuisine**
- Search results show:
  - Recipe name
  - Recipe image
- Pagination:
  - **5 results per page**
  - Prev / Next controls
- Click a recipe to go to the detail page

### Recipe Detail Page
- Recipe name + image
- Health information (e.g., vegan, dairy-free, gluten-free)
- Ingredients list with:
  - Ingredient name
  - Ingredient measure
- Cooking instructions (step list when available)

---

## Tech Stack
- React (Vite)
- React Router
- Spoonacular Food API

---

## Spoonacular API Docs
- Authentication: https://spoonacular.com/food-api/docs#Authentication
- Search Recipes (Complex): https://spoonacular.com/food-api/docs#Search-Recipes-Complex
- Get Recipe Information: https://spoonacular.com/food-api/docs#Get-Recipe-Information
- Supported Cuisines: https://spoonacular.com/food-api/docs#Cuisines

---

### 1) Install dependencies

npm install

### 2) Add Env Variables

VITE_SPOONACULAR_API_KEY=YOUR_SPOONACULAR_API_KEY

### 3) Run

npm run dev

### 4) Deploy GitHub Pages

npm run deploy

### Limitations:

Spoonacular has a daily “points” quota. If you see an error like:

API error 402: Your daily points limit has been reached

It means the quota for the key/account is exhausted. Options:

Try again after the daily reset

Use a different Spoonacular API key/account





