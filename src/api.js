import axios from "axios";

const BASE_URL = "http://localhost:8080/movies";

export const searchMovies = (name) =>
  axios.get(`${BASE_URL}?name=${name}`);