import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ServiceMainService } from '../../../../service-main.service';
import { TbBaseComponent, ColunaTabela } from '../../tabelas/tb-base/tb-base.component';

@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [FormsModule, InputTextModule, ToastModule, TbBaseComponent],
  templateUrl: './cargos.component.html',
  styleUrl: './cargos.component.scss'
})
export class CargosComponent {
  campoPesquisa: any;
  listaFiltrada: any;
  cargo: any[] = [];
  colunasCargo: ColunaTabela[] = [
    { fileira: 'nome', coluna: 'Nome' },
    { fileira: 'id', coluna: 'ID' },
  ];
  teste: any;

  constructor(
    private service: ServiceMainService,
    private messageService: MessageService
  ) { }
  ngOnInit() {
    this.listCargo();
  }


  listCargo() {
    this.service.getListCargos().subscribe({
      next: (Cargo) => {
        this.cargo = Cargo;
        this.listaFiltrada = Cargo;
      },
      error: (error) => {

      }
    })
  }

  filtrarTabela() {
    const valueCampoPesquisa = this.campoPesquisa.toLowerCase().trim();
    this.listaFiltrada = this.cargo.filter(cargo =>
      // cargo.ativo.toLowerCase().includes(valueCampoPesquisa) ||
      cargo.nome.toLowerCase().includes(valueCampoPesquisa) ||
      cargo.id.toLowerCase().includes(valueCampoPesquisa)
    )
  }



  editarStatusCargo(cargo: any) {
    const payload = {
      status: cargo.status,
      id: cargo.id
    };

    this.service.putEditCargo(payload).subscribe({
      next: () => {

      },
      error: () => {
        cargo.status = !cargo.status;
      }
    });
  }

}
