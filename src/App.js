import Home from "./Home.js";
import MovieDetail from "./components/MovieDetail.js";
import Movies from "./components/Movies.js";
import Actors from "./components/Actors.js";
import ActorDetail from "./components/ActorDetail.js";

import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/movie/:id" element={<MovieDetail />} />
      <Route exact path="/actors" element={<Actors />} />
      <Route exact path="/actor/:id" element={<ActorDetail />} />
    </Routes>
  );
}
