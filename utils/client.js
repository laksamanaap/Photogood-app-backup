import axios from "axios";
import Domain from "./baseUrl";

const client = axios.create({
  baseURL: Domain.ipAddress,
  params: {},
});

export default client;
