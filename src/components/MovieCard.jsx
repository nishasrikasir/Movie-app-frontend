
export default function MovieCard({ movie, onSelect, onFavorite }) {
  return (
    <div className="movie-card">

      {/* 🎬 CLICK ONLY IMAGE */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        onClick={() => onSelect(movie.imdbID)}
      />

      {/* 🔥 ALWAYS VISIBLE CONTENT */}
      <div className="overlay">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>

        {/* ❤️ BUTTON */}
        <button
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation();
            alert("BUTTON CLICK WORKING ✅");   // 🔥 DEBUG
            onFavorite(movie);
          }}
        >
          ❤️ Favorite
        </button>
      </div>
    </div>
  );
}