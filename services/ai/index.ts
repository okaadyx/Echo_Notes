import { AxiosInstance } from "axios";
import * as FileSystem from "expo-file-system/legacy";

export default class AIApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async generateNotes(uri: string) {
    try {
      const url = `${this.client.defaults.baseURL}ai/generate-notes`;
      
      const response = await FileSystem.uploadAsync(url, uri, {
        httpMethod: 'POST',
        uploadType: 1 as any, // FileSystemUploadType.MULTIPART
        fieldName: 'audio',
        mimeType: 'audio/m4a',
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
