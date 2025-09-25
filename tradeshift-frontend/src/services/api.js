import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7090/api", // point to your Spring Boot backend
});

export default api;
