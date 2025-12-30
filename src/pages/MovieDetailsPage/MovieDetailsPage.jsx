import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/tmdb";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const imgBase = import.meta.env.VITE_TMDB_IMG || "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function load() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [movieId]);

  const year = movie?.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const score = movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const genres = movie?.genres?.length ? movie.genres.map((g) => g.name).join(", ") : "No genres";

  return (
    <main className={css.page}>
      <Link to={backLinkRef.current} className={css.back}>
        ← Go back
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}

      {movie && (
        <>
          <div className={css.card}>
            {movie.poster_path ? (
              <img
                className={css.poster}
                src={`${imgBase}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className={css.noimg}>No poster</div>
            )}

            <div className={css.info}>
              <h2 className={css.title}>
                {movie.title} ({year})
              </h2>

              <p className={css.text}>
                <b>Score:</b> {score}
              </p>

              <p className={css.text}>
                <b>Overview:</b> {movie.overview || "No overview"}
              </p>

              <p className={css.text}>
                <b>Genres:</b> {genres}
              </p>
            </div>
          </div>

          <div className={css.add}>
            <p className={css.sub}>Additional information</p>

            <nav className={css.nav}>
              <NavLink
                to="cast"
                className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}
              >
                Cast
              </NavLink>

              <NavLink
                to="reviews"
                className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}
              >
                Reviews
              </NavLink>
            </nav>
          </div>

          <Outlet />
        </>
      )}
    </main>
  );
}
