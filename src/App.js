import { useState } from "react";
import Searchbar from "./components/Searchbar";
import MovieList from "./components/MovieList";
import { searchMovies } from "./api";
import axios from "axios";
import "./App.css";
function App() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (name) => {
    if (!name) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      const res = await searchMovies(name);
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/movies/${id}`);
      setSelected(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* 🔥 HEADER */}
      <div className="header">
        <h1>🎬 MovieFlix</h1>
      </div>

      <Searchbar onSearch={handleSearch} />

      {loading && (
        <div className="center">
          <div className="spinner"></div>
        </div>
      )}

      {!loading && movies.length === 0 && (
        <p className="center">No movies found</p>
      )}

      <MovieList movies={movies} onSelect={handleSelect} />

      {/* 🔥 MODAL POPUP */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.Poster} alt={selected.Title} />

            <div>
              <h2>{selected.Title}</h2>
              <p>{selected.Year}</p>
              <p><b>Genre:</b> {selected.Genre}</p>
              <p><b>Rating:</b> ⭐ {selected.imdbRating}</p>
              <p>{selected.Plot}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;