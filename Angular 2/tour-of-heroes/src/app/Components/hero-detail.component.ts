import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../Services/hero.service';

import { Hero } from '../Config/hero';



import  'rxjs/add/operator/switchMap';


@Component({
  	selector: 'hero-detail',
    templateUrl: './Templates/hero-detail.template.html',
    styleUrls: ['./StyleSheets/hero-detail.style.css']
})

// ngModel is the syntax to bind the hero.name property to the textbox (like the directive in Angular 1)
// to use it, FormsModule needs to be imported
// This is an example of 2 way binding (from the property to the textbox, and from the textbox back to the property)


export class HeroDetailComponent implements OnInit {

	@Input() hero: Hero; // Makes it an input property, this way we can bind data to it directly from the view

	constructor(private heroService: HeroService, 
				private route: ActivatedRoute,
				private location: Location) {}

	// The switchMap operator maps the id in the Observable route 
	// parameters to a new Observable, the result of the HeroService.getHero() method.

	// If a user re-navigates to this component while a getHero request is still processing, 
	// switchMap cancels the old request and then calls HeroService.getHero() again.


	// Use the subscribe method to detect id changes and to (re)set the retrieved Hero.


	// Angular calls the ngOnInit method shortly after creating an instance of the HeroDetailComponent so the hero will be retrieved in time to use it.
	ngOnInit(): void {
		this.route.params                             // the parameter is a string so the + operator converts it to a number
			.switchMap((params: Params) => this.heroService.getHeroHttp(+params['id']))
			.subscribe(hero => this.hero = hero);
	}

	// to go back to the previous page, we can use the browsers history stack using the Location Service (one step back from the stack)
	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.heroService.update(this.hero)
			.then(() => this.goBack());
	}

} // Always export the component class because you'll always import it elsewhere
