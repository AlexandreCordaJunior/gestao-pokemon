import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardPokemonComponent } from './card-pokemon/card-pokemon.component';
import { PokemonImageComponent } from './pokemon-image/pokemon-image.component';

@NgModule({
  declarations: [
    AppComponent,
    CardPokemonComponent,
    PokemonImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
