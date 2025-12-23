import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ServiceMainService } from '../../../../service-main.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { EventEmitter, Output } from '@angular/core';


export interface ColunaTabela {
  fileira: string;               
  coluna: string;              
  mask?: (valor: any, row?: any) => string; // transformação
}

@Component({
  selector: 'app-tb-base',
  standalone: true,
  imports: [TableModule,ButtonModule,FormsModule,InputTextModule,ToastModule,CommonModule, CheckboxModule],
  templateUrl: './tb-base.component.html',
  styleUrl: './tb-base.component.scss'
})
export class TbBaseComponent {
  @Input() cargo: any;   //input é qm RECEBE do "pai"
  @Input() valorTabela: any[] = [];   
  @Input() colunas: ColunaTabela[] = [];
  checked: boolean = false;
  @Output() statusCheckBox = new EventEmitter<any>(); //output é qm ENVIA pro "pai"


  constructor(){}

  getValue(linha: any, coluna: ColunaTabela): any {
    const valor = coluna.fileira.split('.')
    .reduce((objetoAtual, campo) => objetoAtual?.[campo], linha);

    if (coluna.mask) {
      return coluna.mask(valor, linha);
    }    
    return valor ?? '-';
  }

  onCheckboxChange(linha: any) {
    this.statusCheckBox.emit(linha);
  }
}
