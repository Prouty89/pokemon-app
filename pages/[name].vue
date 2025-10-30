<script setup lang="ts">
import { useRoute } from '#app'

interface Pokemon {
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: { front_default: string }
}

const route = useRoute()
const name = route.params.name as string

const { data: pokemon, pending, error } = await useFetch<Pokemon>(
  `https://pokeapi.co/api/v2/pokemon/${name}`
)
</script>

<template>
  <div class="p-4">
    <div v-if="pending">Loading Pokémon...</div>
    <div v-else-if="pokemon">
      <h2 class="text-2xl font-bold mb-2 capitalize">{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" alt="sprite" class="mb-4" />
      <p><strong>Height:</strong> {{ pokemon.height }}</p>
      <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
      <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>

      <NuxtLink to="/" class="text-blue-500 mt-4 inline-block">← Back</NuxtLink>
    </div>
    <div v-else>
      Error loading Pokémon.
    </div>
  </div>
</template>