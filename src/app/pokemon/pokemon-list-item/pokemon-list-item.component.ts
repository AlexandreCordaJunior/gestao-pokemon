import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PokemonApiService} from "../../services/pokemon-api.service";
import {Subscription} from "rxjs";
import {Pokemon} from "../../shared/Pokemon";

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit, OnDestroy {
  @Input()
  pokemonNumber: number = -1;

  pokemon: Pokemon | null = null;
  pokemonSubscription: Subscription | undefined;

  constructor(private pokemonApi: PokemonApiService) { }

  ngOnInit(): void {
    this.pokemonSubscription = this.pokemonApi.getPokemonById(this.pokemonNumber).subscribe(
      pokemon => this.pokemon = pokemon
    );
  }

  ngOnDestroy() {
    if(this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }
}
