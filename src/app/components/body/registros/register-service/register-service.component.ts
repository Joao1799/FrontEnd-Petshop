import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ServiceMainService } from '../../../../service-main.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNGConfig } from 'primeng/api';

interface Pet {
  id: string;
  name: string;
}

interface User {
  id: string;
  ownerName: string;
  pets: Pet[];
}


@Component({
  selector: 'app-register-service',
  standalone: true,
  imports: [ButtonModule,CalendarModule, AutoCompleteModule, ToastModule, MenubarModule, CommonModule, ReactiveFormsModule, InputTextModule, MultiSelectModule,FormsModule],
  templateUrl: './register-service.component.html',
  styleUrl: './register-service.component.scss'
})

export class RegisterServiceComponent {
  formUserService!: FormGroup;
  idUsuario: any;
  nomesFiltrados!: { owner: any; ownerId: any; }[];
  filteredUsers!: any[];
  idPet: any;
  ownersFiltrados!: { ownerId: any; ownerName: any; }[];
  petsFiltrados!: any[];
  usuarios: User[] = [];
  usuariosPet: User[] = [];
  ownerSelecionadoId: any;
  petsDoOwnerSelecionado: Pet[] = [];
  usuariosFunc: any;
  usuariosFuncFiltrados: any[] = [];
  date: Date | undefined;
  ptBr: any = {};


  constructor(
    private fb: FormBuilder,
    public service: ServiceMainService,
    private config: PrimeNGConfig,
    private messageService: MessageService
    ) { };


  ngOnInit() {
    this.forms();
    this.getUsers();
    this.getUsersFunc();
    this.translateCalendar();
  }

  translateCalendar() {
    this.config.setTranslation({
      dayNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
      dayNamesShort: ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
      dayNamesMin: ["D","S","T","Q","Q","S","S"],

      monthNames: [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
      ],
      monthNamesShort: [
        "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"
      ],
      today: 'Hoje',
      clear: 'Limpar'
    });
  }

  getUsers() {
    this.service.getUsersClient().subscribe((data => {
      this.usuarios = data;
      this.usuariosPet = this.usuarios.filter(userPet => userPet.pets && userPet.pets.length > 0);
    }))
  }

  getUsersFunc() {
    this.service.getUsersFunc().subscribe((data => {
      this.usuariosFunc = data;
      // this.usuariosPet = this.usuarios.filter(userPet => userPet.pets && userPet.pets.length > 0);
    }))
  }

  filterUserFunc(event: any) {
    const query = event.query.toLowerCase();
    this.usuariosFuncFiltrados = this.usuariosFunc
      .filter((u: { name: string; }) => u.name?.toLowerCase().includes(query))
      .map((u: { id: any; name: any; }) => ({
        id: u.id,
        name: u.name
      }));
  }


  filterOwners(event: any) {
    const query = event.query.toLowerCase();
    this.ownersFiltrados = this.usuarios
      .filter(u => u.ownerName?.toLowerCase().includes(query))
      .map(u => ({
        ownerId: u.id,
        ownerName: u.ownerName
      }));
  }

  filterPets(event: any) {
    const query = event.query.toLowerCase();
    this.petsFiltrados = this.petsDoOwnerSelecionado
      .filter(p => p.name?.toLowerCase().includes(query))
      .map(p => ({
        id: p.id,
        name: p.name
      }));
  }

  onOwnerSelect(event: any) {
    this.ownerSelecionadoId = event.value.ownerId;
    const user = this.usuarios.find(u => u.id === this.ownerSelecionadoId);
    this.petsDoOwnerSelecionado = user?.pets ?? []; 
    this.petsFiltrados = [];
        console.log(this.petsDoOwnerSelecionado);
        
    if(this.petsDoOwnerSelecionado.length === 0){
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usúario não possui PET cadastrado' });
    }
        
    this.formUserService.patchValue({
      userId: this.ownerSelecionadoId,
      petId: null
    });
  }

  onPetSelect(event: any) {
    this.formUserService.patchValue({
      petId: event.value.id
    });
  }

  onUserFuncSelect(event: any) {
    this.formUserService.patchValue({
      funcionarioId: event.value.id
    });
  }

  onOwnerClear() {
  this.ownerSelecionadoId = null;
  this.petsDoOwnerSelecionado = [];
  this.petsFiltrados = [];

  this.formUserService.patchValue({
    userId: null,
    petId: null
  });
}

  forms() {
    this.formUserService = this.fb.group({
      motivo: ['', Validators.required],
      dataHora: ['', Validators.required],
      observacoes: ['', Validators.required],
      userId: ['', Validators.required],
      petId: ['', Validators.required],
      funcionarioId: ['', Validators.required],
    });
  }

  registerService() {
    console.log(this.formUserService.value);
    
    if (this.formUserService.valid) {
      console.log('Dados do formulário:', this.formUserService.value);
      this.service.postCreateAtendimentos(this.formUserService.value).subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({severity: 'success',summary: 'Success',detail: 'Serviço cadastrado com sucesso!'});
          this.formUserService.reset();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err + 'Erro ao registrar serviço.' });
        },
      })
    } else {
      console.warn('Formulário inválido');
      this.formUserService.markAllAsTouched();
    }
  }

}

