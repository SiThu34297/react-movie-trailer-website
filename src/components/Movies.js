import React from "react";
import Master from "../layouts/Master.js";
import tmdbApi, { movieType } from "../config/tmdbApi.js";
import { Link } from "react-router-dom";

export default function Movies() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [movies, setMovies] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState();
  const [search, setSearch] = React.useState();
  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const getMovies = async () => {
        const params = search
          ? { page: currentPage, query: search }
          : { page: currentPage };
        try {
          const response = search
            ? await tmdbApi.searchMovies({
                params,
              })
            : await tmdbApi.getMoviesList(movieType.popular, {
                params,
              });
          console.log(response);
          setTotalPages(response.total_pages);
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
  }, [currentPage, search]);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleChange = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };
  return (
    <Master>
      <div className="container py-5">
        <div className="row">
          <div className="col-3">
            <h4>Movies</h4>
          </div>
          <div className="col-4 offset-5">
            <div className="input-group mb-3">
              <span className="input-group-text bg-dark">
                <i className="fas fa-search text-white"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Movie Name"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row px-5 pt-5">
          <nav aria-label="Page navigation">
            <ul className="pagination d-flex justify-content-between">
              {currentPage === 1 ? (
                <li></li>
              ) : (
                <li className="page-item">
                  <button
                    className="btn btn-sm bg-light"
                    onClick={prevPage}
                    disabled={currentPage === 1 ? true : false}
                  >
                    <span>
                      <i className="fas fa-arrow-circle-left"></i>
                    </span>
                  </button>
                </li>
              )}
              {currentPage === totalPages ? (
                ""
              ) : (
                <li className="page-item">
                  <button
                    className="btn btn-sm bg-light"
                    onClick={nextPage}
                    disabled={currentPage === totalPages ? true : false}
                  >
                    <span>
                      <i className="fas fa-arrow-circle-right"></i>
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="row row-cols-3 row-cols-md-5 px-5">
          {movies.map((m) => {
            return (
              <div className="col pb-5" key={m.id}>
                <Link to={"/movie/" + m.id}>
                  {m.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face/${m.poster_path}`}
                      alt="poster"
                      className="img-fluid"
                    />
                  ) : (
                    <img
                      src={`https://via.placeholder.com/400x600/000000/?text=${m.title}`}
                      alt="poster"
                      className="img-fluid mb-2"
                    />
                  )}
                </Link>
                <Link
                  to={"/movie/" + m.id}
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
    </Master>
  );
}
