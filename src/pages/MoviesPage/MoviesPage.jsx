import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/tmdb";
import MovieList from "../../components/MovieList/MovieList.jsx";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) return;

    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    async function load() {
      try {
        setError(false);
        setLoading(true);
        setMovies([]);

        const data = await searchMovies(query);
        const results = Array.isArray(data) ? data : data.results ?? [];
        setMovies(results);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [query]);

  return (
    <main className={css.page}>
      <h1 className={css.title}>Search movies</h1>

      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="query"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter movie name"
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && query && movies.length === 0 && <p>No movies found.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
