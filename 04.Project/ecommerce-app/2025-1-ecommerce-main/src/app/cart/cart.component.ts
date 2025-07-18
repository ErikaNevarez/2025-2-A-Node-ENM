import { Component} from '@angular/core';
import { Product } from '../dulces';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems:Product[]=[]; 
  total:number=0;
  products:Product[]=[]; 

  constructor(private cartService:CartService){}

 ngOnInit(){
    this.cartItems=this.cartService.cartItems
    this.sumarTotal()
    }


  sumarTotal(){
    this.cartItems.forEach(item=>{this.total=this.total+item.precio})
  }

  removeProduct(id_dulce:Product['id_dulce']): void {
    this.cartItems=this.cartItems.filter(item=>item.id_dulce!==id_dulce);
   
  }


}

