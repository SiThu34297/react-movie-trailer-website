import axiosClient from "./axiosClient.js";

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
  now_playing: "now_playing",
};
const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  searchMovies: (params) => {
    const url = "search/movie/";
    return axiosClient.get(url, params);
  },
  getMovieDetail: (movie_id, params) => {
    const url = "movie/" + movie_id;
    return axiosClient.get(url, params);
  },
  getMovieCredits: (movie_id, params) => {
    const url = "movie/" + movie_id + "/credits";
    return axiosClient.get(url, params);
  },
  getSimilarMovies: (movie_id, params) => {
    const url = "movie/" + movie_id + "/similar";
    return axiosClient.get(url, params);
  },
  getVideo: (movie_id, params) => {
    const url = "movie/" + movie_id + "/videos";
    return axiosClient.get(url, params);
  },
};
export default tmdbApi;
