<script setup lang="ts">
import { useRoute } from '#app'

interface Pokemon {
  name: string
  height: number
  weight: number
  base_experience: number
  abilities: { ability: { name: string } }[]
  sprites: { front_default: string }
}

const route = useRoute()
const name = route.params.name as string

const { data: pokemon, pending, error } = await useFetch<Pokemon>(
  `https://pokeapi.co/api/v2/pokemon/${name}`
)

// Computed: formatted abilities string
const abilities = computed(() => {
  if (!pokemon.value?.abilities) return ''
  return pokemon.value.abilities
    .map(a => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1))
    .join(', ')
})
</script>

<template>
  <div class="container">
    <!-- Loading -->
    <div v-if="pending" class="loading">Loading Pokémon...</div>

    <!-- Error -->
    <div v-else-if="error" class="loading">Error loading Pokémon.</div>

    <!-- Pokémon Details -->
    <div v-else-if="pokemon" class="pokemon-detail">
      <h2 class="title">{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" alt="sprite" class="pokemon-image-large" />

      <p><strong>Height:</strong> {{ pokemon.height }}</p>
      <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
      <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
      <p><strong>Abilities:</strong> {{ abilities }}</p>

      <NuxtLink to="/" class="back-link">← Back</NuxtLink>
    </div>
  </div>
</template>