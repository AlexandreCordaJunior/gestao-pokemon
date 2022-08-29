import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PokemonListComponent} from "./pokemon/pokemon-list/pokemon-list.component";
import {PokemonDetailsComponent} from "./pokemon/pokemon-details/pokemon-details.component";

const routes: Routes = [
  {
    path: 'pokemon-list',
    component: PokemonListComponent
  },
  {
    path: 'pokemon-detalhes',
    component: PokemonDetailsComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
