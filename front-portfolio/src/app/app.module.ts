import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { MisDatosComponent } from './componentes/mis-datos/mis-datos.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExpLabComponent } from './componentes/exp-lab/exp-lab.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { PieComponent } from './componentes/pie/pie.component';
@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    MisDatosComponent,
    AcercaDeComponent,
    ExpLabComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    //FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
