"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var hero_search_service_1 = require("../Services/hero-search.service");
var HeroSearchComponent = (function () {
    function HeroSearchComponent(heroSearchService, router) {
        this.heroSearchService = heroSearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    /*
  
    A Subject is a producer of an observable event stream; searchTerms produces an Observable of strings, the filter criteria for the name search.
  
    Each call to search() puts a new string into this subject's observable stream by calling next()
  
    */
    // Push a search term into the observable stream.
    HeroSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
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
    HeroSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.heroSearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    /*
    
      catch intercepts a failed observable. The simple example prints
      the error to the console; a real life app would do better.
      Then to clear the search result, you return an observable
      containing an empty array.
    
    
    */
    HeroSearchComponent.prototype.gotoDetail = function (hero) {
        var link = ['/detail', hero.id];
        this.router.navigate(link);
    };
    return HeroSearchComponent;
}());
HeroSearchComponent = __decorate([
    core_1.Component({
        selector: 'hero-search',
        templateUrl: './Templates/hero-search.template.html',
        styleUrls: ['./StyleSheets/hero-search.style.css'],
        providers: [hero_search_service_1.HeroSearchService]
    }),
    __metadata("design:paramtypes", [hero_search_service_1.HeroSearchService,
        router_1.Router])
], HeroSearchComponent);
exports.HeroSearchComponent = HeroSearchComponent;
//# sourceMappingURL=hero-search.component.js.map