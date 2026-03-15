import axios, { AxiosInstance } from "axios";
import AIApi from "./ai";

class Api {
  axiosClient: AxiosInstance;
  ai: AIApi;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://echo-notes-phi.vercel.app/api/",
    });
    this.ai = new AIApi(this.axiosClient);
  }
}

export const api = new Api();
