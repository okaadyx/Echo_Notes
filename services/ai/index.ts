import { AxiosInstance } from "axios";

export default class AIApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
}
