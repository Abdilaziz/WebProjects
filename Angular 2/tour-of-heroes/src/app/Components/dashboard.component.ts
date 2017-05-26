import { Component, OnInit } from '@angular/core';

import { Hero } from '../Config/hero';
import { HeroService } from '../Services/hero.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './Templates/dashboard.template.html',
  styleUrls: ['./StyleSheets/dashboard.style.css']

})

export class DashboardComponent implements OnInit {

	heroes: Hero[] = []; // Initialize it

	constructor(private heroService: HeroService) { }

	ngOnInit(): void {												// 2nd, 3rd, 4th, and 5th hero
		this.heroService.getHeroesHttp().then(heroes => this.heroes = heroes.slice(1,5));
	}

}
