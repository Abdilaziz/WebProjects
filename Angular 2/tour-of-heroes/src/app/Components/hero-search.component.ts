import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../Services/hero-search.service';
import { Hero } from '../Config/hero';

@Component({
  selector: 'hero-search',
  templateUrl: './Templates/hero-search.template.html',
  styleUrls: [ './StyleSheets/hero-search.style.css' ],
  providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  /*

  A Subject is a producer of an observable event stream; searchTerms produces an Observable of strings, the filter criteria for the name search.

  Each call to search() puts a new string into this subject's observable stream by calling next()

  */

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  } 

/*

Instead of sending an HTTP request for every keystroke, (overload server with requests)
we instead chain Observable operators to reduce the request flow

debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string. 
You'll never make requests more frequently than 300ms.
distinctUntilChanged ensures that a request is sent only if the filter text changed.
switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged. 
It cancels and discards previous search observables, returning only the latest search service observable


switchMap() preserves the original request order while returning only the observable from the most recent http method call. Results from prior calls are canceled and discarded.

If the search text is empty, the http() method call is also short circuited and an observable containing an empty array is returned.

*/

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

/*

  catch intercepts a failed observable. The simple example prints 
  the error to the console; a real life app would do better. 
  Then to clear the search result, you return an observable 
  containing an empty array.


*/




  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
