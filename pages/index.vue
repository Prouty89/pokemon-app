<script setup lang="ts">
import { ref, computed } from 'vue'

// Fetch Pokémon list at page load
const searchTerm = ref('')
const { data, pending, error } = await useFetch<{
  results: { name: string; url: string }[]
}>('https://pokeapi.co/api/v2/pokemon?limit=60')

// Filter Pokémon by search term
const filteredList = computed(() => {
  if (!data.value?.results) return []
  const term = searchTerm.value.toLowerCase()
  return data.value.results.filter(p =>
    p.name.toLowerCase().includes(term)
  )
})
</script>

<template>
  <div class="container">
    <h1 class="title">Pokémon Explorer</h1>

    <!-- Search input -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search Pokémon..."
      class="search-input"
    />

    <!-- Loading state -->
    <div v-if="pending" class="loading">Loading Pokémon...</div>

    <!-- Pokémon list -->
    <ul v-else class="pokemon-grid">
      <li v-for="pokemon in filteredList" :key="pokemon.name" class="pokemon-card">
        <NuxtLink :to="`/${pokemon.name}`" class="pokemon-link">
          {{ pokemon.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>