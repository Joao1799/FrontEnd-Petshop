import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from '../../header/header.component';
import { ServiceMainService } from '../../../service-main.service';

@Component({
    selector: 'app-register-user',
    standalone: true,
    templateUrl: './register-user.component.html',
    styleUrl: './register-user.component.scss',
    imports: [ButtonModule,ToastModule, MenubarModule, CommonModule, ReactiveFormsModule, InputTextModule, MultiSelectModule, HeaderComponent]
})
export class RegisterUserComponent {
  items:  MenuItem[] | undefined;
  formUserRegister!: FormGroup;
  listAtendimentos: any = [
    { label: 'Banho e tosa' },
    { label: 'Vacinação' },
    { label: 'Consulta' },
    { label: 'Retorno' },
    { label: 'vazio' },
  ];

  constructor(private fb: FormBuilder, public serviceMainService: ServiceMainService,private messageService: MessageService){};

  ngOnInit() {
    this.formUserRegister = this.fb.group({
      ownerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log(this.formUserRegister.value);
  }

  registerUser() {
    console.log(this.formUserRegister.value);
    
    if (this.formUserRegister.valid) {
      this.serviceMainService.postRegisterUser(this.formUserRegister.value).subscribe((req) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cliente cadastrado' });
      });
    } else {
      console.log('Formulário inválido',this.formUserRegister.value);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha os campos corretamente!' });
    }
  }
}
