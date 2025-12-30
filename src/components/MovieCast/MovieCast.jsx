import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/tmdb";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [movieId]);

  const imgBase = import.meta.env.VITE_TMDB_IMG;

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>Cast load error...</p>;
  if (!cast.length) return <p>No cast information.</p>;

  return (
    <ul className={css.list}>
      {cast.map((a) => (
        <li key={a.cast_id ?? a.credit_id} className={css.item}>
          {a.profile_path ? (
            <img
              src={`${imgBase}${a.profile_path}`}
              alt={a.name}
              className={css.img}
            />
          ) : (
            <div className={css.noimg}>No photo</div>
          )}
          <p className={css.name}>{a.name}</p>
          <p className={css.role}>as {a.character}</p>
        </li>
      ))}
    </ul>
  );
}
