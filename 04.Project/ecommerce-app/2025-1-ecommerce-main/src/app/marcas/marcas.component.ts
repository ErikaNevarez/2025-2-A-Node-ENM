import { Component, Input } from '@angular/core';
import { Product } from '../dulces';
import { ProductService } from '../product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-marcas',
  imports: [CurrencyPipe],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent {

products:Product[]=[]; 
marca:string=''; 
productosFiltrados: Product[] = [];
marcaSeleccionada: string = ''; 

   constructor(public productService:ProductService, private rutaACtiva: ActivatedRoute, 
       private cartService:CartService) {}

   ngOnInit(): void {
    this.marca=this.rutaACtiva.snapshot.params['marca']
    this.productosFiltrados=this.productService.getProductsPorMarca(this.marca)
    console.log(this.productosFiltrados)
   }

   addToCart(product:Product): void{
    this.cartService.addProduct(product)
    console.log('Producto emitido para agregar al carrito', product.nombre);
    localStorage.setItem('data', JSON.stringify(this.cartService));
}


  }
