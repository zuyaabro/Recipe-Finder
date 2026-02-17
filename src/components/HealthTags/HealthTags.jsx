import "./HealthTags.css";

export default function HealthTags({
  tags,
  wrapperClassName = "",
  tagClassName = "",
}) {
  if (!tags?.length) return <p>No health tags available.</p>;

  return (
    <div className={`healthTags ${wrapperClassName}`.trim()}>
      {tags.map((t) => (
        <span key={t} className={`healthTags__tag ${tagClassName}`.trim()}>
          {t}
        </span>
      ))}
    </div>
  );
}
