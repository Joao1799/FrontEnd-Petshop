import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ServiceMainService } from '../../../../service-main.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColunaTabela, TbBaseComponent } from "../tb-base/tb-base.component";

@Component({
  selector: 'app-tb-pet',
  standalone: true,
  imports: [FormsModule, InputTextModule, ToastModule, TbBaseComponent],
  templateUrl: './tb-pet.component.html',
  styleUrl: './tb-pet.component.scss'
})
export class TbPetComponent {
  campoPesquisa: any;
  listaFiltrada: any;
  pets: any[] = [];
  colunasPet: ColunaTabela[] = [
    { fileira: 'name', coluna: 'Nome PET' },
    { fileira: 'breed', coluna: 'Raça' },
    { fileira: 'age', coluna: 'Idade' },
    { fileira: 'sexo', coluna: 'Sexo' },
    { fileira: 'peso', coluna: 'Peso' },
    { fileira: 'species', coluna: 'Espécie' },
    {
      fileira: '',
      coluna: 'Responsavel',
      mask: (_, row) => row.owner?.ownerName ?? '-'
    },
  ];
  


  constructor(
    private service: ServiceMainService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.listPets();
  }

  listPets() {
    this.service.getAllPets().subscribe({
      next: (pets) => {
        this.pets = pets;
        this.listaFiltrada = pets;

      },
      error: (error) => {

      }
    })
  }
  
  filtrarTabela() {
    const valueCampoPesquisa = this.campoPesquisa.toLowerCase().trim();
    this.listaFiltrada = this.pets.filter(pets =>
      pets.age?.toLowerCase().includes(valueCampoPesquisa) ||
      pets.breed?.toLowerCase().includes(valueCampoPesquisa) ||
      pets.id.toLowerCase().includes(valueCampoPesquisa) ||
      pets.name?.toLowerCase().includes(valueCampoPesquisa) ||
      pets.peso?.toLowerCase().includes(valueCampoPesquisa) ||
      pets.sexo?.toLowerCase().includes(valueCampoPesquisa) ||
      pets.species?.toLowerCase().includes(valueCampoPesquisa)
    )
  }

}
