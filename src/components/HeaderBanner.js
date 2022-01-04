import React from "react";
import tmdbApi, { movieType } from "../config/tmdbApi.js";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
// import Swiper core and required modules
import SwiperCore, { Autoplay } from "swiper";
import VideoModal from "./VideoModal.js";
// install Swiper modules
SwiperCore.use([Autoplay]);

export default function HeaderBanner() {
  const [movies, setMovies] = React.useState([]);
  const [video, setVideo] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const getMovies = async () => {
        const params = { page: 1 };
        try {
          const response = await tmdbApi.getMoviesList(movieType.popular, {
            params,
          });
          setMovies(response.results.slice(4, 7));
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

  const openModal = (id) => {
    setShowModal(true);
    const getVideo = async () => {
      const params = { append_to_response: "videos" };
      try {
        const response = await tmdbApi.getMovieDetail(id, { params });
        setVideo(response.videos.results[0].key);
        setTitle(response.title);
      } catch {
        console.log("error");
      }
    };
    getVideo();
  };

  return (
    <div>
      {/* Modal */}
      {showModal ? (
        <VideoModal
          showModal={showModal}
          setShowModal={setShowModal}
          video={video}
          title={title}
        />
      ) : null}
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <div className="banner-container">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt="poster"
                  className="banner-image"
                />
                <div className="banner-text">
                  <h2>{movie.title}</h2>
                  <p className="py-md-4 py-1">{movie.overview}</p>
                  <button
                    onClick={() => {
                      openModal(movie.id);
                    }}
                    className="btn btn-light btn-lg  me-3"
                  >
                    Watch Trailer
                    <span className="ms-2">
                      <i className="fas fa-play-circle"></i>
                    </span>
                  </button>
                  <Link
                    to={`/movie/${movie.id}`}
                    className="btn btn-outline-light link"
                  >
                    View Detail
                    <span className="ms-2">
                      <i className="far fa-eye"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
