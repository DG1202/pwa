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
  file = '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'

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.polygon.subscribe(polygon => {
      this.headerColor = polygon.color;
      this.zone = polygon.name;
    })
    this.updateManifest();
  }

  updateManifest(): void {
    const currentLocation = window.location.origin;
    var myDynamicManifest = {
      "name": "Your Great Site",
      "short_name": "Your Great Site short name",
      "description": "Something dynamic",
      "start_url": `${currentLocation}/`,
      "background_color": "#000000",
      "theme_color": "#0f4a73",
      "display": "standalone",
      "icons": [
        {
          "src": this.getDataUrlForBase64(this.file, "image/png"),
          "sizes": "128x128",
          "type": "image/png"
        }
        // {
        //   "src": this.getDataUrlForBase64(this.file, "image/png"),
        //   "sizes": "96x96",
        //   "type": "image/png",
        //   "purpose": "maskable any"
        // },
        // {
        //   "src": this.getDataUrlForBase64(this.file, "image/png"),
        //   "sizes": "128x128",
        //   "type": "image/png",
        //   "purpose": "maskable any"
        // },
        // {
        //   "src": this.getDataUrlForBase64(this.file, "image/png"),
        //   "sizes": "144x144",
        //   "type": "image/png",
        //   "purpose": "maskable any"
        // },
        // {
        //   "src": this.getDataUrlForBase64(this.file, "image/png"),
        //   "sizes": "152x152",
        //   "type": "image/png",
        //   "purpose": "maskable any"
        // },
        // {
        //   "src": this.getDataUrlForBase64(this.file, "image/png"),
        //   "sizes": "192x192",
        //   "type": "image/png",
        //   "purpose": "maskable any"
        // },
        // {
        //   "src": this.getDataUrlForBase64(this.file, "image/png"),
        //   "sizes": "384x384",
        //   "type": "image/png",
        //   "purpose": "maskable any"
        // },
        // {
        //   "src": this.getDataUrlForBase64(this.file, "image/png"),
        //   "sizes": "512x512",
        //   "type": "image/png",
        //   "purpose": "maskable any"
        // }
        ]
      }
      const link = document.createElement("link");
      link.rel = "manifest";
      const stringManifest = JSON.stringify(myDynamicManifest);
      link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
      document.head.appendChild(link);
    }

    getDataUrlForBase64(base64String: string, mimetype: string) {
      return `data:${mimetype};base64,${base64String}`;
    }
}
