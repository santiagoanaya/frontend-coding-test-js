import axios from 'axios'

const API_BASE_URL = 'https://api.weatherapi.com/v1'

const WeatherService = {
  async getWeather(location) {
    try {
      const response = await axios.get(`${API_BASE_URL}/current.json`, {
        params: {
          key: '29f65e46d9ac4441b88125735240901',
          q: location,
        },
      })
      return response
    } catch (error) {
      console.error('Error fetching coordinates:', error)
    }
  },
}

export default WeatherService
