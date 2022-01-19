import { Injectable } from '@angular/core';
import {BehaviorSubject, map, take} from "rxjs";

export interface Polygon {
name: string; color: string, coords: any[]
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
 mockedPolygons =  [
   {
     name: 'green',
     color: 'green',
     coords: [
       [49.814299837752465, 24.06129680005148],
       [49.813822150868425, 24.061361173067475],
       [49.813849842990436, 24.06225166645546],
       [49.81431368367828, 24.062294581809688]
     ]
   },
   {
     name: 'yellow',
     color: 'yellow',
     coords: [
       [49.8109106210456, 24.05771297670782],
       [49.80840426759288, 24.056339685701392],
       [49.80823117208799, 24.065341179149762],
       [49.81055060034162, 24.06497639872559]
     ],
   },
   {
     name: 'red',
     color: 'red',
     coords: [
       [49.80840426759288, 24.056339685701392],
       [49.80823117208799, 24.065341179149762],
       [49.80594625348054, 24.06633896090163],
       [49.805773149193826, 24.058710758505757]
     ]
   },
   {
     name: 'blue',
     color: 'blue',
     coords: [
       [49.80594625348054, 24.06633896090163],
       [49.805773149193826, 24.058710758505757],
       [49.80247712542266, 24.059633438393494],
       [49.80303801925183, 24.06942350124333]
     ]
   },
   {
     name: 'grey',
     color: 'grey',
     coords: [
       [49.80247712542266, 24.059633438393494],
       [49.80303801925183, 24.06942350124333],
       [49.80023348506256, 24.07098991130669],
       [49.797984974787674, 24.056013325254845]
     ]
   },
   {
     color: "pink",
     name: "pink",
     coords: [
       [49.8109106210456, 24.05771297670782],
       [49.81073547074997, 24.064977135547522],
       [49.813324231675466, 24.06493987406533],
       [49.81409181125535, 24.054747689464833]
     ]
   }
 ]
 polygon: BehaviorSubject<Polygon> = new BehaviorSubject({name: '', color: 'orange', coords: []} as Polygon)
 polygons: BehaviorSubject<Polygon[]> = new BehaviorSubject(JSON.parse(localStorage.getItem('polygons') || JSON.stringify(this.mockedPolygons)) || this.mockedPolygons)
  constructor() { }
  
  setActivePolygon(polygon: Polygon) {
     this.polygon.next(polygon);
  }
  
  addPolygon(polygon: any) {
    const mapPolygon = {name:polygon.name, color: polygon.color, coords: [
      [polygon.point1.latitude, polygon.point1.longitude],
      [polygon.point2.latitude, polygon.point2.longitude],
      [polygon.point3.latitude, polygon.point3.longitude],
      [polygon.point4.latitude, polygon.point4.longitude],
      ]}
    
    this.polygons.pipe(take(1)).subscribe(polygons => {
      const updPolygons = [...polygons, mapPolygon]
      this.updatePolygonsList(updPolygons)
    })
  }
  
  deletePolygon(name: string) {
    this.polygons.pipe(map(polygons => polygons.filter(v => v.name !== name))).subscribe(polygons => {
      this.updatePolygonsList(polygons)
    })
  }
  
  updatePolygonsList(polygons: Polygon[]) {
    localStorage.setItem('polygons', JSON.stringify(polygons))
    // this.polygons.next(polygons)
  }
}
