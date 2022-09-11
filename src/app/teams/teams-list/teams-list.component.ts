import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Team} from "../../shared/Pokemon";
import {TeamsApiService} from "../../services/teams-api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  subscription?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private teamsApi: TeamsApiService) { }

  ngOnInit(): void {
    this.subscription = this.teamsApi.teamChanged.subscribe(
      teams => {
        this.teams = teams;
      }
    );
    this.teams = this.teamsApi.getTeams();
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onNovoTime() {
    this.router.navigate(['novo'], {
      relativeTo: this.route
    })
  }
}
