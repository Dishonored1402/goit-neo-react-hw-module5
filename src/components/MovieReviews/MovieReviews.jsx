import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdb";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Reviews load error...</p>;
  if (!reviews.length) return <p>No reviews.</p>;

  return (
    <ul className={css.list}>
      {reviews.map((r) => (
        <li key={r.id} className={css.item}>
          <p className={css.author}>Author: {r.author}</p>
          <p className={css.text}>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
