import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

export class UserApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async getAuthHeader() {
    const token = await SecureStore.getItemAsync("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getUser() {
    const headers = await this.getAuthHeader();
    const response = await this.client.get("user/", { headers });
    return response.data;
  }

  async signup(data: any) {
    try {
      const response = await this.client.post("user/signup", data);
      const user = response.data;

      if (user?.status && user?.token) {
        await SecureStore.setItemAsync("token", user.token);
      }

      return user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }
  async login(data: any) {
    try {
      const response = await this.client.post("user/login", data);

      const user = response.data;

      if (user?.status) {
        await SecureStore.setItemAsync("token", user.token);
      }

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async update(data: any) {
    try {
      const headers = await this.getAuthHeader();

      const response = await this.client.put("user/update", data, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }
}
