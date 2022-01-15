import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerColor: string = this.appService.polygon?.color || 'orange';
  zone: string = this.appService.polygon?.name || 'orange';
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

}
