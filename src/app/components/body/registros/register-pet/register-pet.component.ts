import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { menuLateralrComponent } from '../../../menuLateral/menuLateral.component';
import { ServiceMainService } from '../../../../service-main.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutoComplete } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-register-pet',
  standalone: true,
  imports: [AutoCompleteModule,ButtonModule,ToastModule, MenubarModule, CommonModule,FormsModule, ReactiveFormsModule, InputTextModule, MultiSelectModule, menuLateralrComponent,FileUploadModule],
  templateUrl: './register-pet.component.html',
  styleUrl: './register-pet.component.scss'
})
export class RegisterPetComponent {
  formPetRegister!: FormGroup;
  usuarios!: any[];
  nomeUsuarios: string[] = [];
  nomesFiltrados!: any;
  selectedOwner: string = '';
  idUsuario: any;
  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder, public serviceMain: ServiceMainService,private messageService: MessageService){}

  ngOnInit(){
    this.formsPet();
    this.getUsers();
  }

  getUsers(){
    this.serviceMain.getUsersClient().subscribe((users =>{
      console.log(users);
      
      this.usuarios = users;
      this.nomeUsuarios = this.usuarios.map(usuario =>{
        return usuario.ownerName;
        })
      })
    ) 
  }

  filtroAC(event: any) {
    let aux = event.query.toLowerCase();
    this.nomesFiltrados = this.usuarios.filter(usuario =>
      usuario.ownerName.toLowerCase().includes(aux)).map(usuario => ({
      owner: usuario.ownerName,
      ownerId: usuario.id
    }));
    console.log(this.nomesFiltrados);
  }

  onOwnerSelect(event: any) {
    this.idUsuario = event.value.ownerId;  
    
    this.formPetRegister.patchValue({ 
      ownerId: this.idUsuario  
    });
  }

  formsPet(){
    this.formPetRegister = this.fb.group({
      name: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', Validators.required],
      species: ['', Validators.required],
      ownerId: ['', Validators.required],
    });
  }

  registerPet(){
    if(this.formPetRegister.valid){
      console.log(this.idUsuario);
      console.log(this.formPetRegister.value);
      
      this.serviceMain.postRegisterPet(this.formPetRegister.value).subscribe(req=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'PET cadastrado' });
      })
      
    }
  }

  
  onUpload(event:any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
