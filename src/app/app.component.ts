import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {Polygon} from "leaflet";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  getCoords!: any
  watchCoords!: any

  private myMap: any;
  private polygon: any;
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

  ngOnInit(): void {
    this.getPosition()
    this.watchPosition()
  }

  private getPosition() {
    navigator.geolocation.getCurrentPosition((position => {
      this.getCoords = position.coords
      this.myMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
      this.polygon = L.polygon([
        [49.814299837752465, 24.06129680005148],
        [49.813822150868425, 24.061361173067475],
        [49.813849842990436, 24.06225166645546],
        [49.81431368367828, 24.062294581809688]
      ]).addTo(this.myMap);
      this.marker = L.marker([this.getCoords.latitude, this.getCoords.longitude], this.icon).addTo(this.myMap);


      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGltYWduYXQiLCJhIjoiY2t5YmVwbmJyMGNlMTJ4cDVveDN2OWxxYiJ9.PGlUphR669ZJXBTkD4JCeg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
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
        if(this.polygon.getBounds().contains([this.watchCoords.latitude, this.watchCoords.longitude])) {
          alert('you have arrived')
        }
      }),err => console.log(err), {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
  }

}
