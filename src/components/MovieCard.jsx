// export default function MovieCard({ movie, onSelect }) {
//   return (
//     <div
//       onClick={() => onSelect(movie.imdbID)}
//       style={{
//         cursor: "pointer",
//         transition: "transform 0.3s",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//     >
//       <img
//         src={movie.Poster}
//         alt={movie.Title}
//         style={{ width: "100%", borderRadius: "10px" }}
//       />
//       <h3>{movie.Title}</h3>
//       <p>{movie.Year}</p>
//     </div>
//   );
// }


// export default function MovieCard({ movie, onSelect }) {
//   return (
//     <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
//       <img src={movie.Poster} alt={movie.Title} />
//     </div>
//   );
// }

export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
}