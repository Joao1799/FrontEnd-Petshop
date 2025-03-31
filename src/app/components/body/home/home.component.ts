import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { ServiceMainService } from '../../../service-main.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [],
  imports: [
    TableModule,
    CommonModule,
    RippleModule,
    ButtonModule,
    MenubarModule,
    ToastModule,
    InputTextModule,
    FormsModule,
    ChartModule
  ],
})
export class HomeComponent {
  users: any[] = []; // Inicializa como array vazio
  listaFiltrada: any[] = []; // Lista que será usada na tabela
  pets: any;
  items: MenuItem[] | undefined;
  campoPesquisa: string = '';
  options:any ;
  data :any ;


  constructor(
    private router: Router,
    public serviceMainService: ServiceMainService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsers();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Clientes',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [65, 59, 80, 81, 56, 55, 10]
            },
            {
                label: 'Serviços',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    
    this.options = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    };
  }

  filtrarTabela(){
    const valueCampoPesquisa = this.campoPesquisa.toLowerCase().trim();

    this.listaFiltrada = this.users.filter(user =>
      user.ownerName.toLowerCase().includes(valueCampoPesquisa) ||
      user.email.toLowerCase().includes(valueCampoPesquisa) ||
      user.telefone.toLowerCase().includes(valueCampoPesquisa)
    )
  }

  getUsers() {
    this.serviceMainService.getUsers().subscribe((users: any[]) => {
      this.users = users;
      this.listaFiltrada = users;
      console.log(this.users);
    });
  }

  deleteUser(id: number) {
    console.log(id);
    
    this.serviceMainService.deleteUSer(id).subscribe(
      (response) => {
        console.log('Usuário deletado com sucesso!', response);
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Usuário deletado com sucesso!' });
        this.getUsers();
      },
      (error) => {
        this.messageService.add({ severity: 'erro', summary: 'Error', detail: 'Erro ao deletar usuário!' });

        console.error('Erro ao deletar usuário:', error);
      }
    );
  }
}
