import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PokemonListItemComponent } from './pokemon/pokemon-list-item/pokemon-list-item.component';
import {HttpClientModule} from "@angular/common/http";
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon/pokemon-details/pokemon-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TeamsListComponent } from './teams/teams-list/teams-list.component';
import { TeamsListItemComponent } from './teams/teams-list-item/teams-list-item.component';
import { TeamCreateComponent } from './teams/team-create/team-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PokemonListItemComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    TeamsListComponent,
    TeamsListItemComponent,
    TeamCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
