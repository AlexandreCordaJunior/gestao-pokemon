import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pokemon, PokemonApi} from "../shared/Pokemon";
import {map, tap} from "rxjs";
import {capitalize} from "../util/StringFunctions";
import {isShiny} from "../util/MathFunctions";

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private httpClient: HttpClient) { }

  private URL = 'https://pokeapi.co/api/v2';

  getPokemonById(id: number) {
    return this.httpClient.get<PokemonApi>(`${this.URL}/pokemon/${id}`).pipe(
      map(pokemon => this.mapeiaObjetoPokemon(pokemon))
    );
  }

  mapeiaObjetoPokemon(pokemon: PokemonApi): Pokemon {
    const stats = {
      hp: this.mapeiaStat(pokemon, 'hp'),
      attack: this.mapeiaStat(pokemon, 'attack'),
      defense: this.mapeiaStat(pokemon, 'defense'),
      special_attack: this.mapeiaStat(pokemon, 'special-attack'),
      special_defense: this.mapeiaStat(pokemon, 'special-defense'),
      speed: this.mapeiaStat(pokemon, 'speed')
    };

    return {
      id: pokemon.id,
      name: capitalize(pokemon.name),
      sprite: isShiny() ? pokemon.sprites.front_shiny : pokemon.sprites.front_default,
      stats,
      first_type: capitalize(pokemon.types[0].type.name),
      second_type: pokemon.types.length === 2 ? capitalize(pokemon.types[1].type.name) : undefined
    };
  }

  mapeiaStat(pokemon: PokemonApi, statName: String) {
    if(pokemon.stats.filter(statPokemon => statPokemon.stat.name === statName)) {
      return pokemon.stats.filter(statPokemon => statPokemon.stat.name === statName)[0].base_stat;
    }
    return 0;
  }
}
