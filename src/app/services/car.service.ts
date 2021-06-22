import { map, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from './city.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  base_url = '/query';
  headers:HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*'})

  constructor(private http: HttpClient) { }

  getCars$(cities:City[]): Observable<any>{

    /* cities.forEach() */
    let params = new HttpParams({fromObject:{
/*               sort:'recommended',
              country:'NL', */
              lat:'52.09073739999999',
              lng:'5.1214201'/* ,
              'max-distance':'3000' */
              }});
    return this.http.get<any>(this.base_url,{headers: this.headers, params: params})
                .pipe(
                  map(data => data.results),tap(result => console.log(result)));
  }
}
