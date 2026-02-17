import "./Instructions.css";

export default function Instructions({ steps }) {
  if (!steps?.length) return <p>No instructions available.</p>;

  return (
    <ol className="instructions">
      {steps.map((s, idx) => (
        <li className="instructions__item" key={idx}>
          {s}
        </li>
      ))}
    </ol>
  );
}
