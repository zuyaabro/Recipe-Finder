import "./RecipeHeader.css";

export default function RecipeHeader({
  title,
  image,
  titleClassName = "",
  imageClassName = "",
}) {
  return (
    <>
      <h1 className={`recipeHeader__title ${titleClassName}`.trim()}>
        {title}
      </h1>
      <img
        src={image}
        alt={title}
        className={`recipeHeader__image ${imageClassName}`.trim()}
      />
    </>
  );
}
