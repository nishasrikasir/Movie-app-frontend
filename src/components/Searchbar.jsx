import { useState } from "react";

export default function Searchbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search movies..."
      value={query}
      onChange={handleChange}
      className="search-bar"
    />
  );
}