import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

email:string='';
nombre:string='';
apellidos:string='';
domicilio:string='';
colonia:string='';
codigoPostal:string=''
ciudad:string='';
estadoSeleccionado:string='';
telefono:string='';
numeroTarjeta:string='';
fechaVence:string='';
nombreTitular:string='';


guardarPedido(){
  this.email='';
  this.nombre='';
  this.apellidos='';
  this.domicilio='';
  this.colonia='';
  this.codigoPostal='';
  this.ciudad='';
  this.estadoSeleccionado='';
  this.telefono='';
  this.numeroTarjeta='';
  this.fechaVence='';
  this.nombreTitular='';
}




ngOnInit(): void {
}

onEstadoSeleccionado(): void {
  console.log('Estado seleccionado:', this.estadoSeleccionado);
}

estadosMexico: string[] = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Coahuila de Zaragoza',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán de Ocampo',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz de Ignacio de la Llave',
  'Yucatán',
  'Zacatecas'
];








}




  
