import Home from "./Home.js";
import MovieDetail from "./components/MovieDetail.js";
import Movies from "./components/Movies.js";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/movie/:id" element={<MovieDetail />} />
      <Route exact path="/movies" element={<Movies />} />
    </Routes>
  );
}
