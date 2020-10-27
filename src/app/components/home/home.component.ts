import { Component, OnInit } from '@angular/core';

import { CarrouselInterface } from '../../interfaces/carrousel.interface';
import { carrouselFixtures } from '../../fixtures/carrousel.fixture';

/**
 * Angular decorator
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Class for home component
 */
export class HomeComponent implements OnInit {

  /**
   * Images for carrousel
   */
  images: CarrouselInterface[];

  constructor() { }

  ngOnInit(): void {

    this.images = carrouselFixtures;
  }

}
