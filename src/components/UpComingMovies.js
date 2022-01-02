import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { movieType } from "../config/tmdbApi.js";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

export default function UpComingMovies() {
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const getMovies = async () => {
        const params = { page: 1 };
        try {
          const response = await tmdbApi.getMoviesList(movieType.upcoming, {
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
    <div className="container py-3">
      <h5 className="pt-5 pb-3 px-2">Upcoming Movies</h5>
      <div className="row px-3">
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
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Link to={`movie/${movie.id}`}>
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
  );
}
