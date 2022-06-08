import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  modalSwitch:boolean = false;
  closeResult: string;

  constructor(private http:HttpClient, public modalServ:NgbModal) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalSwitch = true;
  }


}
