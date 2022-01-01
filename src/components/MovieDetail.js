import React from "react";
import Master from "../layouts/Master.js";
import { useParams } from "react-router-dom";
import tmdbApi from "../config/tmdbApi.js";
import dateFormat, { masks } from "dateformat";
import Loader from "./Loader.js";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

export default function MovieDetail() {
  let { id } = useParams();
  const [movie, setMovie] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [cast, setCast] = React.useState([]);
  const [similar, setSimilar] = React.useState([]);
  const [video, setVideo] = React.useState("");

  React.useEffect(() => {
    setLoader(true);
    let apiCall = true;
    if (apiCall) {
      const getMovie = async () => {
        const params = {};
        try {
          const response = await tmdbApi.getMovieDetail(id, { params });
          setMovie(response);
          setLoader(false);
        } catch {
          console.log("error");
        }
      };
      const getCredits = async () => {
        const params = {};
        try {
          const response = await tmdbApi.getMovieCredits(id, { params });
          setCast(response.cast.slice(0, 4));
          setLoader(false);
        } catch {
          console.log("error");
        }
      };
      const getSimilarMovies = async () => {
        const params = { page: 1 };
        try {
          const response = await tmdbApi.getSimilarMovies(id, { params });
          setSimilar(response.results);
          setLoader(false);
        } catch {
          console.log("error");
        }
      };
      getMovie();
      getCredits();
      getSimilarMovies();
    }
    return () => {
      apiCall = false;
    };
  }, [id]);

  const handleModal = () => {
    const getVideo = async () => {
      const params = {};
      try {
        const response = await tmdbApi.getVideo(id, { params });
        setVideo(response.results[0].key);
      } catch {
        console.log("error");
      }
    };
    getVideo();
  };
  const handleClose = () => {
    setVideo("");
  };
  return (
    <div>
      {/* Modal */}
      <div className="modal fade" id="movie">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {movie.title}
              </h5>
              <button
                onClick={handleClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <iframe
                width="100%"
                height="400"
                frameBorder="0"
                src={`https://www.youtube.com/embed/${video}`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Master>
        {loader ? (
          <Loader />
        ) : (
          <div className="container py-5">
            <div className="row p-3">
              <div className="col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="poster"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-8">
                <h3 className="pb-2">{movie.title}</h3>
                <div className="pb-4">
                  {movie.genres
                    ? movie.genres.map((d) => {
                        return (
                          <span key={d.id} className="badge bg-light text-dark">
                            {d.name}
                          </span>
                        );
                      })
                    : "There is no genres"}
                  <span className="badge bg-light text-dark">
                    Release date :
                    {dateFormat(movie.release_date, "dddd, mmmm dS, yyyy")}
                  </span>
                  <span className="badge bg-light text-dark">
                    Popularity :{movie.popularity}
                  </span>
                </div>
                <p className="pb-2">{movie.overview}</p>
                <button
                  onClick={handleModal}
                  data-bs-toggle="modal"
                  data-bs-target="#movie"
                  className="btn btn-warning mb-4"
                >
                  Watch Trailer
                  <span className="ms-2">
                    <i className="fas fa-play-circle"></i>
                  </span>
                </button>
                <div className="row">
                  <h3>Cast</h3>
                  {cast.map((d) => {
                    return (
                      <div className="col-3" key={d.id}>
                        {d.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/original/${d.profile_path}`}
                            alt="poster"
                            className="img-fluid mb-2"
                          />
                        ) : (
                          <img
                            src={`https://via.placeholder.com/400x600/000000/?text=${d.name}`}
                            alt="poster"
                            className="img-fluid mb-2"
                          />
                        )}
                        <span className="h-movie-detail">{d.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="row p-3">
              <h5>Similar Movies</h5>
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  "640": {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  "768": {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  "1024": {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
              >
                {similar.map((movie) => {
                  return (
                    <SwiperSlide key={movie.id}>
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt="poster"
                          className="card-img"
                        />
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        )}
      </Master>
    </div>
  );
}
