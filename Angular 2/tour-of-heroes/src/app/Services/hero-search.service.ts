import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Hero }           from '../Config/hero';


@Injectable() // Returns an Observable that will be parsed
/*
	Usually Coverting the Observable from the http functions is a good idea
	because typically, you ask http.get() to fetch a single chunk of data that the
	component can easily Consume.


	In this case, we can start one request, cancel it, and make a different
	request before the server has responded to the first request.

	These types of sequences are easier to handle with Observables than with
	a Promise.

*/


// Map() is a RXJS operator
// it is used to extract heroes from the response data
export class HeroSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`app/heroes/?name=${term}`)
               .map(response => response.json().data as Hero[]);
  }
}
