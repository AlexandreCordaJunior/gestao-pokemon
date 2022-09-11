import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Team} from "../shared/Pokemon";
import {first, Observable, tap} from "rxjs";
import {TeamsApiService} from "./teams-api.service";

@Injectable({
  providedIn: 'root'
})
export class TeamResolverService implements Resolve<Team[]>{
  constructor(private teamsApi: TeamsApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> | Promise<Team[]> | Team[] {
    if(this.teamsApi.getTeams().length) {
      return this.teamsApi.getTeams();
    }
    return this.teamsApi.teamChanged.pipe(first());
  }
}
