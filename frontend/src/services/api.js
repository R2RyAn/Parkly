const API_BASE_URL = 'http://localhost:8080/api';

export const vehicleService = {
  getAllVehicles: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch vehicles: ' + error.message);
    }
  },

  searchVehicles: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/search?${queryString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to search vehicles: ' + error.message);
    }
  }
};