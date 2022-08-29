import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonApiService} from "../../services/pokemon-api.service";
import {Subscription} from "rxjs";
import {Pokemon} from "../../shared/Pokemon";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router, private pokemonApi: PokemonApiService) { }

  pokemonSubscription: Subscription | null = null;
  pokemon: Pokemon | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if(!queryParams['id']) {
       return this.navToList();
      }

      this.pokemonSubscription = this.pokemonApi.getPokemonById(Number(queryParams['id'])).subscribe(pokemon => {
        this.pokemon = pokemon
      });
    });
  }

  ngOnDestroy() {
    if(this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }

  navToList() {
    this.router.navigate(['/pokemon-list']);
  }
}
