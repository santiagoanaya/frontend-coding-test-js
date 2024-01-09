<template>
  <div id="mapid" style="height: 180px"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  coordinatesData: Object,
})

const map = ref(null)

onMounted(() => {
  const { lat, lng } = props.coordinatesData
  initializeMap(lat, lng)
})

function initializeMap(lat, lng) {
  map.value = L.map('mapid').setView([lat, lng], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map.value)

  L.marker([lat, lng]).addTo(map.value)
}
</script>
