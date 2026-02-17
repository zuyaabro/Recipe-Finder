import { Link } from "react-router-dom";
import "./BackLink.css";

export default function BackLink({
  to = "/",
  children = "← Back",
  className = "",
}) {
  return (
    <Link to={to} className={`backLink ${className}`.trim()}>
      {children}
    </Link>
  );
}
