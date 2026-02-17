import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeInfo } from "../api/spoonacular";
import BackLink from "../components/BackLink/BackLink";
import RecipeHeader from "../components/RecipeHeader/RecipeHeader";
import HealthTags from "../components/HealthTags/HealthTags";
import IngredientsList from "../components/IngredientsList/IngredientsList";
import Instructions from "../components/Instructions/Instructions";
import "./RecipeDetailPage.css";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getRecipeInfo(id);
        if (alive) setRecipe(data);
      } catch (e) {
        if (alive) setError(e.message || "Failed to load recipe.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  const healthTags = useMemo(() => {
    if (!recipe) return [];
    const tags = [];
    if (recipe.vegan) tags.push("Vegan");
    if (recipe.vegetarian) tags.push("Vegetarian");
    if (recipe.dairyFree) tags.push("Dairy-free");
    if (recipe.glutenFree) tags.push("Gluten-free");
    if (recipe.veryHealthy) tags.push("Very healthy");
    return tags;
  }, [recipe]);

  const ingredients = recipe?.extendedIngredients ?? [];

  const steps = useMemo(() => {
    const analyzed = recipe?.analyzedInstructions?.[0]?.steps;
    if (analyzed?.length) return analyzed.map((s) => s.step);

    if (recipe?.instructions)
      return [recipe.instructions.replace(/<[^>]*>/g, "")];
    return [];
  }, [recipe]);

  if (loading) return <p className="detail__status">Loading…</p>;
  if (error) return <p className="detail__error">{error}</p>;
  if (!recipe) return <p className="detail__status">Not found.</p>;

  return (
    <div className="detail">
      <BackLink to="/" className="detail__back" />

      <RecipeHeader
        title={recipe.title}
        image={recipe.image}
        titleClassName="detail__title"
        imageClassName="detail__image"
      />

      <h2 className="detail__sectionTitle">Health Information</h2>
      <HealthTags
        tags={healthTags}
        wrapperClassName="detail__tags"
        tagClassName="detail__tag"
      />

      <h2 className="detail__sectionTitle">Ingredients</h2>
      <IngredientsList ingredients={ingredients} />

      <h2 className="detail__sectionTitle">Cooking Instructions</h2>
      <Instructions steps={steps} />
    </div>
  );
}
