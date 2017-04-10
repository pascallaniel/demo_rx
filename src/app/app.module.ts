import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MergeComponent } from './merge/merge.component';
import { WeatherComponent } from './weather/weather.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { EventBusService } from './event-bus.service';
import { ErrorComponent } from './error/error.component';
import { CustomComponent } from './custom/custom.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    MergeComponent,
    WeatherComponent,
    CombineLatestComponent,
    ErrorComponent,
    CustomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [EventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
