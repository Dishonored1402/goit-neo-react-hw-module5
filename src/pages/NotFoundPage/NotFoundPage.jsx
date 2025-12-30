import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={css.page}>
      <h1>404 - Not found</h1>
      <Link to="/">Go to Home</Link>
    </main>
  );
}
