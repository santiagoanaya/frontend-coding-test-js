import { createStore } from 'vuex'
import PokemonService from '../services/PokemonService'
import WeatherService from '../services/WeatherService'
import GeocodingService from '../services/GeocodingService'

export default createStore({
  state: {
    pokemons: [],
    selectedPokemon: null,
    weatherData: null,
    coordinatesData: null,
    isLoading: false,
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons = pokemons
    },
    setSelectedPokemon(state, pokemon) {
      state.selectedPokemon = pokemon
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    setWeatherData(state, weatherData) {
      state.weatherData = weatherData
    },
    setCoordinatesData(state, coordinatesData) {
      state.coordinatesData = coordinatesData
    },
  },
  actions: {
    async fetchPokemons({ commit }) {
      commit('setLoading', true)
      try {
        const response = await PokemonService.getPokemons()
        commit('setPokemons', response.data.results)
        commit('setLoading', false)
      } catch (error) {
        console.error(error)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchPokemon({ commit }, name) {
      commit('setLoading', true)
      try {
        const pokemonResponse = await PokemonService.getPokemon(name)
        const locations = ['Tokyo', 'New York', 'Paris', 'Sydney']
        const randomLocation =
          locations[Math.floor(Math.random() * locations.length)]
        const coordinatesResponse =
          await GeocodingService.getCoordinatesForCity(randomLocation)
        const weatherResponse = await WeatherService.getWeather(randomLocation)

        commit('setSelectedPokemon', pokemonResponse.data)
        commit('setCoordinatesData', coordinatesResponse)
        commit('setWeatherData', weatherResponse.data)
        commit('setLoading', false)
      } catch (error) {
        console.error(error)
        commit('setLoading', false)
      }
    },
    selectPokemon({ commit }, pokemon) {
      commit('setSelectedPokemon', pokemon)
    },
  },
  getters: {
    pokemons: (state) => state.pokemons,
    selectedPokemon: (state) => state.selectedPokemon,
    isLoading: (state) => state.isLoading,
  },
})
