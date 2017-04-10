import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { MergeComponent } from '../merge/merge.component';
import { WeatherComponent } from '../weather/weather.component';
import { CombineLatestComponent } from '../combine-latest/combine-latest.component';
import { ErrorComponent } from '../error/error.component';
import { CustomComponent } from '../custom/custom.component';

const appRoutes: Routes = [
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'merge', component: MergeComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'combineLatest', component: CombineLatestComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'custom', component: CustomComponent },
  { path: '**', component: AutocompleteComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
