import axios from 'axios'

const API_URL = 'https://api.opencagedata.com/geocode/v1/json'

const getCoordinatesForCity = async (city) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        q: city,
        key: '6e5c658b6c6d4f26bb822b00884e6147',
      },
    })
    return response.data.results[0].geometry
  } catch (error) {
    console.error('Error fetching coordinates:', error)
  }
}

export default { getCoordinatesForCity }
