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
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css'],
  providers: [WeatherService]
})
export class CustomComponent implements OnInit {

  items:Array<String>
  error:String;

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
    this.items = [];

    Observable.interval(100)
      /*.flatMap*/.concatMap(value => this.customIsEvenButNot8(value))
      .subscribe(isEven => {
        this.items.push(isEven);
      }, error => {
        this.error = error;
      });

  }

  public customIsEvenButNot8(input:number):Observable<String> {
    return Observable.create((observer) => {
      //On peut executer n'importe quel code ici.

      let randomTime = Math.floor(Math.random() * 2500);
      //Les observable peuvent être sync ou async sans problème
      setTimeout(() => {
        
        if(input == 8) {
          observer.error(new Error("I told you I didn't want an 8...")) //ah shit
        }
        else {
          observer.next(input + " is even = " + (input % 2 == 0)); //passe au suivant!
          observer.complete(); //important d'appeler le complete qu'on l'observable a remplis son rôle
        }

      }, randomTime);
    });
  }

}
