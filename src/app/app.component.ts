import { CarService } from './services/car.service';
import { City, CitySearchService } from './services/city.service';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Car{
  make:string;
  model: string;
  distance: string;
  recommended: string;
}
@Component({
  selector: 'snapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  orderItem = ['price','recommended','distance'];
  distanceItem = [3000,5000,7000];
  cars:Array<Car>;
  sort='';
  cities:City[];
  txtQueryChanged: Subject<string> =  new Subject<string>();

  constructor(private city: CitySearchService,
              private carService: CarService){

                this.txtQueryChanged.pipe(
                  debounceTime(500),
                  distinctUntilChanged()).subscribe(

                    model => {
                      this.sort=model;
                      this.searchCity();
                    }
                  )

              }

  async searchCity(){

    this.cities = await this.city.searchCities(this.sort).toPromise();
    console.log(this.cities);
    this.cars = (await this.carService.getCars$(this.cities).toPromise()).map(data =>({
      make:data.car.make,
      model:data.car.model,
      recommended: data.car.reviewAvg | 0,
      distance: data.distance
    }));
    console.log(this.cars)

  }

  onFieldChange(query:string){
    this.txtQueryChanged.next(query);
  }
}
