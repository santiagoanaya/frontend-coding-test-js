import { createStore } from 'vuex'
import PokemonService from '../services/PokemonService'

export default createStore({
  state: {
    pokemons: [],
    selectedPokemon: null,
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
      }
    },
    async fetchPokemon({ commit }, name) {
      commit('setLoading', true)
      try {
        const response = await PokemonService.getPokemon(name)
        commit('setSelectedPokemon', response.data)
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
