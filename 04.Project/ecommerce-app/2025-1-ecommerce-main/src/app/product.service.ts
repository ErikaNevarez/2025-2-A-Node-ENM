import { Injectable } from '@angular/core';
import { Product } from './dulces';
import { data } from './index';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[]=data; 


  getAllProducts(): Observable<Product[]>{
      return of(this.products); 
    }

  getProductsPorCategoria(categoria: string): Product[] {
    return this.products.filter(product => product.categoria == categoria);
  }

  getProductsPorMarca(marca: string): Product[] {
    return this.products.filter(product => product.marca == marca);
  }

  
}
