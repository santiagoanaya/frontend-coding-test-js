<template>
  <div class="pokemon-list-wrapper">
    <h1 class="pokemon-list-title">Pokemon List</h1>
    <div v-if="isLoading"><Loader /></div>
    <div v-else class="pokemon-grid">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        @click="goToPokemonDetail(pokemon.name)"
        class="pokemon-item"
      >
        {{ pokemon.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Loader from './Loader.vue'

const store = useStore()
const router = useRouter()
const pokemons = computed(() => store.state.pokemons)
const isLoading = computed(() => store.state.isLoading)

onMounted(() => {
  if (store.state.pokemons.length === 0) {
    store.dispatch('fetchPokemons')
  }
})

const goToPokemonDetail = (name) => {
  router.push({ name: 'PokemonDetail', params: { name } })
}
</script>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  max-width: 1000px;
  margin: 0 auto;
}

.pokemon-item {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  text-transform: capitalize;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.pokemon-item:hover {
  background-color: #e2e2e2;
  border-color: #bfbfbf;
}

.pokemon-list-title {
  font-size: 2.5rem;
  color: #1a1a1a;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .pokemon-list-title {
    font-size: 2rem;
  }
}
</style>
