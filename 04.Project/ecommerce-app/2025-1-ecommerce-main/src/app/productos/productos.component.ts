import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../dulces';
import { ActivatedRoute, OutletContext, Params } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-productos',
  imports: [CurrencyPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

products:Product[]=[]; 
categoria:string=''; 
productosFiltrados: Product[]=[];
categoriaSeleccionada: string='';

  constructor(public productService:ProductService, private rutaACtiva: ActivatedRoute, 
    private cartService:CartService) {}

  ngOnInit(): void {
    this.categoria=this.rutaACtiva.snapshot.params['categoria']
    this.productosFiltrados=this.productService.getProductsPorCategoria(this.categoria);
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data; 
    });
    }

    addToCart(product:Product): void{
      this.cartService.addProduct(product)
      console.log('Producto emitido para agregar al carrito', product.nombre);
      localStorage.setItem('data', JSON.stringify(this.cartService));
  }
}
