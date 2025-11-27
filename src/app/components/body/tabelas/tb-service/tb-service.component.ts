import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ServiceMainService } from '../../../../service-main.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColunaTabela, TbBaseComponent } from "../tb-base/tb-base.component";

@Component({
  selector: 'app-tb-service',
  standalone: true,
  imports: [FormsModule, InputTextModule, ToastModule, TbBaseComponent],
  templateUrl: './tb-service.component.html',
  styleUrl: './tb-service.component.scss'
})
export class TbServiceComponent {
  campoPesquisa: any;
  listaFiltrada: any;
  services: any[] = [];
  colunasService: ColunaTabela[] = [
    {
      fileira: '',
      coluna: 'Responsavel',
      mask: (_, row) => row.user?.name ?? '-'
    },
    {
      fileira: '',
      coluna: 'PET',
      mask: (_, row) => row.pet?.name ?? '-'
    },
    {
      fileira: '',
      coluna: 'Funcionario',
      mask: (_, row) => row.pet?.name ?? '-'
    },
    { fileira: 'observacoes', coluna: 'Observacoes' },
    { fileira: 'motivo', coluna: 'Motivo' },
    { fileira: 'dataHora', coluna: 'Data' },
    { fileira: 'atendido', coluna: 'Status' },
  ];


  constructor(
    private service: ServiceMainService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.listServices();
  }

  listServices() {
    this.service.getallAtendimento().subscribe({
      next: (services) => {
        this.service = services;
        this.listaFiltrada = services;
      },
      error: (error) => {

      }
    })
  }

  filtrarTabela() {
    const valueCampoPesquisa = this.campoPesquisa.toLowerCase().trim();
    this.listaFiltrada = this.services.filter(service =>
      service.age?.toLowerCase().includes(valueCampoPesquisa) ||
      service.breed?.toLowerCase().includes(valueCampoPesquisa) ||
      service.id?.toLowerCase().includes(valueCampoPesquisa) ||
      service.name?.toLowerCase().includes(valueCampoPesquisa) ||
      service.peso?.toLowerCase().includes(valueCampoPesquisa) ||
      service.sexo?.toLowerCase().includes(valueCampoPesquisa) ||
      service.species?.toLowerCase().includes(valueCampoPesquisa)
    )
  }

}