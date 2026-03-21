import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import MovieList from "./components/MovieList";
import { searchMovies } from "./api";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔍 Search movies
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

  // 🎬 Select movie
  const handleSelect = async (id) => {
    setSelected(null);

    try {
      const res = await axios.get(`http://localhost:8080/movies/${id}`);
      setSelected(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // // ❤️ Add to favorites (✅ CORRECT VERSION)
  // const handleFavorite = async (movie) => {
  //   try {
  //     await axios.post("http://localhost:8080/favorites", {
  //       imdbID: movie.imdbID,
  //       title: movie.Title,
  //       poster: movie.Poster,
  //       year: movie.Year,
  //     });

  //     alert("Added to favorites ❤️");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };



  const handleFavorite = async (movie) => {
  console.log("SENDING MOVIE:", movie); // 🔥 DEBUG

  try {
    const res = await axios.post("http://localhost:8080/favorites", {
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year
    });

    console.log("RESPONSE:", res.data); // 🔥 DEBUG
    alert("Added to favorites ❤️");
  } catch (err) {
    console.error("ERROR:", err.response || err.message); // 🔥 DEBUG
  }
};
  // ❌ Close modal with ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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
        <p className="center">🔍 Start searching for movies...</p>
      )}

      <MovieList
        movies={movies}
        onSelect={handleSelect}
        onFavorite={handleFavorite}
      />

      {/* 🎬 MODAL */}
      {selected != null && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ CLOSE BUTTON */}
            <span
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              ✖
            </span>

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