import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; 
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "./footer/footer.component";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FontAwesomeModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';

  


}

