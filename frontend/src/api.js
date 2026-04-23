import axios from "axios";

const API = axios.create({
  baseURL: "https://lostandfound-item-management.onrender.com/api"
});

export default API;