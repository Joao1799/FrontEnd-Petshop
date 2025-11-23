import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth.interceptor';
import { MessageService } from 'primeng/api';


setTimeout(()=> {
  (document.getElementById('loading-screen') as HTMLElement).style.display = 'none';
  (document.querySelector('app-root') as HTMLElement).style.display = 'block';

  bootstrapApplication(AppComponent, {
    ...appConfig,  
    providers: [
      ...(appConfig.providers ?? []),
      MessageService,
      provideHttpClient(
        withInterceptors([authInterceptor])
      )
    ]
  }).catch(err => console.error(err));

}, 1000);
