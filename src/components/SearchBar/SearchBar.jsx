import { CUISINES } from "../../utils/cuisines";
import "./SearchBar.css";

export default function SearchBar({
  input,
  onInputChange,
  cuisine,
  onCuisineChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="searchBar">
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Search recipes..."
        className="searchBar__input"
      />

      <button type="submit" className="searchBar__button">
        Search
      </button>

      <select
        value={cuisine}
        onChange={(e) => onCuisineChange(e.target.value)}
        className="searchBar__select"
      >
        <option value="">All cuisines</option>
        {CUISINES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </form>
  );
}
