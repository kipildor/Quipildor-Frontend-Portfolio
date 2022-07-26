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

import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagenPerfilComponent } from './componentes/formularios/imagen-perfil/imagen-perfil.component';
import { ImagenBannerComponent } from './componentes/formularios/imagen-banner/imagen-banner.component';
import { FormHabilidadesAltaComponent } from './componentes/formularios/form-habilidades/form-habilidades-alta.component';
import { FormHabilidadesBajaComponent } from './componentes/formularios/form-habilidades/form-habilidades-baja.component';
import { FormHabilidadesModifComponent } from './componentes/formularios/form-habilidades/form-habilidades-modif.component';
import { FormEducacionAltaComponent } from './componentes/formularios/form-educacion/form-educacion-alta.component';
import { FormEducacionBorrarComponent } from './componentes/formularios/form-educacion/form-educacion-borrar.component';
import { FormEducacionModifComponent } from './componentes/formularios/form-educacion/form-educacion-modif.component';
import { FormProyectoAltaComponent } from './componentes/formularios/form-proyecto/form-proyecto-alta.component';
import { FormProyectoBajaComponent } from './componentes/formularios/form-proyecto/form-proyecto-baja.component';
import { FormProyectoModifComponent } from './componentes/formularios/form-proyecto/form-proyecto-modif.component';
import { FormImgProyectoAltaComponent } from './componentes/formularios/form-img-proyecto/form-img-proyecto-alta.component';


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
    FormExpLabModifComponent,
    ImagenPerfilComponent,
    ImagenBannerComponent,
    FormHabilidadesAltaComponent,
    FormHabilidadesBajaComponent,
    FormHabilidadesModifComponent,
    FormEducacionAltaComponent,
    FormEducacionBorrarComponent,
    FormEducacionModifComponent,
    FormProyectoAltaComponent,
    FormProyectoBajaComponent,
    FormProyectoModifComponent,
    FormImgProyectoAltaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    PersonaService,
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
