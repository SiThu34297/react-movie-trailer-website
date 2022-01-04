import React from "react";
import Master from "../layouts/Master.js";
import tmdbApi, { personType } from "../config/tmdbApi.js";
import { Link } from "react-router-dom";
import Loader from "./Loader.js";

export default function Actors() {
  const [cast, setCast] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState();
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const params = search
        ? { page: currentPage, query: search }
        : { page: currentPage };
      const getActors = async () => {
        try {
          const response = search
            ? await tmdbApi.searchPerson({
                params,
              })
            : await tmdbApi.getPerson(personType.popular, {
                params,
              });
          setCast(response.results);
          setTotalPages(response.total_pages);
          setLoader(false);
        } catch {
          console.log("error");
        }
      };
      getActors();
    }
    return () => {
      apiCall = false;
    };
  }, [currentPage, search]);

  const nextPage = () => {
    setLoader(true);
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setLoader(true);
    setCurrentPage(currentPage - 1);
  };
  const handleChange = (e) => {
    setCurrentPage(1);
    setLoader(true);
    setSearch(e.target.value);
  };
  return (
    <Master>
      <div className="container py-5">
        <div className="row">
          <div className="row">
            <div className="col-md-3">
              <h4>Casts</h4>
            </div>
            <div className="col-md-4 offset-md-5">
              <div className="input-group mb-3">
                <span className="input-group-text bg-dark">
                  <i className="fas fa-search text-white"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cast Name"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row pt-5">
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
          {loader ? (
            <Loader />
          ) : (
            <div className="row row-cols-3 row-cols-md-5">
              {cast.map((m) => {
                return (
                  <div className="col pb-5" key={m.id}>
                    <Link to={"/actor/" + m.id}>
                      {m.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${m.profile_path}`}
                          alt="poster"
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src={`https://via.placeholder.com/400x600/000000/?text=${m.name}`}
                          alt="poster"
                          className="img-fluid mb-2"
                        />
                      )}
                    </Link>
                    <Link
                      to={"/actor/" + m.id}
                      className="text-decoration-none text-white"
                    >
                      <span className="p-movie-name card-title text-truncate d-block mt-2">
                        {m.name}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Master>
  );
}
