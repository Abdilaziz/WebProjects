import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../Config/hero';
import { HEROES } from '../Config/mock-heroes';


// An Injectable Service
// Applying the Injectable decorator from the start ensures consistency.
// It tells TypeScript to emit metadata about the service that specifies 
// that Angular may need to inject other dependencies into this service (even if there are none now)
@Injectable()  // stub
export class HeroService {

	getHeroes(): Promise<Hero[]> {
		return Promise.resolve(HEROES);  // A Promise promises to call back when the results are ready. (act on the promise in the get Heroes method in the AppComponent)
	}	

	// filters the heroes list from getHeroes() by id (Non-HTTP)
	getHero(id: number) : Promise<Hero> {
		return this.getHeroes()
					.then(heroes => heroes.find(hero => hero.id === id));
	}

	getHeroesSlowly(): Promise<Hero[]> {
	  return new Promise(resolve => {
	  // Simulate server latency with 2 second delay
	  setTimeout(() => resolve(this.getHeroes()), 2000);
		});
	}

	// Getting Hero Data using an HTTP request (GET). 
	// currently works with api emulating a web server
	private heroesUrl = 'api/heroes'; // URL to web api
	constructor(private http: Http) {}
	getHeroesHttp(): Promise<Hero[]>{
		return this.http.get(this.heroesUrl) // Returns an Observable
					.toPromise()
					.then(response => response.json().data as Hero[])
					.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
	getHeroHttp(id: number): Promise<Hero> { // Ex: hero/11
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get(url)
					.toPromise()
					.then(response => response.json().data as Hero)
					.catch(this.handleError);
	}

	// Sending Hero Data changes with HTTP put
	private headers = new Headers({'Content-Type':'application/json'});
	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http
					.put(url, JSON.stringify(hero), {headers: this.headers})
					.toPromise()
					.then(() => hero)
					.catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		return this.http
			.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data as Hero)
			.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.delete(url, {headers: this.headers})
	    .toPromise()
	    .then(() => null)
	    .catch(this.handleError);
	}


}

// we use the get mothods to get data from anywhere (web service, local storage, mock data, etc.)
// Having it seperate from the component lets us change our mind about the implementation anytime without touching the components that need the data





