import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { RegisterPetComponent } from './components/body/registros/register-pet/register-pet.component';
import { RegisterServiceComponent } from './components/body/registros/register-service/register-service.component';
import { RegisterUserComponent } from './components/body/registros/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { BodyComponent } from './components/body/body.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

 // rotas estão aninhadas dentro do BodyComponent.
  { 
    path: '',component: BodyComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'registrarUsuario', component: RegisterUserComponent },
      { path: 'registrarPet', component: RegisterPetComponent },
      { path: 'registrarServico', component: RegisterServiceComponent },
    ]
  }
];