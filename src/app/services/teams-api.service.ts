import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import {Team} from "../shared/Pokemon";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeamsApiService {
  private teams: Team[] = [];
  teamChanged = new Subject<Team[]>();

  private URL = 'http://localhost:3000/teams';

  constructor(private httpClient: HttpClient) {
    this.reloadTeams();
  }

  reloadTeams() {
    this.httpClient.get<Team[]>(`${this.URL}`).subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        this.teamChanged.next(
          this.teams.slice()
        );
      }
    )
  }

  getTeams() {
    return this.teams.slice();
  }

  getTeamById(index: number) {
    return this.teams[index];
  }

  addTeam(team: Team) {
    this.httpClient.post(`${this.URL}`, team).subscribe(
      () => {
        this.reloadTeams();
      }
    );
  }

  updateTeam(index: number, team: Team) {
    this.httpClient.put(`${this.URL}/${this.teams[index].id}`, team).subscribe(
      () => {
        this.reloadTeams();
      }
    );
  }

  deleteTeam(index: number) {
    this.httpClient.delete(`${this.URL}/${index}`).subscribe(
      () => {
        this.reloadTeams();
      }
    );
  }

  /*constructor() {
    const times = localStorage.getItem('teams');
    if(times) {
      this.teams = JSON.parse(times);
    }
    this.teamChanged.next(
      this.teams.slice()
    );
  }

  getTeams() {
    return this.teams.slice();
  }

  getTeamById(index: number) {
    return this.teams[index];
  }

  addTeam(team: Team) {
    this.teams.push(team);
    this.teamChanged.next(
      this.teams.slice()
    );
    this.salvaLocalStorage();
  }

  updateTeam(index: number, team: Team) {
    this.teams[index] = team;
    this.teamChanged.next(
      this.teams.slice()
    );
    this.salvaLocalStorage();
  }

  deleteTeam(index: number) {
    this.teams.splice(index, 1);
    this.teamChanged.next(
      this.teams.slice()
    );
    this.salvaLocalStorage();
  }

  salvaLocalStorage() {
    localStorage.setItem('teams', JSON.stringify(this.teams));
  }*/
}
