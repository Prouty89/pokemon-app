<script setup lang="ts">
import { ref, computed } from 'vue'

// Use Nuxt composable to fetch data at page load

const searchTerm = ref('')
const { data, pending, error } = await useFetch<{
  results: { name: string; url: string }[]
}>('https://pokeapi.co/api/v2/pokemon?limit=60')

const filteredList = computed(() => {
  if (!data.value?.results) return []
  const term = searchTerm.value.toLowerCase()
  return data.value.results.filter(p =>
    p.name.toLowerCase().includes(term)
  )
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-8">
    <h1 class="text-3xl font-bold mb-6">Pokémon Explorer</h1>

    <!-- Search input -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search Pokémon..."
      class="mb-6 p-3 w-full max-w-md rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
    />

    <!-- Loading state -->
    <div v-if="pending" class="text-gray-400">Loading Pokémon...</div>

    <!-- Pokémon list -->
    <ul
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl"
    >
      <li
        v-for="pokemon in filteredList"
        :key="pokemon.name"
        class="p-4 bg-gray-800 rounded-xl text-center capitalize hover:bg-gray-700 transition"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>