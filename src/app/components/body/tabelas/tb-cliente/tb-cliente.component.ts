import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ServiceMainService } from '../../../../service-main.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColunaTabela, TbBaseComponent } from "../tb-base/tb-base.component";


@Component({
  selector: 'app-tb-cliente',
  standalone: true,
  imports: [FormsModule, InputTextModule, ToastModule, TbBaseComponent],
  templateUrl: './tb-cliente.component.html',
  styleUrl: './tb-cliente.component.scss'
})
export class TbClienteComponent {
  campoPesquisa: any;
  listaFiltrada: any;
  users: any[] = [];

  colunasCliente: ColunaTabela[] = [
    { fileira: 'ownerName', coluna: 'Nome' },
    { fileira: 'email', coluna: 'E-mail' },
    {
      fileira: 'CPF',
      coluna: 'CPF',
      mask: v => v
        ? v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        : '-'
    },
    {
      fileira: 'telefone',
      coluna: 'Telefone',
      mask: v => v
        ? v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : '-'
    },
    {
      fileira: 'idade',
      coluna: 'Idade',
      mask: v => v ?? '—'
    },
    {
      fileira: '',
      coluna: 'Pets',
      mask: (_, row) => row.pets?.map((d: { name: any; }) => d.name)
    },
    {
      fileira: '',
      coluna: 'Qtd Pets',
      mask: (_, row) => row.pets?.length ?? 0
    },
  ];


  constructor(
    private service : ServiceMainService,
    private messageService: MessageService
  ){}

  ngOnInit(){
    this.listUsers();
  }

  listUsers(){
    this.service.getUsersClient().subscribe({
      next:(users)=>{
      this.users = users;
      this.listaFiltrada = users;
        
      },
      error:(error)=>{

      }
    })
  }

  filtrarTabela(){
    const valueCampoPesquisa = this.campoPesquisa.toLowerCase().trim();
    this.listaFiltrada = this.users.filter(user =>
      user.ownerName.toLowerCase().includes(valueCampoPesquisa) ||
      user.email.toLowerCase().includes(valueCampoPesquisa) ||
      user.telefone.toLowerCase().includes(valueCampoPesquisa)
    )
  }

  
  deleteUser(id: number) {
    console.log(id);
    
    this.service.deleteUSer(id).subscribe(
      (response) => {
        console.log('Usuário deletado com sucesso!', response);
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Usuário deletado com sucesso!' });
        this.listUsers();
      },
      (error) => {
        this.messageService.add({ severity: 'erro', summary: 'Error', detail: 'Erro ao deletar usuário!' });

        console.error('Erro ao deletar usuário:', error);
      }
    );
  }

}
