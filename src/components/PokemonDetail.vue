<template>
  <div>
    <div v-if="isLoading" class="modal"><Loader /></div>
    <div v-else-if="pokemon" class="modal">
      <div class="modal-content">
        <div>
          <h2 class="pokemon-name">{{ pokemon.name }}</h2>
          <PokemonInfo v-if="pokemon" :pokemon="pokemon" />
          <PokemonHabitat
            v-if="weatherData"
            :weatherData="weatherData"
            class="pokemon-habitat"
          />
          <PokemonMap
            v-if="coordinatesData"
            :coordinatesData="coordinatesData"
            class="pokemon-map"
          />
          <router-link to="/pokemons" class="close-button">Close</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="modal-content">
        <p>No Pokemon Found</p>
        <router-link to="/pokemons" class="close-button">Close</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Loader from './Loader.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PokemonInfo from './PokemonInfo.vue'
import PokemonHabitat from './PokemonHabitat.vue'
import PokemonMap from './PokemonMap.vue'

const store = useStore()
const route = useRoute()
const pokemon = computed(() => store.getters.selectedPokemon)
const weatherData = computed(() => store.state.weatherData)
const coordinatesData = computed(() => store.state.coordinatesData)
const isLoading = computed(() => store.state.isLoading)
const { triggerToast } = inject('toast')

onMounted(async () => {
  try {
    await store.dispatch('fetchPokemon', route.params.name)
    triggerToast(`${route.params.name} fetched successfully`, 'success')
  } catch (error) {
    triggerToast(`Error fetching ${route.params.name}`, 'error')
    triggerToast(`Description: ${error}`, 'error')
  }
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.pokemon-name {
  text-transform: capitalize;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.close-button {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
.close-button:hover {
  background-color: #0056b3;
  color: #ffffff;
}

.pokemon-habitat,
.pokemon-map {
  flex: 1;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
