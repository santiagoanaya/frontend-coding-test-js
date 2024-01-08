<template>
  <div>
    <h2>Pokémon List</h2>
    <ul>
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
import { onMounted, ref } from 'vue'
import PokemonService from '../services/PokemonService'

const pokemons = ref([])

onMounted(async () => {
  try {
    const response = await PokemonService.getPokemons()
    pokemons.value = response.data.results
  } catch (error) {
    console.error(error)
  }
})
</script>
