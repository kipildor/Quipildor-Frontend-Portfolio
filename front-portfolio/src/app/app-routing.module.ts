import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaByIdComponent } from './componentes/mis-datos/persona-by-id/persona-by-id.component';
import { Persona } from './modelos/persona';
import { LoginComponent } from './jwt/auth/login.component';
import { AppComponent } from './app.component';
import { RegistroComponent } from './jwt/auth/registro.component';
import { PortfolioGuardService as guard } from './jwt/guards/portfolio-guard.service';

const routes: Routes = [
  /*
  { path:'ver_persona', component:PersonaByIdComponent },
  { path:''}

  { path:'', component:AppComponent },
  { path:'formLogin', component:LoginComponent }
  */
  { path: 'lista', component: RegistroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
