import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/toArray';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
  private form: FormGroup;
  private items:Array<any>;
  private cities:Array<string>;
  private sub:Subscription;

  constructor(private formBuilder: FormBuilder, private weatherService:WeatherService ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [''],
    })

    this.sub = this.form.controls["search"].valueChanges //envois le contenue du input a chaque fois qu'il change
      .debounce(() => Observable.timer(500)) //attends 500ms apres le dernier keystroke avant d'envoyer
      .filter(value => value.length > 0 && value.length < 10) //envois seulement les valeurs entre 1 et 9 char inclusivement
      .map(value => value.toLowerCase()) //why not
      .do(value => { this.items = [] }) //vide l'array
      .do(value => { this.cities = [] })
      .flatMap(value => this.weatherService.findCities(value)) //appelle l'api pour recuperer les villes, une par une
      //.do(city => { this.cities.push(city.title) })
      /*.concatMap(*/.flatMap(city => this.weatherService.getWeather(city.woeid, 5).map(weather => { return { title : city.title, weather:weather } })) //appelle l'api pour avoir la meteo des 5 prochains jours
      .defaultIfEmpty({ title : "Oops...", weather:[] }) //Si pas de villes... envois ca
      .catch(error => Observable.of({ title : "Oops...", weather:[] })) //Si erreur... envois ca
      .subscribe(newItem => {
        this.items.push(newItem); //Ajoute l'object qui contient le nom de la ville et sa meteo à l'array, pour rendering.
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}