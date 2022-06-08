import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-mis-datos',
  templateUrl: './form-mis-datos.component.html',
  styleUrls: ['./form-mis-datos.component.css']
})
export class FormMisDatosComponent implements OnInit {

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

}
