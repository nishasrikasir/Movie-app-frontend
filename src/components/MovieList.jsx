// import MovieCard from "./MovieCard";

// export default function MovieList({ movies, onSelect }) {
//   return (
//     <div className="movie-grid">
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.imdbID}
//           movie={movie}
//           onSelect={onSelect}
//         />
//       ))}
//     </div>
//   );
// }
import MovieCard from "./MovieCard";

export default function MovieList({ movies, onSelect, onFavorite }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelect={onSelect}
          onFavorite={onFavorite}  // 🔥 MUST BE HERE
        />
      ))}
    </div>
  );
}