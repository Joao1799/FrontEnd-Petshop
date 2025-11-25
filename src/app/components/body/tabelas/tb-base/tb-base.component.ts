import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ServiceMainService } from '../../../../service-main.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tb-base',
  standalone: true,
  imports: [TableModule,ButtonModule,FormsModule,InputTextModule,ToastModule,CommonModule],
  templateUrl: './tb-base.component.html',
  styleUrl: './tb-base.component.scss'
})
export class TbBaseComponent {
  @Input() valorTabela: any[] = [];   //input é qm RECEBE do "pai"
  colunas: string[] = [];


    ngOnChanges() {
      console.log(this.valorTabela);
      
    if (this.valorTabela && this.valorTabela.length > 0) {
      // pega as chaves do primeiro objeto
      this.colunas = Object.keys(this.valorTabela[0]);
    }
  }
}
