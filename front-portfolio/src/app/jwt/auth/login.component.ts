import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginUsuario } from 'src/app/jwt/models/login-usuario';
import { AuthService } from 'src/app/jwt/service/auth.service';
import { TokenService } from 'src/app/jwt/service/token.service';
import { HttpClient } from '@angular/common/http';
import { EncabezadoComponent } from 'src/app/componentes/encabezado/encabezado.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
/*
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {

  }
*/

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(
    private encabezado: EncabezadoComponent,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
    //private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    //console.log("usuario:"+this.loginUsuario.nombreUsuario+" pass:"+this.loginUsuario.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        //this.isLoginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        /* Modificar el Back para buscar el ID de la persona por el email y devolverlo,
        invocarlo acá y asignarselo al seteo siguiente en vez del valor hardcodeado */
        this.tokenService.setUserID(1);
        this.roles = data.authorities;
        /* this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); */
        this.getDismissReason('Login completado');
        window.location.reload();
        this.router.navigate(['']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        /* this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        }); */
        //console.log(err.error.message);
      }
    );
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {

      this.modalService.dismissAll();
      return `with: ${reason}`;
    }
  }

}
