import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'

export default {
  getPokemons() {
    return axios.get(`${API_URL}pokemon?limit=100`)
  },

  getPokemon(name) {
    return axios.get(`${API_URL}pokemon/${name}`)
  },
}
