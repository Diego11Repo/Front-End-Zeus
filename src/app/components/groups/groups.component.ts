import { Component, OnInit } from '@angular/core';
import { GroupInterface } from 'src/app/interfaces/group.interface';

import { GroupsService } from '../../services/groups.service';

/**
 * Angular decorator
 */

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  /**
   * Groups
   */
  groups: GroupInterface;

  constructor( private groupService: GroupsService) { }

  ngOnInit(): void {
    this.groupService.getAllGroups()
    .then( groups => {
      this.groups = groups;
    });
  }
}
