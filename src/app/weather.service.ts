import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/from';

@Injectable()
export class WeatherService {

  constructor(private http: Http) { }

  public findCities(query:String): Observable<any> {
    return this.http.get("https://www.metaweather.com/api/location/search/?query=" + query)
      .retry(3)
      .map(response => response.json() as Array<any>)
      .flatMap(jsonArray => Observable.from(jsonArray))
  }

  public getWeather(woeid:String, limit:number): Observable<Array<any>> {
    return this.http.get("https://www.metaweather.com/api/location/" + woeid + "/")
      .retry(3)
      .map(response =>  response.json() as any)
      .map(json => json.consolidated_weather)
      .flatMap(json =>  Observable.from(json))
      .take(limit)
      .toArray()
  }

  public oops(): Observable<any> {
    return this.http.get("https://www.metaweather.com/api/location&?%$#/")
  }
}
