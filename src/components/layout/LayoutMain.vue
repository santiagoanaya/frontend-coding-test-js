<template>
  <nav class="bg-gray-800 text-white">
    <div class="mx-auto px-8" v-bind="$attrs">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <img class="w-14 h-14" src="../../assets/logo.svg" />
            <img class="ml-3" src="../../assets/logotype.svg" />
          </div>
          <div class="flex ml-10 items-center align-middle">
            <div class="flex space-x-4">
              <router-link
                to="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact-active-class="bg-gray-900 text-white"
                >Home</router-link
              >
            </div>
            <div class="flex ml-8 space-x-4">
              <router-link
                to="/pokemons"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact-active-class="bg-gray-900 text-white"
                >Pokemon List</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main :class="{ 'flex justify-center': shouldCenterContent }">
    <router-view />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const shouldCenterContent = computed(() => route.name !== 'PokemonList')
const props = defineProps(['name'])
</script>
