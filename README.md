
## SnappCar Interview

Challenge: Build a client that allows the user to search for cars in a city.

The user can select the maximum distance and he/she can change the sorting order.

The results should be refreshed automatically when a parameter is changed.

### City Search

The user should be presented with an input box where he/she can enter a city name. 

>**Note:** The box will have **autocomplete** 

>**Note:**  The box will search as the user is typing with a **delay of 500ms** after the user stopped typing.

So, 500ms after the user stopped typing, it should search for the city AND it should search for the cars in that city. If the user continues typing afterwards, the previous search should be canceled and a new one should be done after the typing stops for another 500ms. So on and so forth...

This is the service that should be used for the city search. Use it as it would connect to an api endpoint:
```
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const cities: City[] = [
  { name: 'Utrecht', lat: '52.09073739999999', lng: '5.1214201' },
  { name: 'Amsterdam', lat: '52.3679843', lng: '4.9035614' },
  { name: 'Rotterdam', lat: '51.9244201', lng: '4.4777326' },
  { name: 'The Hague', lat: '52.0704978', lng: '4.3006999' },
  { name: 'Maastricht', lat: '50.8513682', lng: '5.6909725' },
  { name: 'Almere', lat: '52.3507849', lng: '5.2647016' },
  { name: 'Almelo', lat: '52.3670267', lng: '6.668491899999999' },
  { name: 'Amstelveen', lat: '52.3114207', lng: '4.870087' },
  { name: 'Bunnik', lat: '52.043969', lng: '5.2198687' },
  { name: 'Capelle', lat: '51.9301505', lng: '4.5777053' },
  { name: 'Hertogenbosch', lat: '51.6978162', lng: '5.3036748' }
];

@Injectable({ providedIn: 'root' })
export class CitySearchService {
  constructor() {}

  searchCities(term: string): Observable<City[]> {
    let filteredCities = [];
    
    if(term){
      filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    return of(filteredCities);
  }
}

export interface City {
  name: string;
  lat: string;
  lng: string;
}


```

This service will return an **Observable** list of cities based on input. Each city has a **lat** and **lng** that can be used to look for cars.


### Distance Change

There should be a dropdown on the page which allows the user to change the maximum distance. The possible options are **3 km**/**5 km**/**7 km**.


### Sorting Change

There should be a dropdown on the page which allows the user to change the sorting order. The possible options are **price**/**recommended**/**distance**.


### Search API

Searching for cars is done by doing an `HTTP GET` request to:
https://api.snappcar.nl/v2/search/query?sort=price&country=NL&lat=52.09073739999999&lng=5.1214201&max-distance=3000
This, of course with the **correct** parameters.


### Error Handling

There should be proper error handling and there are **bonus points** for tests.

### Final notes

We expect you to **not** use any UI library for this challenge(like Material, Bootstrap, Tailwind etc.).

Please **do not** change the **CitySearchService**.

You might need to to launch Chrome in **unsafe mode** to let it work with CORS to disable the same origin policy. This should help: https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

Please don’t spend more than 4 hours on this. If it’s not finished, it’s ok. This will provide talking points for the next technical discussion.
You can use https://stackblitz.com/ or a https://github.com/ link is also fine.

## Good luck!
