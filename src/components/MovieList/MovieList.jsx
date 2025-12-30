import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const IMG_URL = "https://image.tmdb.org/t/p/w200";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((m) => (
        <li key={m.id} className={css.item}>
          <Link
            to={`/movies/${m.id}`}
            state={location}
            className={css.link}
          >
            {m.poster_path && (
              <img
                src={`${IMG_URL}${m.poster_path}`}
                alt={m.title}
                className={css.img}
              />
            )}
            <span>{m.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
