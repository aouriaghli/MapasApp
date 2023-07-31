import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.9372300, 35.2516500);

  // @ViewChild('map')
  // public divMap?: ElementRef;

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      // container: 'map', // container ID
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat] puestas las de Alhucemas :D
      zoom: this.zoom, // starting zoom
  });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();// con esto borro todo el mapa incluido los listeners.
  }

  mapListeners(){
     if (!this.map) throw 'Mapa no inicializado';

     this.map.on('zoom', (ev) => {
        this.zoom = this.map!.getZoom();
     });

     this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);

      this.map?.on('moveend', (ev) => {
        this.currentLngLat = this.map!.getCenter();
      });
   });

  }

  zoomChanged( value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }
}
