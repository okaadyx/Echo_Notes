import { AxiosInstance } from "axios";
import * as FileSystem from "expo-file-system/legacy";
import * as SecureStore from "expo-secure-store";

export default class AIApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getAuthHeader(): Promise<Record<string, string>> {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      console.warn("No token found in SecureStore");
      return {};
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async generateNotes(uri: string) {
    try {
      const url = `${this.client.defaults.baseURL}ai/generate-notes`;

      const response = await FileSystem.uploadAsync(url, uri, {
        httpMethod: 'POST',
        uploadType: 1 as any, // FileSystemUploadType.MULTIPART
        fieldName: 'audio',
        mimeType: 'audio/m4a',
        headers: {
          ...await this.getAuthHeader(),
        },
      });

      if (response.status !== 200) {
        throw new Error(
          `Server Error => Status: ${response.status}, message: ${response.body}`
        );
      }

      const data = JSON.parse(response.body);
      return data;
    } catch (error: any) {
      console.error("API Error [generateNotes]:", error.message || error);
      throw error;
    }
  }
}
