import { useState } from "react";
import Searchbar from "./components/Searchbar";
import MovieList from "./components/MovieList";
import { searchMovies } from "./api";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  // ✅ ADD THIS (loading state)
  const [loading, setLoading] = useState(false);

  const handleSearch = async (name) => {
    if (!name) {
      setMovies([]);
      return;
    }

    try {
      // ✅ BEFORE API CALL
      setLoading(true);

      const res = await searchMovies(name);

      setMovies(res.data.Search || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      // ✅ AFTER API CALL
      setLoading(false);
    }
  };

const handleSelect = async (id) => {
  console.log("Clicked ID:", id); // 👈 ADD THIS

  const res = await axios.get(`http://localhost:8080/movies/${id}`);
  console.log(res.data); // 👈 ADD THIS

  setSelected(res.data);
}; 




  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movie Search App</h1>

      <Searchbar onSearch={handleSearch} />

      {/* ✅ LOADING UI */}

      {loading && (
  <div style={{ textAlign: "center", margin: "20px" }}>
    <div className="spinner"></div>
  </div>
)}

      {/* ✅ NO RESULTS */}
      {!loading && movies.length === 0 && <p>No movies found</p>}

      {/* ✅ MOVIE LIST */}
      <MovieList movies={movies} onSelect={handleSelect} />

      {/* ✅ DETAILS */}
      


      {selected && (
  <div className="details">
    <img src={selected.Poster} alt={selected.Title} />

    <div className="details-content">
      <h2>{selected.Title}</h2>
      <p>{selected.Year}</p>
      <p><b>Genre:</b> {selected.Genre}</p>
      <p><b>Rating:</b> ⭐ {selected.imdbRating}</p>
      <p>{selected.Plot}</p>
    </div>
  </div>
)}
    </div>
  );
}

export default App;