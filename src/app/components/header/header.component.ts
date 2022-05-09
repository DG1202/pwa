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

  updateManifest(): void {
    var myDynamicManifest = {
      "name": "Your Great Site",
      "short_name": "Your Great Site short name",
      "description": "Something dynamic",
      "start_url": `${window.location.origin}`,
      "background_color": "#000000",
      "theme_color": "#0f4a73",
      "icons": [

        ]
      }
      const link = document.createElement("link");
      link.rel = "manifest";
      const stringManifest = JSON.stringify(myDynamicManifest);
      link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
      document.head.appendChild(link);
    }
}
