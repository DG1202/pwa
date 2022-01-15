import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  getCoords!: any;
  watchCoords!: any  ;
  private myMap: any;
  private marker: any;
  private icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      // specify the path here
      iconUrl: './assets/images/marker-icon.png',
      shadowUrl: './assets/images/marker-shadow.png'
    })
  };
  private polygons: any[] = [];
  
  constructor(private appService: AppService) {
  }
  
  ngOnInit(): void {
    this.getInitPosition();
    this.watchPosition();
  }
  
  private getInitPosition() {
   
    navigator.geolocation.getCurrentPosition((position => {
      this.getCoords = position.coords
      this.myMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
      this.marker = L.marker([this.getCoords.latitude, this.getCoords.longitude], this.icon).addTo(this.myMap);
      
      this.appService.polygons.forEach(polygon => {
        this.polygons.push(L.polygon(polygon.coords, {color: polygon.color}).addTo(this.myMap))
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
      this.watchCoords = position.coords;
      this.marker.setLatLng([this.watchCoords.latitude, this.watchCoords.longitude]).update();
      this.myMap.setView([this.watchCoords.latitude, this.watchCoords.longitude]);
      this.appService.polygons.forEach((polygon, index) => {
        console.log(this.polygons[0])
        if(this.polygons[index].getBounds().contains([this.watchCoords.latitude, this.watchCoords.longitude])) {
          this.appService.setActivePolygon(polygon)
        }
      })
      
    }),err => console.log(err), {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }
}
