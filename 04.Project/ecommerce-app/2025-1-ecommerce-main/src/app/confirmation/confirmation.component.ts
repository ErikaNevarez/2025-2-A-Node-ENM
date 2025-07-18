import { Component } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { CheckoutComponent } from "../checkout/checkout.component";


@Component({
  selector: 'app-confirmation',
  imports: [CartComponent, CheckoutComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

}
