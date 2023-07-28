import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"



@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  // @ViewChild('map')
  // public divMap?: ElementRef;

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      // container: 'map', // container ID
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-3.9372300, 35.2516500], // starting position [lng, lat] puestas las de Alhucemas :D
      zoom: 9, // starting zoom
  });
  }


}

