import axios from "axios";

const token = import.meta.env.VITE_TMDB_TOKEN;

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getTrendingMovies = async () => {
  const { data } = await tmdb.get("/trending/movie/day");
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await tmdb.get("/search/movie", {
    params: { query, include_adult: false, language: "en-US", page: 1 },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });
  return data;
};

export const getMovieCredits = async (movieId) => {
  const { data } = await tmdb.get(`/movie/${movieId}/credits`, {
    params: { language: "en-US" },
  });
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await tmdb.get(`/movie/${movieId}/reviews`, {
    params: { language: "en-US" },
  });
  return data.results;
};
