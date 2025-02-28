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
import { AutoCompleteModule } from 'primeng/autocomplete';

interface Pet {
  ownerName: string;
  id: string;
}

interface UserPet {
  id: any;
  ownerName: any;
  pets: Pet[];
}


@Component({
  selector: 'app-register-service',
  standalone: true,
  imports: [ButtonModule,AutoCompleteModule,ToastModule, MenubarModule, CommonModule, ReactiveFormsModule, InputTextModule, MultiSelectModule],
  templateUrl: './register-service.component.html',
  styleUrl: './register-service.component.scss'
})

export class RegisterServiceComponent {
  formUserService!: FormGroup;
  usuariosPet!: any[];
  idUsuario: any;
  nomesFiltrados!: { owner: any; ownerId: any; }[];
  usuarios: UserPet[] = [];
  filteredUsers!: any[];
  idPet: any;
  
  
  constructor(private fb: FormBuilder, public service: ServiceMainService){};
  

  ngOnInit(){
    this.forms();
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe((data=>{
      this.usuarios = data;
      this.usuariosPet = this.usuarios.filter(userPet => userPet.pets && userPet.pets.length > 0);
    }))
  }

  filterUsers(event: any) {
    const query = event.query.toLowerCase();
    this.filteredUsers = this.usuariosPet.filter(user => 
      user.ownerName && user.ownerName.toLowerCase().includes(query)
    );
  }


  onOwnerSelect(event: any) {
    const selectedUser = event.value;
    this.idUsuario = selectedUser.id;

    if (selectedUser.pets && selectedUser.pets.length > 0) {
      this.idPet = selectedUser.pets[0].id;
    }

    
    this.formUserService.patchValue({ 
      userId: this.idUsuario,
      petId: this.idPet
    });
    console.log(this.idPet);
  }

  forms(){
    this.formUserService = this.fb.group({
      tipo:['', Validators.required],
      dataHora:['', Validators.required],
      atendido:[false, Validators.required],
      userId:['', Validators.required],
      petId:['', Validators.required],
    })
  }

  registerService(){
    console.log(this.idPet);
    console.log(this.formUserService.value);
    if(this.formUserService.valid){
      
    }

  }

}

