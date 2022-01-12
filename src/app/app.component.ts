import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  getCoords!: any
  watchCoords!: any

  ngOnInit(): void {
    this.getPosition()
    this.watchPosition()
  }

  private getPosition() {
    navigator.geolocation.getCurrentPosition((position => {
      this.getCoords = position.coords
    }), err => console.log(err))
  }

  private watchPosition() {
      navigator.geolocation.watchPosition((position => {
        this.watchCoords = position.coords
      }),err => console.log(err), {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
  }

}
