import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SVG } from './services/svg.service';
import { MainComponent } from './ui/main/main.component';
import { MenuComponent } from './ui/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [SVG],
  bootstrap: [AppComponent]
})
export class AppModule { }
