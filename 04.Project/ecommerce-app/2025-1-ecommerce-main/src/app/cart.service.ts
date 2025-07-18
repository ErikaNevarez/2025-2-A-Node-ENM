import { Injectable, ɵɵstylePropInterpolate2 } from '@angular/core';
import { Product } from './dulces';
import { data } from '.';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Product[]=data; 
  cartItems:Product[]=[]



  constructor() { 
   
  }

  addProduct(product: Product): void {
    this.cartItems.push(product); 
    localStorage.setItem('data', JSON.stringify(this.cartItems));
  }

  removeProduct(id_dulce:Product['id_dulce']): void {
    this.cartItems=this.cartItems.filter(item=>item.id_dulce!==id_dulce);
    localStorage.setItem('data', JSON.stringify(this.cartItems));
  }

  


}
