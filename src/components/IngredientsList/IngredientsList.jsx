import "./IngredientsList.css";

export default function IngredientsList({ ingredients }) {
  if (!ingredients?.length) return <p>No ingredients available.</p>;

  return (
    <ul className="ingredientsList">
      {ingredients.map((ing) => {
        const metric = ing.measures?.metric;
        const measure = metric
          ? `${metric.amount} ${metric.unitShort}`.trim()
          : ing.original;

        return (
          <li className="ingredientsList__item" key={ing.id || ing.name}>
            <strong>{ing.name}</strong> — {measure}
          </li>
        );
      })}
    </ul>
  );
}
