import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  page = 0;

  pokemonNumbers: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      if(query['page']) {
        this.page = Number(query['page']);
        this.initPokemonNum(this.page);
      }
    });

    this.initPokemonNum(this.page);
  }

  initPokemonNum(page: number) {
    this.pokemonNumbers = [];

    const init = (page * 9) + 1;

    for(let i = 0; i < 9; i++) {
      const prox = init + i;
      if(prox <= 809) {
        this.pokemonNumbers.push(
          init + i
        );
      }
    }
  }

  navProximo() {
    this.router.navigate(['pokemon-list'], {
      queryParams: {
        page: this.page + 1
      }
    });
  }

  navAnterior() {
    console.log('oioi');
    this.router.navigate(['pokemon-list'], {
      queryParams: {
        page: this.page - 1
      }
    });
  }
}
