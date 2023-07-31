import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;
  @Input() lngLat?: [number, number];

  ngAfterViewInit(): void {
    if (!this.divMap) throw "El elemento HTML no fue encontrado";
    if (!this.lngLat) throw "LngLat can't be null";

    this.map = new Map({
      // container: 'map', // container ID
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat] puestas las de Alhucemas :D
      zoom: 15, // starting zoom
      interactive: false //propiedad que permite deshabilitar todo lo posible en un mapa (zoom, arrastrar, etc)
  });
    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }




}
