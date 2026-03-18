export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} />

      <div className="overlay">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}