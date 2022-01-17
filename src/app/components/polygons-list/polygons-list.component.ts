import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-polygons-list',
  templateUrl: './polygons-list.component.html',
  styleUrls: ['./polygons-list.component.css']
})
export class PolygonsListComponent implements OnInit {
  polygons$ = this.appService.polygons
  constructor(private appService: AppService) { }
 
  
  ngOnInit(): void {
  }
  
  deletePolygon(name: string) {
    this.appService.deletePolygon(name)
  }
}
