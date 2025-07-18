import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../dulces';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosComponent } from "../productos/productos.component";

@Component({
  selector: 'app-cards',
  imports: [CurrencyPipe, ProductosComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

 products:Product[]=[]; 
 marca:string=''; 
 productosFiltrados: Product[] = [];
 marcaSeleccionada: string = ''; 

categoria:string=''; 
categoriaSeleccionada: string='';




   constructor(public productService:ProductService, private rutaACtiva: ActivatedRoute, 
       private cartService:CartService) {}



   addToCart(product:Product): void{
    this.cartService.addProduct(product)
    console.log('Producto emitido para agregar al carrito', product.nombre);
    }




}


