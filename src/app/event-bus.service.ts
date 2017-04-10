import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs/Rx';

@Injectable()
export class EventBusService {

  private static bus:AsyncSubject<any>;

  constructor() { 
    if(!EventBusService.bus)
    EventBusService.bus = new AsyncSubject<any>();
  }
  
  public getBus() {
    return EventBusService.bus;
  }

}
