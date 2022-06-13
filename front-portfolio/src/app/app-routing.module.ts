import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaByIdComponent } from './componentes/mis-datos/persona-by-id/persona-by-id.component';
import { Persona } from './modelos/persona';
import { LoginComponent } from './componentes/formularios/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  /*
  { path:'ver_persona', component:PersonaByIdComponent },
  { path:''}
  */
  { path:'', component:AppComponent },
  { path:'formLogin', component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
