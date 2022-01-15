import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  polygonForm!: FormGroup
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }
  
  initForm() {
    this.polygonForm = this.fb.group({
      name: [''],
      color: [''],
      point1: this.fb.group({
        latitude: [''],
        longitude: [''],
      }),
      point2: this.fb.group({
        latitude: [''],
        longitude: [''],
      }),
      point3: this.fb.group({
        latitude: [''],
        longitude: [''],
      }),
      point4: this.fb.group({
        latitude: [''],
        longitude: [''],
      }),
    });
  }
  
  onSubmit(value: any) {
    console.log(value)
  }
}
