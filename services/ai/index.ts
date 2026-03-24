import { AxiosInstance } from "axios";
import * as FileSystem from "expo-file-system/legacy";

export default class AIApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async generateNotes(uri: string) {
    try {
      const baseURL = this.client.defaults.baseURL || "";
      const url = baseURL.endsWith("/")
        ? `${baseURL}ai/generate-notes`
        : `${baseURL}/ai/generate-notes`;

      console.log(`[AIApi] Uploading audio file to: ${url}`);

      const response = await FileSystem.uploadAsync(url, uri, {
        httpMethod: "POST",
        uploadType: 1 as any, // FileSystemUploadType.MULTIPART
        fieldName: "audio",
        mimeType: "audio/mp4",
      });

      if (response.status !== 200) {
        throw new Error(
          `Server Error => Status: ${response.status}, message: ${response.body}`,
        );
      }

      return JSON.parse(response.body);
    } catch (error: any) {
      console.error("API Error [generateNotes]:", error.message || error);
      throw error;
    }
  }
}
