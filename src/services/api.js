// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';
// Create API client with fetch
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
  // GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  }
  // POST request
  async post(endpoint, body) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  }
  // PUT request
  async put(endpoint, body) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  }
  // PATCH request
  async patch(endpoint, body) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('PATCH request error:', error);
      throw error;
    }
  }
  // DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  }
  // File upload request
  async uploadFile(endpoint, formData) {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      // Don't set Content-Type for FormData, let browser set it
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }
}
// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);
// Export API base URL for direct use
export { API_BASE_URL };
