import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { WeatherService }  from '../weather.service';
import { EventBusService }  from '../event-bus.service';

import 'rxjs/add/observable/never';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/using';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/zip';

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
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [WeatherService]
})
export class AutocompleteComponent implements OnInit {
  private form: FormGroup;
  private items:Array<String>;

  constructor(private formBuilder: FormBuilder, private weatherService:WeatherService, private eventBusService:EventBusService ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [''],
    })

    this.form.controls["search"].valueChanges
      .debounce(() => Observable.timer(200)) //attendre 200ms apres la derniere keystroke pour continuer
      .do(value => this.eventBusService.getBus().next(value)) //envois la derniere valeur au bus
      .filter(value => value.length > 0 && value.length < 10) //accepte que les strings entre 1 et 9 char
      .map(value => value.toLowerCase()) //pour le fun...
      .do(value => { this.items = [] }) //vide l'array
      .flatMap(value => this.weatherService.findCities(value)) //appel l'api pour aller chercher les villes, une par une
      .map(item => item.title as string) //recupere le title de la ville (son nom)
      .subscribe(newItem => { 
        this.items.push(newItem); //ajoute la ville dans l'array
     });
  }
}
