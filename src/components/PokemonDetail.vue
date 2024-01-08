<template>
  <!-- <div v-if="isLoading"><h2>Loading...</h2></div>
    <ul v-else> -->
  <div v-if="pokemon" class="modal">
    <div class="modal-content">
      <h2>{{ formattedName }}</h2>
      <img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
      <p>Type: {{ pokemon.types.map((t) => t.type.name).join(', ') }}</p>
      <p>Height: {{ pokemon.height }} </p>
      <p>Weight: {{ pokemon.weight }} </p>
      <router-link to="/pokemons">Close</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const route = useRoute()
const pokemon = computed(() => store.getters.selectedPokemon)

onMounted(() => {
  store.dispatch('fetchPokemon', route.params.name)
})

const formattedName = computed(() => {
  if (!pokemon.value) return ''
  return (
    pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1)
  )
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
</style>
