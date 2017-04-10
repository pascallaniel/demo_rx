import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core';
import { WeatherService }  from '../weather.service';
import { EventBusService }  from '../event-bus.service';
import { ElementRef } from '@angular/core';

import 'rxjs/add/observable/never';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/using';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';

import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/toArray';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css'],
  providers: [WeatherService]
})
export class CombineLatestComponent implements OnInit { 
  private form: FormGroup;
  private item: String;

  constructor(private formBuilder: FormBuilder, private weatherService:WeatherService, private eventBusService:EventBusService ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      item1: [''],
      item2: [''],
      item3: ['']
    })

  let obs1 = this.form.controls["item1"].valueChanges.startWith("").map(value => value.toUpperCase()) //emits a string
  let obs2 = this.form.controls["item2"].valueChanges.startWith("").map(value => value.includes("a")) //emits a boolean
  let obs3 = this.form.controls["item3"].valueChanges.startWith("").map(value => value.length) //emits a number
  let obs4 = this.weatherService.findCities("san").first().map(city => city.title) //emits a string from an API call

  Observable.combineLatest(obs1, obs2, obs3, obs4) //execute them all and wait for all of them to emit at least once, then emit again everytime something changes.
    .map(combined => {
      const [upper, containsA, count, city] = combined; //deconstruct the data
      return { 
        item1:upper,
        item2:containsA, 
        item3:count, 
        city:city 
      }; //build an object
    })
    .map(json => JSON.stringify(json)) //convert to json
    .subscribe(value => {
      this.item = value //set item with json for ui rendering
    });
  }
}
