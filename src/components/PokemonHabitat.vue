<template>
  <div v-if="weatherData">
    <h3>Habitat</h3>
    <p>Location: {{ weatherData.location.name }}</p>
    <p>Temperature: {{ weatherData.current.temp_c }}°C</p>
    <p>Condition: {{ weatherData.current.condition.text }}</p>
  </div>
  <div v-else>
    <p>Habitat data not available</p>
  </div>
</template>

<script setup>
const props = defineProps({
  weatherData: Object,
})
</script>
