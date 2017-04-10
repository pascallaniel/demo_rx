import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core';
import { WeatherService }  from '../weather.service';
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
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
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
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers: [WeatherService]
})
export class ErrorComponent implements OnInit {

  result:string;
  error:string;
  completed:string;

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
      this.weatherService.oops()
        //.retry(2)
        /*.catch(error => this.weatherService.findCities("Mont")
          .first()
          .map(city => city.title)
          .do((title) => {throw new Error("Do'h")})
        )*/
        .catch(error => Observable.of("Unable to find city"))
        .subscribe((onNext) => {
          //hell yea!
          this.result = onNext;
        }, (error) => {
          //ah crap!
          this.error = error;
        }, () => {
          //completed
          this.completed = "yup";
        })

  }

}
