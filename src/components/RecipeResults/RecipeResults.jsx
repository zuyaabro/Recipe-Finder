import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeResults.css";

export default function RecipeResults({ results }) {
  return (
    <div className="results">
      {results.map((r) => (
        <RecipeCard key={r.id} id={r.id} title={r.title} image={r.image} />
      ))}
    </div>
  );
}
