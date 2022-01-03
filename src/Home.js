import React from "react";
import "./css/master.css";
import Master from "./layouts/Master.js";
import PopularMovies from "./components/PopularMovies.js";
import HeaderBanner from "./components/HeaderBanner.js";
import NowPlayingMovies from "./components/NowPlayingMovies.js";
import UpComingMovies from "./components/UpComingMovies.js";
import Loader from "./components/Loader.js";

export default function Home() {
  const [loader, setLoader] = React.useState(true);
  React.useEffect(() => {
    setInterval(function () {
      setLoader(false);
    }, 1000);
  });
  return (
    <Master>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <HeaderBanner />
          <UpComingMovies />
          <PopularMovies />
          <NowPlayingMovies />
        </div>
      )}
    </Master>
  );
}
