import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { MisDatosComponent } from './componentes/mis-datos/mis-datos.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExpLabComponent } from './componentes/exp-lab/exp-lab.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { PieComponent } from './componentes/pie/pie.component';
import { PersonaByIdComponent } from './componentes/mis-datos/persona-by-id/persona-by-id.component';
import { PersonaService } from './servicios/persona.service';
import { LoginComponent } from './jwt/auth/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormMisDatosComponent } from './componentes/formularios/form-mis-datos/form-mis-datos.component';
import { RegistroComponent } from './jwt/auth/registro.component';
import { interceptorProvider, PortfolioInterceptorService } from './jwt/interceptors/portfolio-interceptor.service';
import { FormAcercaDeComponent } from './componentes/formularios/form-acerca-de/form-acerca-de.component';
import { FormAcercaDeAltaComponent } from './componentes/formularios/form-acerca-de/form-acerca-de-alta.component';
import { FormAcercaDeBorrarComponent } from './componentes/formularios/form-acerca-de/form-acerca-de-borrar.component';
import { FormExpLabBorrarComponent } from './componentes/formularios/form-exp-lab/form-exp-lab-borrar.component';
import { FormExpLabAltaComponent } from './componentes/formularios/form-exp-lab/form-exp-lab-alta.component';
import { FormExpLabModifComponent } from './componentes/formularios/form-exp-lab/form-exp-lab-modif.component';


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
    PieComponent,
    PersonaByIdComponent,
    LoginComponent,
    FormMisDatosComponent,
    RegistroComponent,
    FormAcercaDeComponent,
    FormAcercaDeAltaComponent,
    FormAcercaDeBorrarComponent,
    FormExpLabBorrarComponent,
    FormExpLabAltaComponent,
    FormExpLabModifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    PersonaService,
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
