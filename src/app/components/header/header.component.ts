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
    // this.updateManifest();
  }

  updateManifest(): void {
    const location = window.location.origin;
    var myDynamicManifest = {
      "name": "Your Great Site",
      "short_name": "Your Great Site short name",
      "description": "Something dynamic",
      "start_url": `${window.location.origin}`,
      "background_color": "#000000",
      "theme_color": "#0f4a73",
      "icons": [
        {
          "src": `${location}/assets/icons/icon-72x72.png`,
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": `${location}/assets/icons/icon-96x96.png`,
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": `${location}/assets/icons/icon-128x128.png`,
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": `${location}/assets/icons/icon-144x144.png`,
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": `${location}/assets/icons/icon-152x152.png`,
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": `${location}/assets/icons/icon-192x192.png`,
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": `${location}/assets/icons/icon-384x384.png`,
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": `${location}/assets/icons/icon-512x512.png`,
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable any"
        }
        ]
      }
      const link = document.createElement("link");
      link.rel = "manifest";
      const stringManifest = JSON.stringify(myDynamicManifest);
      link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
      document.head.appendChild(link);
    }
}
