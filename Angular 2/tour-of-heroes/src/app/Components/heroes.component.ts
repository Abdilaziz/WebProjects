import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../Config/hero';
import { HeroService } from '../Services/hero.service';

// instead of creating a new instance of the hero service with the new keyword,
// we Inject it

// if we created a new instance of the hero service, it would run its constructor,
// if we changed the constructor for the service, all locations that create an instance
// need to be changed. (Bad Design)

// instead we will add the service to the components providers metadata
// has a private property of the service class.


@Component({
  selector: 'my-heroes',
  templateUrl: './Templates/heroes.template.html',
	styleUrls: ['./StyleSheets/heroes.style.css'],
})
	// Creates a fresh instance of HeroService when AppComponent is created. 
	// It lets AppComponent and its child components uuse the Service

export class HeroesComponent implements OnInit {
				heroes: Hero[];
				selectedHero: Hero;

				// the HeroService injection site lets angular know to supply a HeroService when it creates HeroesComponent
				// We can inject a heroService because the heroService is Injectable
				// Now Angular knows to supply an instance of the HeroService when it creates an AppComponent
				// To teach the injector how to make a HeroService, we need to add HeroService to the Providers array
				constructor(private heroService: HeroService,
							private router: Router) { }

				gotoDetail(): void {
					this.router.navigate(['/detail', this.selectedHero.id]);
				}

				onSelect(hero: Hero): void{
					this.selectedHero = hero;
				}

				getHeroes(): void{
					this.heroService.getHeroesHttp().then(heroes => this.heroes = heroes); 
					// This is for asynchornus calls. The getHeroes method in the heroService returns a promise to return the Heroes.
					// When the hero is eventually returned and the promise is fullfilled, the .then() method will execute
					// if the promise is not fullfilled, .then().catch() can be used for error handling
				}

				ngOnInit(): void {
    				this.getHeroes();
    				console.log(this.heroes)
  				}

  				add(name: string): void {
  					name = name.trim();
  					if (!name){return;}
  					this.heroService.create(name)
  						.then(hero => {
  							this.heroes.push(hero);
  							this.selectedHero = null;
  						});
				}

				delete(hero: Hero): void {
					this.heroService
						.delete(hero.id)
						.then(() => {
							this.heroes = this.heroes.filter(h => h !== hero);
							if (this.selectedHero === hero) { this.selectedHero = null; }
						});
				}
}




