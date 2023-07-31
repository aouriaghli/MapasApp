import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarkerAndColor{
  color: string,
  marker: Marker
}

interface PlainMarker{
  color: string,
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

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
      zoom: 14, // starting zoom
  });

  // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Usted esta Aquí'

    // const marker = new Marker({
    //                 //color: 'red'
    //                 element : markerHtml
    // })
    //               .setLngLat(this.currentLngLat)
    //               .addTo(this.map);
    this.readFromLocalStorage();
  }

  createMarker(){
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat : LngLat, color:string){
    if (!this.map) return;

    const marker = new Marker({
      color : color,
      draggable: true
    }).setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker
    });
    this.saveToLocalStorage();

    marker.on('dragend', () =>
      this.saveToLocalStorage());
    ;
  }

  deleteMarker(index:number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker){
      this.map?.flyTo({
        zoom : 15,
        center : marker.getLngLat()
      });
  }

  saveToLocalStorage(){
    //console.log(this.markers);
    const plainMarkers: PlainMarker[] =
              this.markers.map( ({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray()
        }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString); //¡OJO!
    //console.log(plainMarkers);
    plainMarkers.forEach(
       ({ color, lngLat }) => {
        const [lng, lat] = lngLat;
        const coords = new LngLat(lng, lat);
        this.addMarker(coords, color);
       });
  }
}
