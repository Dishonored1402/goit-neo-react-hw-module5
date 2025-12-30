import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/tmdb";
import MovieList from "../../components/MovieList/MovieList.jsx";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setError(false);
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className={css.page}>
      <h1 className={css.title}>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
