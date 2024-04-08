import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { InterceptorService } from './core/interceptors/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
