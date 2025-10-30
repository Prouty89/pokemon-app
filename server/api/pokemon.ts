export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const name = query.name as string | undefined
  
    if (name) {
      // Fetch a single Pokémon by name
      const res = await $fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      return res
    } else {
      const res = await $fetch('https://pokeapi.co/api/v2/pokemon?limit=60')
      return res
    }
  })