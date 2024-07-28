import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  public profile
  public leftSidebarVisibility: boolean = true
  public range
  createMode = false

  date = new Date()
  d    = this.date.getDate()-5
  m    = this.date.getMonth()
  y    = this.date.getFullYear()

  public users = []
  public activeUser = ""

  constructor(private _profile: ProfileService,
              private _update: UpdateService
  ) { }

  ngOnInit() {
    this.profile = this._profile.data;
    this.fetchLeads()
    // this.users.push({
    //   avatar: 'assets/img/avatar/avatar2.jpg',
    //   name: `${this._profile.data.firstName} (me)`,
    //   text: 'Cannot start service web: error while creating mount source path ',
    //   date: '5 mins ago',
    //   _id: this._profile.data._id
    // });
  }



  attendance(){
    this._update.markAttendance()
    .subscribe(res=>{
      this._profile.updateProfile({'presentToday':true})
      // this.fetchEvents(this._profile.data._id,this.range)
    })
  }

  fetchLeads(){
    this._update.getPlugin("leads",[{organizationId:this._profile.data.organizationId}])
    .subscribe(res=>{
      // this.displayUsers(res.data)
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
      // this.fetchEvents(this._profile.data._id,this.range)
    })

  }

  onSearchClose(event){
    this.createMode = false;
  }

}
