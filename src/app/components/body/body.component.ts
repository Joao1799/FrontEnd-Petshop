import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { menuLateralrComponent } from "../menuLateral/menuLateral.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ServiceMainService } from '../../service-main.service';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';


@Component({
    selector: 'app-body',
    standalone: true,
    templateUrl: './body.component.html',
    styleUrl: './body.component.scss',
    imports: [CommonModule,ToastModule,ButtonModule,InputTextModule,RouterOutlet, menuLateralrComponent,DialogModule,FormsModule,DropdownModule]
})
export class BodyComponent {
    visible: boolean = false;
    isBrowser: boolean = false;
    infosUsuarioLogado!: any | null;
    cargo!: string | null;
    name!: string | null;
    email!: any;
    idUser!: any;
    listaCargos!: any[];

    constructor(
        private router: Router,
        private auth: AuthService, 
        private messageService: MessageService,
        private service: ServiceMainService
    ){};
    
    ngOnInit() {
        this.isBrowser = typeof window !== 'undefined';
        this.setInfosUserStorage();
        this.getInfoUser();
    }

    getInfoUser() {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
    }

    setInfosUserStorage() {     
    this.infosUsuarioLogado = this.getInfoUser();
    console.log(this.infosUsuarioLogado.cargo);
    
    this.cargo = this.infosUsuarioLogado.cargo.nome
    this.name = this.infosUsuarioLogado.name
    this.email = this.infosUsuarioLogado.email
    this.idUser = this.infosUsuarioLogado.id
    }

    getInfoUserLogado(){
        this.service.getInfoUser(this.idUser).subscribe({
            next:(res) =>{
                console.log(res);
                this.messageService.add({
                severity: 'success',
                summary: 'Logout',
                detail: 'Sessão encerrada com sucesso'
                });                
            },
            error:(error)=>{
                this.messageService.add({
                severity: 'Error',
                summary: 'Erro',
                detail:`"Error inesperado!" ${error.error.msg}`
                });                                
            }
        })
    }

    editarInfosUserLogado(){
        console.log(this.idUser);
        
        let body ={
            name: this.name,
            email: this.email,
            cargo: this.cargo
        }
        this.service.putEditInfoUser(body,this.idUser).subscribe({
            next:(res) =>{
                console.log(res);
                
                localStorage.setItem('usuarioLogado', JSON.stringify(res.data));

                console.log(localStorage.getItem('usuarioLogado'));
                
                this.getInfoUser();
                this.messageService.add({
                severity: 'success',
                summary: 'Logout',
                detail: 'Sessão encerrada com sucesso'
                });                
            },
            error:(error)=>{
                this.messageService.add({
                severity: 'Error',
                summary: 'Erro',
                detail:`"Error inesperado!" ${error.error.msg}`
                });                                
            }
        })
    }


    listCargos(){
        this.service.getListCargos().subscribe({
            next:(res) =>{
                this.listaCargos = res                         
            },
            error:(error)=>{
                this.messageService.add({
                severity: 'Error',
                summary: 'Erro',
                detail:`"Error inesperado!" ${error.error.msg}`
                });                                
            }
        })
    }


    logout() {;
    this.auth.logout();               // tira o token
    this.router.navigate(['/login']); // redireciona

    this.messageService.add({
      severity: 'success',
      summary: 'Logout',
      detail: 'Sessão encerrada com sucesso'
    });
  }

    showDialog() {
        if (this.isBrowser) { 
            this.visible = true;
            this.getInfoUserLogado();
            this.listCargos();
        }
    }
}
