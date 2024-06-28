import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public profile
  public leftSidebarVisibility: boolean = true
  public range
  createMode = false

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

  fetchEvents(forUser,range){
    this.activeUser = forUser
    this._update.getPlugin("events",
    [{organizationId:this._profile.data.organizationId,userId:forUser}],
    {start:this._update.formatDate(range.start),end:this._update.formatDate(range.end),key:"start"})
    .subscribe(res=>{
      this.showEvent(res.data)
    })
  }

  showEvent(data){
    // data.forEach(el => {
      // el.display= "background"
      // if(el.type == "present"){
      //   el.color = "#34A853"
      // }
      // if(el.type == "leave"){
      //   el.color = "#FBBC05"
      // }
      // if(el.type == "absent"){
      //   el.color = "#EA4335"
      // }
      // delete el.type
    // });
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
    this.fetchEvents(this.activeUser,event)
  }

  initCalendar(event){
    this.range = event.dateProfile.activeRange
    this.fetchUsers()
    this.fetchEvents(this._profile.data._id,this.range)
  }

  attendance(){
    this._update.markAttendance()
    .subscribe(res=>{
      this._profile.updateProfile({'presentToday':true})
      this.fetchEvents(this._profile.data._id,this.range)
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

  createEvent(data){
    this.createMode = false;

    let newObj = {
      start: this._update.formatDate(data.start[0]),
      end: data?.end[0] ? this._update.formatDate(data?.end[0]) : this._update.formatDate(data.start[0]),
      title: data?.title,
      createdAt: new Date(),
      createdBy: this.profile._id,
      userId: this.activeUser,
      organizationId: this.profile.organizationId
    }

    this._update.createPlugin("events",newObj)
    .subscribe(res=>{
      this.fetchEvents(this._profile.data._id,this.range)
    })

  }

  onSearchClose(event){
    this.createMode = false;
  }

}
