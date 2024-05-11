import axios from "axios";

const instance = axios.create({
  baseURL: "http://fakestoreapi.com/",
});

export default instance;
