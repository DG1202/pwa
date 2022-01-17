import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  polygonForm!: FormGroup
  
  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.initForm()
  }
  
  initForm() {
    this.polygonForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      point1: this.fb.group({
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      }),
      point2: this.fb.group({
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      }),
      point3: this.fb.group({
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      }),
      point4: this.fb.group({
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      }),
    });
  }
  
  onSubmit(value: Number[][]) {
    this.appService.addPolygon(value);
  }
}
