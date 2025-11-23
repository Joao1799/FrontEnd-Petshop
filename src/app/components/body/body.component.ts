import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { menuLateralrComponent } from "../menuLateral/menuLateral.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
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
    cargo: any = null;
    name!: string | null;
    email!: any;
    idUser!: any;
    listaCargos!: any[];
    cargoNome: any;
    formEdit: any;
    constructor(
        private router: Router,
        private auth: AuthService, 
        private messageService: MessageService,
        private service: ServiceMainService,
        private fb: FormBuilder
    ){};
    
    ngOnInit() {
        const user = this.getInfoUser();
        if (user) {
            this.setInfosUserStorage(user);
        }
    }

    getInfoUser() {
        const data = localStorage.getItem('usuarioLogado');
        const user = data ? JSON.parse(data) : null;
        return user;
    }

    showDialog() {
        this.visible = true;
        const user = this.getInfoUser();
        this.setInfosUserStorage(user);
        this.getInfoUserLogado();
    }

    setInfosUserStorage(user:any) {     
        console.log(user.cargo);
        this.cargoNome = user.cargo.nome
        this.cargo = user.cargo
        this.name = user.name
        this.email =user.email
        this.idUser = user.id
    }

    

    getInfoUserLogado(){
        this.service.getInfoUser(this.idUser).subscribe({
            next:(res) =>{
                console.log(res);           
            },
            error:(error)=>{
                this.messageService.add({
                severity: 'Error',
                summary: 'Erro',
                detail:`${error.error.msg}`
                });                                
            }
        })
    }

    formEditUserInfos(){
        this.formEdit = this.fb.group({
            name: [this.name,],
            email: [this.email, Validators.email],
        });

    }

    editarInfosUserLogado(){        
        this.service.putEditInfoUser(this.formEdit,this.idUser).subscribe({
            next:(res) =>{
                console.log(res);
                localStorage.setItem('usuarioLogado', JSON.stringify(res.data));            
            },
            error:(error)=>{
                this.messageService.add({
                severity: 'Error',
                summary: 'Erro',
                detail:`${error.error.msg}`
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

}
