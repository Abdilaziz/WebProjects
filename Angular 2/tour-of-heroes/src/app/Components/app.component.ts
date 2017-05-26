import { Component } from '@angular/core';


// This component handles the naviagation through routing
// It is called a Router Component

@Component({
	templateUrl: './Templates/app.template.html', 
	selector: 'my-app',
	styleUrls: ['./StyleSheets/app.style.css']
})

export class AppComponent {
	title = 'Tour of Heroes';

}