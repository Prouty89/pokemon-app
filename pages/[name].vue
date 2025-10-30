<script setup lang="ts">
import { useRoute } from '#app'
import type { PokemonDetailResponse } from '~/types/pokemon'

const route = useRoute()
const name = route.params.name as string

const { data: pokemon, pending, error } = await useFetch<PokemonDetailResponse>(
  `/api/pokemon?name=${name}`
)

const abilities = computed(() => pokemon.value?.abilities?.join(', ') || '')
</script>

<template>
  <div class="container">
    <div v-if="pending" class="loading">Loading Pokémon...</div>
    
    <div v-else-if="error" class="loading">Error loading Pokémon.</div>

    <div v-else-if="pokemon" class="pokemon-detail">
      <h2 class="title">{{ pokemon.name }}</h2>
      <img
        :src="pokemon.sprite"
        :alt="pokemon.name"
        class="pokemon-image"
      />

      <p><strong>Height:</strong> {{ pokemon.height }}</p>
      <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
      <p><strong>Abilities:</strong> {{ abilities }}</p>

      <NuxtLink to="/" class="back-link">← Back</NuxtLink>
    </div>
  </div>
</template>