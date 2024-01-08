<template>
  <div
    class="min-w-full min-h-screen font-sans text-sm antialiased bg-gray-100 text-center"
  >
    <router-view />
    <Toast />
  </div>
</template>

<script setup>
import Toast from './components/Toast.vue'
</script>
