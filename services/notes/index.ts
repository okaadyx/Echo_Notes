import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

export class NotesApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async getAuthHeader() {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      console.warn("No token found in SecureStore");
      return {};
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getNotes(params?: { folder_id?: number | string; limit?: number; page?: number }) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.get("notes/", { 
        headers,
        params
      });
      return response.data.data;
    } catch (error) {
      console.error("fetching notes error:", error);
      throw error;
    }
  }

  async searchNotes(query: string) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.get("notes/search", {
        params: { q: query },
        headers: headers,
      });
      return response.data.data;
    } catch (error) {
      console.error("search notes error:", error);
      throw error;
    }
  }
  async createNotes(data: any) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.post("notes/", data, { headers });
      return response.data.data || [];
    } catch (error) {
      console.error("creating notes error:", error);
      throw error;
    }
  }
  async getNote(id: number) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.get(`notes/${id}`, { headers });
      return response.data.data;
    } catch (error) {
      console.error("fetching notes error:", error);
      throw error;
    }
  }

  async pinToggle(noteId: number) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.patch(
        `notes/${noteId}/favorite`,
        {},
        { headers },
      );

      return response.data.data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }


  async updateNote(id: number, data: any) {
    try {
      const headers = await this.getAuthHeader();
      // Changed from patch to put to match backend
      const response = await this.client.put(`notes/${id}`, data, { headers });
      return response.data.data;
    } catch (error) {
      console.error("update note error:", error);
      throw error;
    }
  }

  async getFolders() {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.get("folders/", { headers });
      return response.data.data;
    } catch (error) {
      console.error("get folders error:", error);
      throw error;
    }
  }

  async createFolder(name: string) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.post("folders/", { name }, { headers });
      return response.data.data;
    } catch (error) {
      console.error("create folder error:", error);
      throw error;
    }
  }

  async deleteFolder(id: number) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.delete(`folders/${id}`, { headers });
      return response.data.data;
    } catch (error) {
      console.error("delete folder error:", error);
      throw error;
    }
  }

  async updateFolder(id: number, name: string) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.put(`folders/${id}`, { name }, { headers });
      return response.data.data;
    } catch (error) {
      console.error("update folder error:", error);
      throw error;
    }
  }

  async chatWithAi(prompt: string, context?: any) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.post("ai/chat", { prompt, context }, { headers });
      return response.data.data;
    } catch (error) {
      console.error("chat with AI error:", error);
      throw error;
    }
  }

  async generateStructuredNote(prompt: string) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.post("ai/generate-structured-note", { prompt }, { headers });
      return response.data.data;
    } catch (error) {
      console.error("generate structured note error:", error);
      throw error;
    }
  }

  async deleteNote(id: number) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.delete(`notes/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("delete note error:", error);
      throw error;
    }
  }
}
