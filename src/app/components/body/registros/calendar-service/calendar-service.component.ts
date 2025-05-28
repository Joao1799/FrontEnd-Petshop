import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import ptBrLocale from '@fullcalendar/core/locales/pt-br';


@Component({
  selector: 'app-calendar-service',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar-service.component.html',
  styleUrl: './calendar-service.component.scss'
})
export class CalendarServiceComponent {
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin], 
    locale: ptBrLocale, 
    events: [
      { title: 'Reunião', date: '2025-04-01', backgroundColor: '#e74c3c' },
      { title: 'Treinamento', date: '2025-05-28', backgroundColor: '#3498db' },
      { title: 'Almoço', date: '2025-04-15', backgroundColor: '#2ecc71' }
    ],
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      list: 'Lista'
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    }
  };
}
