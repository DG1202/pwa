import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerColor!: string;
  zone!: string;
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.polygon.subscribe(polygon => {
      this.headerColor = polygon.color;
      this.zone = polygon.name;
    })
  }

}
