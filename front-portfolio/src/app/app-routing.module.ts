import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaByIdComponent } from './componentes/mis-datos/persona-by-id/persona-by-id.component';
import { Persona } from './modelos/persona';

const routes: Routes = [
  /*
  { path:'ver_persona', component:PersonaByIdComponent },
  { path:''}
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
