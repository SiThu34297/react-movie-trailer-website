import Home from "./Home.js";
import MovieDetail from "./components/MovieDetail.js";
import Movies from "./components/Movies.js";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movies/" element={<Movies />} />
    </Routes>
  );
}
