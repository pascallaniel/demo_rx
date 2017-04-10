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
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css'],
  providers: [WeatherService]
})
export class MergeComponent implements OnInit {
  private items:Array<String>;

  constructor(private weatherService:WeatherService ) {}

  @ViewChild('choice1') choice1Button:ElementRef;
  @ViewChild('choice2') choice2Button:ElementRef;
  @ViewChild('choice3') choice3Button:ElementRef;

  ngAfterViewInit() { 
    let click1 = Observable.fromEvent(this.choice1Button.nativeElement, 'click').map(() => "San") //si click sur bouton 1, envois "San"
    let click2 = Observable.fromEvent(this.choice2Button.nativeElement, 'click').map(() => "Ton") //si click sur bouton 1, envois "Ton"
    let click3 = Observable.fromEvent(this.choice3Button.nativeElement, 'click').map(() => "Lou") //si click sur bouton 1, envois "Lou"

    Observable.merge(click1, click2, click3) //envois la valeur si n'importe quel des observable emets quelque chose
      .distinctUntilChanged() //Continue seulement si la valeur n'est pas la meme que l'execution precedente
      .do(value => { this.items = [] }) //vide l'array
      .flatMap(value => this.weatherService.findCities(value)) //appelle l'api pour aller chercher les villes, une par une
      .map(item => item.title as string) //recupere le title de la ville
      .subscribe(newItem => {
        this.items.push(newItem); //ajoute le nom de la ville a l'array pour rendu à l'écran
     });
  }

  ngOnInit() {  
    
  }
}
