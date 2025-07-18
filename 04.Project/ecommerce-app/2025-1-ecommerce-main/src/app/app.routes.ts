import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CartComponent } from './cart/cart.component';
import { RegistroComponent } from './registro/registro.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosComponent } from './productos/productos.component';
import { CheckoutComponent } from './checkout/checkout.component';


export const routes: Routes = [

    {path: 'inicio', component: InicioComponent },
    {path: 'productos/:categoria', component: ProductosComponent},
    {path: 'marcas/:marca', component: MarcasComponent}, 
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent}, 
    {path: 'addToCart', component:CartComponent}, 
    {path: 'cerrarPedido', component: RegistroComponent}, 
    {path: 'inicio-de-sesión', component:RegistroComponent},
    {path: 'footer', component: FooterComponent}, 
    {path: '', redirectTo: '/inicio', pathMatch:'full'}, 
    {path: '**', pathMatch:'full', redirectTo:'inicio'}

]; 
