import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ServiceMainService } from '../../service-main.service';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule,ToastModule,PasswordModule,FloatLabelModule, CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formUserlogin!: FormGroup;
  formUserRegistro!: FormGroup;
  isRegistro = false;
    
  @Output() liberarAcesso: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor( private router: Router, private fb: FormBuilder, public serviceMainService: ServiceMainService,private messageService: MessageService){};
  
    ngOnInit() {
      this.formLogin();
      this.formRegistro();
    }
  
    formLogin(){
      this.formUserlogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]],
      });
    }
  
    formRegistro(){
      this.formUserRegistro = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]],
        CPF: ['', [Validators.required]],
        name: ['', [Validators.required]],
        // cargo: ['', [Validators.required]],
      });
    }
  
    loginUserFunc() {
      if (this.formUserlogin.valid) {
        this.serviceMainService.postLoginUserFunc(this.formUserlogin.value).subscribe({
           next: (res) => {
            console.log(res.user)
            // SALVA o TOKEN
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuarioLogado', JSON.stringify(res.user));

            this.messageService.add({severity: 'success',summary: 'Success',detail: 'Login realizado com Sucesso'});
            this.router.navigate(['/home'])
          },
          error: (error) => {
            this.messageService.add({severity: 'error',summary: 'Error',detail: `${error.error.msg}`});
          } 
        });
      } 
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha os campos corretamente' });
      }
    }

    toggleForm() {
      this.isRegistro = !this.isRegistro;
    }

  registerUserFunc(): any {
    if (this.formUserRegistro.valid) {
      this.serviceMainService.postRegisterUserFunc(this.formUserRegistro.value).subscribe({
          next: (res) => {
            this.messageService.add({ severity: 'success', summary: 'Success',detail: 'Conta criada com Sucesso'});
            this.isRegistro = !this.isRegistro;
          },
          error: (error) => {
            console.log(error);
            
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.msg}`});
          }
        });
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Preencha os campos corretamente'});
    }
  }

}
