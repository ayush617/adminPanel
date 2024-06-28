import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  public profile
  public leftSidebarVisibility: boolean = true
  public range

  date = new Date()
  d    = this.date.getDate()-5
  m    = this.date.getMonth()
  y    = this.date.getFullYear()

  calendarOptions: CalendarOptions 
  public users = []
  public activeUser = ""

  constructor(private _profile: ProfileService,
              private _update: UpdateService
  ) { }

  ngOnInit() {
    this.profile = this._profile.data;
    this.users.push({
      avatar: 'assets/img/avatar/avatar2.jpg',
      name: `${this._profile.data.firstName} (me)`,
      text: 'Cannot start service web: error while creating mount source path ',
      date: '5 mins ago',
      _id: this._profile.data._id
    });
  }

  fetchAttendance(forUser,range){
    this.activeUser = forUser
    this._update.getPlugin("attendance",
    [{organizationId:this._profile.data.organizationId,userId:forUser}],
    {start:this._update.formatDate(range.start),end:this._update.formatDate(range.end),key:"date"})
    .subscribe(res=>{
      this.showAttendance(res.data)
    })
  }

  showAttendance(data){
    data.forEach(el => {
      el.display= "background"
      if(el.type == "present"){
        el.color = "#34A853"
      }
      if(el.type == "leave"){
        el.color = "#FBBC05"
      }
      if(el.type == "absent"){
        el.color = "#EA4335"
      }
      delete el.type
    });
    this.calendarOptions = {
      // plugins: [dayGridPlugin],
      headerToolbar: {
        left  : 'prev,next today',
        center: 'title',
        right : 'dayGridMonth'
        // right : 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      themeSystem: 'bootstrap',
      // initialView: 'dayGridMonth',
      editable  : true,
      droppable : true,
      // weekends: false,
      height: 600,
      events: data,
      datesSet: this.dateChange.bind(this)
    };
  }

  dateChange(event){
    this.fetchAttendance(this.activeUser,event)
  }

  initCalendar(event){
    this.range = event.dateProfile.activeRange
    this.fetchUsers()
    this.fetchAttendance(this._profile.data._id,this.range)
  }

  attendance(){
    this._update.markAttendance()
    .subscribe(res=>{
      this._profile.updateProfile({'presentToday':true})
      this.fetchAttendance(this._profile.data._id,this.range)
    })
  }

  fetchUsers(){
    this._update.getPlugin("users",[{organizationId:this._profile.data.organizationId}])
    .subscribe(res=>{
      this.displayUsers(res.data)
    })
  }

  displayUsers(data){
    data.forEach(el => {
      if(el._id != this._profile.data._id){
        this.users.push({
          avatar: 'assets/img/avatar/avatar2.jpg',
          name: `${el.firstName}`,
          text: 'Cannot start service web: error while creating mount source path ',
          date: '5 mins ago',
          _id: el._id
          // active: true
        });
      }
    });
  }
  
  // [
  //   {
  //     start: '2024-06-18',
  //     // end: '2024-06-18',
  //     overlap: false,
  //     display: 'background',
  //     color: '#EA4335'
  //   },
  //   {
  //     start: '2024-06-16',
  //     // end: '2024-06-18',
  //     overlap: false,
  //     display: 'background',
  //     color: '#34A853'
  //   },
  //   {
  //     start: '2024-06-14',
  //     // end: '2024-06-18',
  //     overlap: false,
  //     display: 'background',
  //     color: '#FBBC05'
  //   }
    // {
    //   title          : 'Present',
    //   start          : new Date(this.y, this.m, 1),
    //   backgroundColor: '#34A853', //red
    //   borderColor    : '#34A853', //red
    //   allDay         : true
    // },
    // {
    //   title          : 'Absent',
    //   start          : new Date(this.y, this.m, 1),
    //   backgroundColor: '#EA4335', //red
    //   borderColor    : '#EA4335', //red
    //   allDay         : true
    // },
    // {
    //   title          : 'Leave',
    //   start          : new Date(this.y, this.m, 1),
    //   backgroundColor: '#FBBC05', //red
    //   borderColor    : '#FBBC05', //red
    //   allDay         : true
    // },
    // {
    //   title          : 'Long Event',
    //   start          : new Date(this.y, this.m, this.d - 5),
    //   end            : new Date(this.y, this.m, this.d - 2),
    //   backgroundColor: '#f39c12', //yellow
    //   borderColor    : '#f39c12' //yellow
    // },
    // {
    //   title          : 'Meeting',
    //   start          : new Date(this.y, this.m, this.d, 10, 30),
    //   allDay         : false,
    //   backgroundColor: '#0073b7', //Blue
    //   borderColor    : '#0073b7' //Blue
    // },
    // {
    //   title          : 'Lunch',
    //   start          : new Date(this.y, this.m, this.d, 12, 0),
    //   end            : new Date(this.y, this.m, this.d, 14, 0),
    //   allDay         : false,
    //   backgroundColor: '#00c0ef', //Info (aqua)
    //   borderColor    : '#00c0ef' //Info (aqua)
    // },
    // {
    //   title          : 'Birthday Party',
    //   start          : new Date(this.y, this.m, this.d + 1, 19, 0),
    //   end            : new Date(this.y, this.m, this.d + 1, 22, 30),
    //   allDay         : false,
    //   backgroundColor: '#00a65a', //Success (green)
    //   borderColor    : '#00a65a' //Success (green)
    // },
    // {
    //   title          : 'Click for Google',
    //   start          : new Date(this.y, this.m, 28),
    //   end            : new Date(this.y, this.m, 29),
    //   url            : 'https://www.google.com/',
    //   backgroundColor: '#3c8dbc', //Primary (light-blue)
    //   borderColor    : '#3c8dbc' //Primary (light-blue)
    // }
  // ]

}
