import { Component, OnInit } from '@angular/core';

import { MenuInterface } from '../../interfaces/menu.interface';
import { menuFixture } from '../../fixtures/menu.fixture';

/**
 * Angular decorator
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  /**
   * Menu labels
   */
  labels: MenuInterface[];

  constructor() { }

  ngOnInit(): void {
    this.labels = menuFixture;
  }

}
