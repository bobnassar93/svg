import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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
    FormsModule
  ],
  providers: [SVG],
  bootstrap: [AppComponent]
})
export class AppModule { }
