import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { GroupInterface } from '../interfaces/group.interface';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  /**
   * Data received
   */
  groups: GroupInterface;

  constructor( private http: HttpClient) { }

  async getAllGroups() {
    const res = await this.http.get('https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/groups/:diego')
    .toPromise();
    this.groups = res["data"].groups;
    return this.groups;
  }
}
