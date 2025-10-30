import { defineEventHandler, getQuery, H3Event } from 'h3'
import type { PokemonSummary, PokemonDetailResponse } from '~/types/pokemon'

interface Ability {
  ability: { name: string }
}

interface PokemonDetail {
  name: string
  sprites: { front_default: string }
  height: number
  weight: number
  abilities: Ability[]
}

interface PokemonListItem {
  name: string
  url: string
}

interface PokemonListResponse {
  results: PokemonListItem[]
}

type PokemonHandlerReturn = PokemonSummary[] | PokemonDetailResponse | { error: string }

export default defineEventHandler(async (event: H3Event): Promise<PokemonHandlerReturn> => {
  const query = getQuery(event)
  const name = query.name as string | undefined

  try {
    if (name) {
      const pokemon = await $fetch<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      return {
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities.map((a) =>
          a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)
        ),
      } as PokemonDetailResponse
    } else {
      const list = await $fetch<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=60')
      const detailed: PokemonSummary[] = await Promise.all(
        list.results.map(async (p) => {
          const res = await $fetch<PokemonDetail>(p.url)
          return { name: p.name, sprite: res.sprites.front_default }
        })
      )
      return detailed
    }
  } catch (err: any) {
    return { error: String(err.message || err) }
  }
})