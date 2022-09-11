import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Pokemon} from "../../shared/Pokemon";
import {PokemonApiService} from "../../services/pokemon-api.service";
import {TeamsApiService} from "../../services/teams-api.service";

enum POKEMON_POSITION {
  first_pokemon = 'first_pokemon',
  second_pokemon = 'second_pokemon',
  third_pokemon = 'third_pokemon',
  fourth_pokemon = 'fourth_pokemon',
  fifth_pokemon = 'fifth_pokemon',
  sixth_pokemon = 'sixth_pokemon'
}

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  // @ts-ignore: Unreachable code error
  teamForm: FormGroup;
  id: number = 0;
  editMode = false;

  pokemonList: {
    first_pokemon?: Pokemon,
    second_pokemon?: Pokemon,
    third_pokemon?: Pokemon,
    fourth_pokemon?: Pokemon,
    fifth_pokemon?: Pokemon,
    sixth_pokemon?: Pokemon
  } = { };

  POKEMON_POSITION_TYPE = POKEMON_POSITION;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonApi: PokemonApiService, private teamsApi: TeamsApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.editMode = !!params['id']
        this.initForm();
      }
    );
  }

  initForm() {
    let name = '';

    let first_pokemon = '';
    let second_pokemon = '';
    let third_pokemon = '';
    let fourth_pokemon = '';
    let fifth_pokemon = '';
    let sixth_pokemon = '';

    if(this.editMode) {
      const teams = this.teamsApi.getTeamById(this.id);
      name = teams.name;

      first_pokemon = teams.first_pokemon ? ('' + teams.first_pokemon.id) : ''
      second_pokemon = teams.second_pokemon ? ('' + teams.second_pokemon.id) : ''
      third_pokemon = teams.third_pokemon ? ('' + teams.third_pokemon.id) : ''
      fourth_pokemon = teams.fourth_pokemon ? ('' + teams.fourth_pokemon.id) : ''
      fifth_pokemon = teams.fifth_pokemon ? ('' + teams.fifth_pokemon.id) : ''
      sixth_pokemon = teams.sixth_pokemon ? ('' + teams.sixth_pokemon.id) : ''

      this.pokemonList.first_pokemon = teams.first_pokemon;
      this.pokemonList.second_pokemon = teams.second_pokemon;
      this.pokemonList.third_pokemon = teams.third_pokemon;
      this.pokemonList.fourth_pokemon = teams.fourth_pokemon;
      this.pokemonList.fifth_pokemon = teams.fifth_pokemon;
      this.pokemonList.sixth_pokemon = teams.sixth_pokemon;
    }

    this.teamForm = new FormGroup({
      'name': new FormControl(name, [Validators.required, Validators.pattern(/[a-zA-Z/d]+/g)]),
      'first_pokemon': new FormControl(first_pokemon, [this.pokemonNumberValidator()]),
      'second_pokemon': new FormControl(second_pokemon, [this.pokemonNumberValidator()]),
      'third_pokemon': new FormControl(third_pokemon, [this.pokemonNumberValidator()]),
      'fourth_pokemon': new FormControl(fourth_pokemon, [this.pokemonNumberValidator()]),
      'fifth_pokemon': new FormControl(fifth_pokemon, [this.pokemonNumberValidator()]),
      'sixth_pokemon': new FormControl(sixth_pokemon, [this.pokemonNumberValidator()]),
    });
  }

  pokemonNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value === '') {
        return null;
      }
      if(Number(control.value) <= 809 && Number(control.value) > 0) { //só até geração 7
        return null;
      }
      else {
        return {
          erro: 'Apenas números entre 1 e 809'
        };
      }
    };
  }

  navBack() {
    this.router.navigate(['teams-list']);
  }

  changePokemon(variable: POKEMON_POSITION) {
    if(this.teamForm.controls[variable].valid) {
        this.pokemonApi.getPokemonById(Number(this.teamForm.controls[variable].value)).subscribe(
          (pokemon) => {
            this.pokemonList[variable] = pokemon;
          }
        )
    }
    else {
      this.pokemonList[variable] = undefined;
    }
  }

  onSubmit() {
    const obj = {
      name: this.teamForm.value['name'],
      first_pokemon: this.pokemonList.first_pokemon,
      second_pokemon: this.pokemonList.second_pokemon,
      third_pokemon: this.pokemonList.third_pokemon,
      fourth_pokemon: this.pokemonList.fourth_pokemon,
      fifth_pokemon: this.pokemonList.fifth_pokemon,
      sixth_pokemon: this.pokemonList.sixth_pokemon,
    };

    if(this.editMode) {
      this.teamsApi.updateTeam(this.id, obj);
    }
    else {
      this.teamsApi.addTeam(obj);
    }

    this.navBack();
  }

  mapeiaErro(erroObj: any) {
    return erroObj.erro;
  }
}
