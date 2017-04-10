import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';

describe('AutocompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService]
    });
  });

  it('should ...', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});
