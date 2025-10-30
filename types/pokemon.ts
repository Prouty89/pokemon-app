export interface PokemonSummary {
    name: string
    sprite: string
  }
  
  export interface PokemonDetailResponse {
    name: string
    sprite: string
    height: number
    weight: number
    abilities: string[]
  }