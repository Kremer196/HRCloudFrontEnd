import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';


const routes: Routes = [
 {path:"items/:id", component: ItemComponent},
 {path:"cart", component: CartComponent},
 {path:"login", component: LoginComponent},
 {path:"user", component: UserComponent},
 {path:"register", component: RegisterComponent},
 {path:"additem", component: AddItemComponent},
 {path:"updateitem", component: UpdateItemComponent},
 {path:"deleteitem", component: DeleteItemComponent},
 {path:"user/manage", component: UserManagementComponent},
 {path:"addcategory", component: AddCategoryComponent},
 {path:"updatecategory", component: UpdateCategoryComponent},
 {path:"deletecategory", component: DeleteCategoryComponent},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {
  
 }
