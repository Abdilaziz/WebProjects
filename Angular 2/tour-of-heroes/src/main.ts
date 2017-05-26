import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/Modules/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
	.then(success => console.log('Bootstrap is Successful'))
	.catch(err => console.error(err));
