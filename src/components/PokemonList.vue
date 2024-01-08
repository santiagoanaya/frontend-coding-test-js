<template>
  <div>
    <h1>Pokemon List</h1>
    <div v-if="isLoading"><h2>Loading...</h2></div>
    <ul v-else>
      <li v-for="pokemon in pokemons" :key="pokemon.name">
        <router-link
          :to="{ name: 'PokemonDetail', params: { name: pokemon.name } }"
        >
          {{ pokemon.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const pokemons = computed(() => store.state.pokemons)
const isLoading = computed(() => store.state.isLoading)

onMounted(() => {
  if (store.state.pokemons.length === 0) {
    store.dispatch('fetchPokemons')
  }
})
</script>
