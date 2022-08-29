export interface PokemonApi {
  id: number,
  name: string,
  sprites: {
    front_default: string,
    front_shiny: string,
  },
  stats: {
    base_stat: number,
    stat: {
      name: string
    }
  }[],
  types: {
    type: {
      name: string
    }
  }[]
}

export interface Pokemon {
  id: number,
  name: string,
  sprite: string,
  stats: {
    hp: number,
    attack: number,
    defense: number,
    special_attack: number,
    special_defense: number,
    speed: number,
  },
  first_type: string,
  second_type?: string
}
