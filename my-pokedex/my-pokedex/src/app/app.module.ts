import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseAppModule } from './components/base-app/base-app.module';
import { HomeComponent } from './components/home/home.component';
import { HomeModelModule } from './components/home/home-model/home-model.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BaseAppModule,
    HomeModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
