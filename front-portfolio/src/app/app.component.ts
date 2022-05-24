import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio de Quipildor Leandro';
  
  constructor(private router:Router){}

  Ver_persona() {
    this.router.navigate(["ver_persona"]);
  }

}
