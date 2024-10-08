import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AuthGuard } from './services/AuthGuard/auth-guard.service';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent},
    {path:'cart', component: CartComponent, canActivate: [AuthGuard],data: { expectedRole: 'USER' }},
    { path: 'add-product', component: AddProductComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' } },
    { path: 'admin-products', component: AdminProductsComponent, canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' }},
    { path: 'update-product/:id', component: UpdateProductComponent,canActivate: [AuthGuard],data: { expectedRole: 'ADMIN' } }, 
];
