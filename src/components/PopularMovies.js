import React from "react";
import tmdbApi, { movieType } from "../config/tmdbApi.js";
import apiConfig from "../config/apiConfig.js";
import { Link } from "react-router-dom";

export default function PopularMovies() {
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const getMovies = async () => {
        const params = { page: 1 };
        try {
          const response = await tmdbApi.getMoviesList(movieType.popular, {
            params,
          });
          setMovies(response.results);
        } catch {
          console.log("error");
        }
      };
      getMovies();
    }
    return () => {
      apiCall = false;
    };
  }, []);
  return (
    <div className="container">
      <h5 className="pt-5 pb-3 px-2">Popular Movies</h5>
      <div className="row row-cols-3 row-cols-md-5">
        {movies.map((m) => {
          return (
            <div className="col pb-5" key={m.id}>
              <Link to={`movie/${m.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w440_and_h660_face/${m.poster_path}`}
                  alt="poster"
                  className="img-fluid"
                />
              </Link>
              <Link
                to={`movie/${m.id}`}
                className="text-decoration-none text-white"
              >
                <span className="p-movie-name card-title text-truncate d-block mt-2">
                  {m.title}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
