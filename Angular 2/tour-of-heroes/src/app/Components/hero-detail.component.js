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
var common_1 = require("@angular/common");
var hero_service_1 = require("../Services/hero.service");
var hero_1 = require("../Config/hero");
require("rxjs/add/operator/switchMap");
var HeroDetailComponent = (function () {
    function HeroDetailComponent(heroService, route, location) {
        this.heroService = heroService;
        this.route = route;
        this.location = location;
    }
    // The switchMap operator maps the id in the Observable route 
    // parameters to a new Observable, the result of the HeroService.getHero() method.
    // If a user re-navigates to this component while a getHero request is still processing, 
    // switchMap cancels the old request and then calls HeroService.getHero() again.
    // Use the subscribe method to detect id changes and to (re)set the retrieved Hero.
    // Angular calls the ngOnInit method shortly after creating an instance of the HeroDetailComponent so the hero will be retrieved in time to use it.
    HeroDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params // the parameter is a string so the + operator converts it to a number
            .switchMap(function (params) { return _this.heroService.getHeroHttp(+params['id']); })
            .subscribe(function (hero) { return _this.hero = hero; });
    };
    // to go back to the previous page, we can use the browsers history stack using the Location Service (one step back from the stack)
    HeroDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    HeroDetailComponent.prototype.save = function () {
        var _this = this;
        this.heroService.update(this.hero)
            .then(function () { return _this.goBack(); });
    };
    return HeroDetailComponent;
}()); // Always export the component class because you'll always import it elsewhere
__decorate([
    core_1.Input(),
    __metadata("design:type", hero_1.Hero)
], HeroDetailComponent.prototype, "hero", void 0);
HeroDetailComponent = __decorate([
    core_1.Component({
        selector: 'hero-detail',
        templateUrl: './Templates/hero-detail.template.html',
        styleUrls: ['./StyleSheets/hero-detail.style.css']
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        router_1.ActivatedRoute,
        common_1.Location])
], HeroDetailComponent);
exports.HeroDetailComponent = HeroDetailComponent;
//# sourceMappingURL=hero-detail.component.js.map