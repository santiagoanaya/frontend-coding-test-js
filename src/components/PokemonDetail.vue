<template>
  <div v-if="pokemon">
    <h2>{{ pokemon.name }}</h2>
    <img :src="pokemon.sprites.front_default" alt="Pokemon Image">
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PokemonService from '../services/PokemonService'

const route = useRoute()
const pokemon = ref(null)

onMounted(async () => {
  try {
    const response = await PokemonService.getPokemon(route.params.name)
    pokemon.value = response.data
  } catch (error) {
    console.error(error)
  }
});
</script>
