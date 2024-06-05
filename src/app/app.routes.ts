import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { PurchasedComponent } from './components/clints/purchased/purchased.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { ForSaleComponent } from './components/clints/for-sale/for-sale.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { CreateClientComponent } from './components/admin/create-client/create-client.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { 
        path: 'admin', 
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardAdminComponent},
            { path: 'products', component: ProductsComponent },
            { path: 'clients', component: UsersComponent },
            {   path: "",
                children: [    
                {path: 'manageproduct', component: CreateProductComponent},
                {path: 'manageproduct/:id', component: CreateProductComponent}
            ]},
            {   path: "",
                children: [    
                {path: 'manageuser', component: CreateClientComponent},
                {path: 'manageuser/:id', component: CreateClientComponent}
            ]}
        ]
    },
    { 
        path: 'client', 
        component: ClientsComponent,
        children: [
            { path: '', redirectTo: 'forsale', pathMatch: 'full' },
            { path: 'forsale', component: ForSaleComponent },
            { path: 'purchased', component: PurchasedComponent }
        ]
    }
];