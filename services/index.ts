import axios, { AxiosInstance } from "axios";
import AIApi from "./ai";
import { UserApi } from "./user";

class Api {
  axiosClient: AxiosInstance;
  ai: AIApi;
  user: UserApi;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://echo-notes-phi.vercel.app/api/",
    });
    this.ai = new AIApi(this.axiosClient);
    this.user = new UserApi(this.axiosClient);
  }
}

export const api = new Api();
