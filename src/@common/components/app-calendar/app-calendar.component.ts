import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking


@Component({
  selector: 'app-app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.scss']
})
export class AppCalendarComponent implements OnInit {

  @Input() calendarOptions: CalendarOptions;
  @Output() dateInit = new EventEmitter();

  @ViewChild('fullcalendar', { static: true }) fullcalendar!: FullCalendarComponent;

  // date = new Date()
  // d    = this.date.getDate()
  // m    = this.date.getMonth()
  // y    = this.date.getFullYear()

  // calendarOptions: CalendarOptions = {
  //   // plugins: [dayGridPlugin],
  //   headerToolbar: {
  //     left  : 'prev,next today',
  //     center: 'title',
  //     right : 'dayGridMonth'
  //     // right : 'dayGridMonth,timeGridWeek,timeGridDay'
  //   },
  //   themeSystem: 'bootstrap',
  //   // initialView: 'dayGridMonth',
  //   editable  : true,
  //   droppable : true,
  //   // weekends: false,
  //   height: 600,
  //   events: [
  //     {
  //       title          : 'All Day Event',
  //       start          : new Date(this.y, this.m, 1),
  //       backgroundColor: '#f56954', //red
  //       borderColor    : '#f56954', //red
  //       allDay         : true
  //     },
  //     {
  //       title          : 'Long Event',
  //       start          : new Date(this.y, this.m, this.d - 5),
  //       end            : new Date(this.y, this.m, this.d - 2),
  //       backgroundColor: '#f39c12', //yellow
  //       borderColor    : '#f39c12' //yellow
  //     },
  //     {
  //       title          : 'Meeting',
  //       start          : new Date(this.y, this.m, this.d, 10, 30),
  //       allDay         : false,
  //       backgroundColor: '#0073b7', //Blue
  //       borderColor    : '#0073b7' //Blue
  //     },
  //     {
  //       title          : 'Lunch',
  //       start          : new Date(this.y, this.m, this.d, 12, 0),
  //       end            : new Date(this.y, this.m, this.d, 14, 0),
  //       allDay         : false,
  //       backgroundColor: '#00c0ef', //Info (aqua)
  //       borderColor    : '#00c0ef' //Info (aqua)
  //     },
  //     {
  //       title          : 'Birthday Party',
  //       start          : new Date(this.y, this.m, this.d + 1, 19, 0),
  //       end            : new Date(this.y, this.m, this.d + 1, 22, 30),
  //       allDay         : false,
  //       backgroundColor: '#00a65a', //Success (green)
  //       borderColor    : '#00a65a' //Success (green)
  //     },
  //     {
  //       title          : 'Click for Google',
  //       start          : new Date(this.y, this.m, 28),
  //       end            : new Date(this.y, this.m, 29),
  //       url            : 'https://www.google.com/',
  //       backgroundColor: '#3c8dbc', //Primary (light-blue)
  //       borderColor    : '#3c8dbc' //Primary (light-blue)
  //     }
  //   ]
  // };

  constructor() { }

  ngAfterViewInit() {
    // Access FullCalendar API after the view has initialized
    // console.log('Current date on load:', this.fullcalendar.getApi()?.currentData);
    this.dateInit.emit(this.fullcalendar.getApi()?.currentData)
  }

  ngOnInit() {
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  // handleDateChange(event){
  //   this.dateInit.emit(event)
  // }

}
