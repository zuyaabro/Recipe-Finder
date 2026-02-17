import { Link } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ id, title, image }) {
  return (
    <Link to={`/recipe/${id}`} className="recipeCard">
      <img src={image} alt={title} className="recipeCard__img" loading="lazy" />
      <div>
        <h3 className="recipeCard__name">{title}</h3>
      </div>
    </Link>
  );
}
