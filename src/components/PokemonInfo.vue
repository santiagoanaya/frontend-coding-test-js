<template>
  <div>
    <img
      :src="pokemon.sprites.front_default"
      class="pokemon-image"
      alt="Pokemon Image"
    />
    <div class="pokemon-info">
      <p>Type: {{ formattedTypes }}</p>
      <p>Height: {{ heightInCm }} cm</p>
      <p>Weight: {{ weightInKg }} kg</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pokemon: Object,
})

const formattedTypes = computed(() => {
  return props.pokemon.types.map((t) => t.type.name.toUpperCase()).join(', ')
})

const heightInCm = computed(() => {
  return props.pokemon.height * 10
})

const weightInKg = computed(() => {
  return props.pokemon.weight / 10
})
</script>

<style scoped>
.pokemon-info {
  flex: 1;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.pokemon-image {
  display: block;
  margin: 0 auto;
}
</style>
