import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    // AppComponent,
    // RegisterComponent,
    // LoginComponent
   
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule ,
    AppRoutingModule,
   
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

