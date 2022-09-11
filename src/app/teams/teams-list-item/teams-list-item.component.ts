import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../shared/Pokemon";
import {TeamsApiService} from "../../services/teams-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-teams-list-item',
  templateUrl: './teams-list-item.component.html',
  styleUrls: ['./teams-list-item.component.css']
})
export class TeamsListItemComponent implements OnInit {

  @Input()
  team: Team | null = null;

  @Input()
  index: number = -1;

  constructor(private router: Router, private route: ActivatedRoute, private teamsApi: TeamsApiService) { }

  ngOnInit(): void {
  }

  deleteTeam() {
    this.teamsApi.deleteTeam(this.index);
  }

  navEditar() {
    this.router.navigate(['novo', this.index], {
      relativeTo: this.route
    })
  }
}
