<template>
  <div v-if="pokemon" class="modal">
    <div class="modal-content">
      <div v-if="isLoading"><Loader /></div>
      <div v-else>
        <h2 class="pokemon-name">{{ pokemon.name }}</h2>
        <img
          :src="pokemon.sprites.front_default"
          class="pokemon-image"
          alt="Pokemon Image"
        />
        <p>Type: {{ formattedTypes }}</p>
        <p>Height: {{ heightInCm }} cm</p>
        <p>Weight: {{ weightInKg }} kg</p>
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
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import Loader from './Loader.vue'

const store = useStore()
const route = useRoute()
const pokemon = computed(() => store.getters.selectedPokemon)
const isLoading = computed(() => store.state.isLoading)

onMounted(() => {
  store.dispatch('fetchPokemon', route.params.name)
})

const formattedTypes = computed(() => {
  return pokemon.value
    ? pokemon.value.types.map((t) => t.type.name.toUpperCase()).join(', ')
    : ''
})

const heightInCm = computed(() => {
  return pokemon.value ? pokemon.value.height * 10 : 0
})

const weightInKg = computed(() => {
  return pokemon.value ? pokemon.value.weight / 10 : 0
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
}
.pokemon-image {
  display: block;
  margin: 0 auto;
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
</style>
