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
var hero_service_1 = require("../Services/hero.service");
// instead of creating a new instance of the hero service with the new keyword,
// we Inject it
// if we created a new instance of the hero service, it would run its constructor,
// if we changed the constructor for the service, all locations that create an instance
// need to be changed. (Bad Design)
// instead we will add the service to the components providers metadata
// has a private property of the service class.
var HeroesComponent = (function () {
    // the HeroService injection site lets angular know to supply a HeroService when it creates HeroesComponent
    // We can inject a heroService because the heroService is Injectable
    // Now Angular knows to supply an instance of the HeroService when it creates an AppComponent
    // To teach the injector how to make a HeroService, we need to add HeroService to the Providers array
    function HeroesComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
    }
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroesHttp().then(function (heroes) { return _this.heroes = heroes; });
        // This is for asynchornus calls. The getHeroes method in the heroService returns a promise to return the Heroes.
        // When the hero is eventually returned and the promise is fullfilled, the .then() method will execute
        // if the promise is not fullfilled, .then().catch() can be used for error handling
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
        console.log(this.heroes);
    };
    HeroesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService
            .delete(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        });
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    core_1.Component({
        selector: 'my-heroes',
        templateUrl: './Templates/heroes.template.html',
        styleUrls: ['./StyleSheets/heroes.style.css'],
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        router_1.Router])
], HeroesComponent);
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map