import React from "react";
import "./css/master.css";
import Master from "./layouts/Master.js";
import PopularMovies from "./components/PopularMovies.js";
import HeaderBanner from "./components/HeaderBanner.js";
import NowPlayingMovies from "./components/NowPlayingMovies.js";
import UpComingMovies from "./components/UpComingMovies.js";

export default function Home() {
  return (
    <Master>
      <HeaderBanner />
      <UpComingMovies />
      <PopularMovies />
      <NowPlayingMovies />
    </Master>
  );
}
