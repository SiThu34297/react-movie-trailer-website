import React from "react";
import Master from "../layouts/Master.js";
import { useParams } from "react-router-dom";
import tmdbApi from "../config/tmdbApi.js";
import dateFormat from "dateformat";
import Loader from "./Loader.js";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoModal from "./VideoModal.js";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../css/master.css";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";
// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

export default function MovieDetail() {
  let { id } = useParams();
  let location = useLocation();

  const [movie, setMovie] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [cast, setCast] = React.useState([]);
  const [similar, setSimilar] = React.useState([]);
  const [video, setVideo] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setLoader(true);
    let apiCall = true;
    if (apiCall) {
      const getMovie = async () => {
        const params = { append_to_response: "videos" };
        try {
          const response = await tmdbApi.getMovieDetail(id, { params });
          setMovie(response);
          setVideo(response.videos.results[0].key);
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
  }, [id, location]);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      {/* Modal */}
      {showModal ? (
        <VideoModal
          showModal={showModal}
          setShowModal={setShowModal}
          video={video}
          title={movie.title}
        />
      ) : null}
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
                <button className="btn btn-warning mb-4" onClick={openModal}>
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
                          <Link to={"/actor/" + d.id}>
                            <img
                              src={`https://image.tmdb.org/t/p/original/${d.profile_path}`}
                              alt="poster"
                              className="img-fluid mb-2"
                            />
                          </Link>
                        ) : (
                          <Link to={"/actor/" + d.id}>
                            <img
                              src={`https://via.placeholder.com/400x600/000000/?text=${d.name}`}
                              alt="poster"
                              className="img-fluid mb-2"
                            />
                          </Link>
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
                          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
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
