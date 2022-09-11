import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PokemonListComponent} from "./pokemon/pokemon-list/pokemon-list.component";
import {PokemonDetailsComponent} from "./pokemon/pokemon-details/pokemon-details.component";
import {TeamsListComponent} from "./teams/teams-list/teams-list.component";
import {TeamCreateComponent} from "./teams/team-create/team-create.component";
import {TeamResolverService} from "./services/team-resolver.service";

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
    path: 'teams-list/novo/:id',
    component: TeamCreateComponent,
    resolve: {
      teams: TeamResolverService
    }
  },
  {
    path: 'teams-list/novo',
    component: TeamCreateComponent
  },
  {
    path: 'teams-list',
    component: TeamsListComponent
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
