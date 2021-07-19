import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

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
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './app.pipe';
import { MinFilterPipe } from './app.minpipe';
import { MaxFilterPipe } from './app.maxpipe';
import { CategoryFilterPipe } from './app.categorypipe';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    CartComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    AddItemComponent,
    UpdateItemComponent,
    DeleteItemComponent,
    UserManagementComponent,
    SearchFilterPipe,
    MinFilterPipe,
    MaxFilterPipe,
    CategoryFilterPipe,
    DeleteCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
