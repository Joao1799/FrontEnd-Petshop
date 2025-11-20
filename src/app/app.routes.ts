import { Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { RegisterPetComponent } from './components/body/registros/register-pet/register-pet.component';
import { RegisterServiceComponent } from './components/body/registros/register-service/register-service.component';
import { RegisterUserComponent } from './components/body/registros/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { BodyComponent } from './components/body/body.component';
import { CalendarServiceComponent } from './components/body/registros/calendar-service/calendar-service.component';
import { AuthGuard } from './auth.guard';
import { TbClienteComponent } from './components/body/tabelas/tb-cliente/tb-cliente.component';
import { TbPetComponent } from './components/body/tabelas/tb-pet/tb-pet.component';
import { TbServiceComponent } from './components/body/tabelas/tb-service/tb-service.component';
import { TbAtendimentosComponent } from './components/body/tabelas/tb-atendimentos/tb-atendimentos.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

 // rotas estão aninhadas dentro do BodyComponent.
  { 
    path: '',component: BodyComponent,canActivate: [AuthGuard], 
    children: [
      { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
      { path: 'registrarUsuario', component: RegisterUserComponent,canActivate: [AuthGuard] },
      { path: 'registrarPet', component: RegisterPetComponent,canActivate: [AuthGuard] },
      { path: 'calendarService', component: CalendarServiceComponent,canActivate: [AuthGuard] },
      { path: 'registrarServico', component: RegisterServiceComponent,canActivate: [AuthGuard] },
      { path: 'tbCliente', component: TbClienteComponent,canActivate: [AuthGuard] },
      { path: 'tbPet', component: TbPetComponent,canActivate: [AuthGuard] },
      { path: 'tbService', component: TbServiceComponent,canActivate: [AuthGuard] },
      { path: 'tbAtendimentos', component: TbAtendimentosComponent,canActivate: [AuthGuard] },
    ]
  }
];