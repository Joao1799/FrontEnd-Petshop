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
    
    @Output() liberarAcesso: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor( private router: Router, private fb: FormBuilder, public serviceMainService: ServiceMainService,private messageService: MessageService){};
  
    ngOnInit() {
      this.form();
    }
  
    form(){
      this.formUserlogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]],
      });
    }
  
    loginUserFunc() {
      if (this.formUserlogin.valid) {
        this.router.navigate(['home']);
        this.serviceMainService.loginUserFunc(this.formUserlogin.value).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login realizado com Sucesso' });
        console.log(res);
        this.liberarAcesso.emit(true);
        });
      } else {
        console.log('Formulário inválido',this.formUserlogin.value);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha inválidos' });
        this.router.navigate(['home']);

      }
    }

}
