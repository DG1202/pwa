import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import {AppService, Polygon} from "../../../services/app.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  getCoords!: any;
  watchCoords!: any;
  private myMap: any;
  private marker: any;
  private icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: './assets/images/marker-icon.png',
      shadowUrl: './assets/images/marker-shadow.png'
    })
  };
  private polygons: any[] = [];
  private serverPolygons: Polygon[] = [];
  
  constructor(private appService: AppService) {};
  
  ngOnInit(): void {
    this.getInitPosition();
    this.watchPosition();
  }
  
  private getInitPosition() {
    navigator.geolocation.getCurrentPosition((position => {
      this.getCoords = position.coords
      this.myMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
      this.marker = L.marker([this.getCoords.latitude, this.getCoords.longitude], this.icon).addTo(this.myMap);
      
      this.appService.polygons.subscribe(polygons => {
        const polygonsNames = this.serverPolygons.map(v => v.name);
        const newPolygons = polygons.filter(polygon => {
          return !(polygonsNames.includes(polygon.name));
        });
        this.serverPolygons = polygons;
        newPolygons.forEach(polygon => {
          this.polygons.push(L.polygon(polygon.coords, {color: polygon.color}).addTo(this.myMap));
        })
      })
      
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGltYWduYXQiLCJhIjoiY2t5YmVwbmJyMGNlMTJ4cDVveDN2OWxxYiJ9.PGlUphR669ZJXBTkD4JCeg', {
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(this.myMap);
    }), err => console.log(err))
  }
  private watchPosition() {
    navigator.geolocation.watchPosition((position => {
      let isActivePolygon = false;
      this.watchCoords = position.coords;
      this.marker.setLatLng([this.watchCoords.latitude, this.watchCoords.longitude]).update();
      this.myMap.setView([this.watchCoords.latitude, this.watchCoords.longitude]);
      this.serverPolygons.forEach((polygon, index) => {
        if(this.polygons[index].getBounds().contains([this.watchCoords.latitude, this.watchCoords.longitude])) {
          this.appService.setActivePolygon(polygon);
          isActivePolygon = true;
        }
        if(!isActivePolygon) {
          this.appService.setActivePolygon({name: '', color: '#F8F8F8', coords: []} as Polygon);
        }
      })
      
    }),err => console.log(err), {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }
}
