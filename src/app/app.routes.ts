import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { RegisterPetComponent } from './components/body/registros/register-pet/register-pet.component';
import { RegisterServiceComponent } from './components/body/registros/register-service/register-service.component';
import { RegisterUserComponent } from './components/body/registros/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { BodyComponent } from './components/body/body.component';
import { CalendarServiceComponent } from './components/body/registros/calendar-service/calendar-service.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

 // rotas estão aninhadas dentro do BodyComponent.
  { 
    path: '',component: BodyComponent, 
    children: [
      { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
      { path: 'registrarUsuario', component: RegisterUserComponent,canActivate: [AuthGuard] },
      { path: 'registrarPet', component: RegisterPetComponent,canActivate: [AuthGuard] },
      { path: 'calendarService', component: CalendarServiceComponent,canActivate: [AuthGuard] },
      { path: 'registrarServico', component: RegisterServiceComponent,canActivate: [AuthGuard] },
    ]
  }
];