import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { UpdateService } from 'src/app/services/update.service';
import { from } from 'rxjs'

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {

  public channels = [
    {
      icon: 'hashtag',
      name: 'office-all',
      read: false,
    },
    {
      icon: 'hashtag',
      name: 'frontend-team',
      read: false,
    },
    {
      icon: 'hashtag',
      name: 'backend-team',
      read: false,
    },
    {
      icon: 'hashtag',
      name: 'deploy-info',
      read: false,
    },
    {
      icon: 'locked',
      name: 'production-errors',
      read: false,
    },
    {
      icon: 'locked',
      name: 'devops-reactions',
      read: false,
    },
    {
      icon: 'hashtag',
      name: 'developers',
      read: false,
    },
    {
      icon: 'hashtag',
      name: 'general',
      read: false,
    }
  ]
  public messages = []
  messagesOld = [
    {
      name: 'jonny cluster',
      avatar: {
        type: 'img',
        src: 'assets/img/avatar/avatar2.jpg',
      },
      active: false,
      read: false,
      status: 'app-symbol--status-success',
    },
    {
      name: 'b.peterson',
      avatar: {
        type: 'symbol',
        src: 'P',
        color: 'app-bg-info-lt-50',
      },
      active: false,
      read: false,
    },
    {
      name: 'b.peterson, timberl.c',
      avatar: {
        type: 'symbol',
        src: '2',
        color: 'app-bg-info-lt-30',
      },
      active: false,
      read: false,
    },
    {
      name: 'Harindra Kendal',
      avatar: {
        type: 'img',
        src: 'assets/img/avatar/avatar3.jpg',
      },
      active: false,
      read: true,
      status: 'app-symbol--status-success',
    },
    {
      name: 'Thomas Jeffy',
      avatar: {
        type: 'symbol',
        src: 'J',
        color: 'app-bg-info-lt-50',
      },
      active: false,
      read: true,
    },
    {
      name: 'timberl.c, Jona Thonk',
      avatar: {
        type: 'symbol',
        src: '2',
        color: 'app-bg-info-lt-30',
      },
      active: false,
      read: false,
    },
    {
      name: 'timberl.c',
      avatar: {
        type: 'symbol',
        src: 'C',
        color: 'app-bg-info-lt-50',
      },
      active: false,
      read: true,
      status: 'app-symbol--status-success',
    },
    {
      name: 'adam.csd',
      avatar: {
        type: 'img',
        src: 'assets/img/avatar/avatar3.jpg',
      },
      active: false,
      read: true,
      status: 'app-symbol--status-success',
    },
    {
      name: 'Jona Thonk',
      avatar: {
        type: 'symbol',
        src: 'T',
        color: 'app-bg-info-lt-50',
      },
      active: false,
      read: true,
    }
  ]
  public selectedItem: any = null

  public selectedChannel = []
  selectedChannelOld = [
    {
      separator: true,
      time: 'Tuesday, October 27th'
    },
    {
      user: {
        name: 'Thomas Jeffy',
        avatar: {
          type: 'symbol',
          src: 'J',
          color: 'app-bg-info-lt-50',
        },
      },
      rows: [
        {
          time: '1:42 PM',
          content: 'While arbitrary HTML with only a regex is impossible, it\'s sometimes appropriate to use them for parsing a limited, known set of HTML.',
        },
        {
          time: '1:44 PM',
          content: 'If you have a small set of HTML pages that you want to scrape data from and then stuff into a database, regexes might work fine..',
        },
      ]
    },
    {
      separator: true,
      time: 'Wednesday, October 28th'
    },
    {
      user: {
        name: 'jonny cluster',
        avatar: {
          type: 'img',
          src: 'assets/img/avatar/avatar2.jpg',
        },
        active: false,
        status: 'app-symbol--status-success',
      },
      rows: [
        {
          time: '6:55 PM',
          content: 'You can\'t parse [X]HTML with regex.',
        },
        {
          time: '6:56 PM',
          content: 'Because HTML can\'t be parsed by regex. Regex is not a tool that can be used to correctly parse HTML.',
        },
        {
          time: '6:56 PM',
          content: 'As I have answered in HTML-and-regex questions here so many times before, the use of regex will not allow you to consume HTML.',
        },
        {
          time: '6:57 PM',
          content: 'Regular expressions are a tool that is insufficiently sophisticated to understand the constructs employed by HTML',
        },
        {
          time: '6:58 PM',
          content: 'HTML is not a regular language and hence cannot be parsed by regular expressions',
        },
        {
          time: '6:59 PM',
          content: 'Regex queries are not equipped to break down HTML into its meaningful parts. so many times but it is not getting to me. Even enhanced irregular regular expressions as used by Perl are not up to the task of parsing HTML.You will never make me crack. HTML is a language of sufficient complexity that it cannot be parsed by regular expressions.',
        },
      ]
    },
    {
      user: {
        name: 'adam.csd',
        avatar: {
          type: 'img',
          src: 'assets/img/avatar/avatar3.jpg',
        },
        active: true,
      },
      rows: [
        {
          time: '8:10 PM',
          content: 'Don\'t listen to these guys.',
        },
        {
          time: '8:11 PM',
          content: ' You totally can parse context-free grammars with regex if you break the task into smaller pieces.',
        },
        {
          time: '8:13 PM',
          content: 'You can generate the correct pattern with a script that does each of these in order.',
        },
        {
          time: '8:15 PM',
          content: 'I haven\'t quite finished the last part myself, but I know I\'m getting close. It keeps throwing CthulhuRlyehWgahnaglFhtagnExceptions for some reason, so I\'m going to port it to VB 6 and use On Error Resume Next.',
        },
      ]
    },
    {
      separator: true,
      time: 'Today'
    },
    {
      user: {
        name: 'b.peterson',
        avatar: {
          type: 'symbol',
          src: 'P',
          color: 'app-bg-success-lt-50',
        },
        active: false,
        status: 'app-symbol--status-success',
      },
      rows: [
        {
          time: '8:40 PM',
          content: 'There are people that will tell you that the Earth is round (or perhaps that the Earth is an oblate spheroid if they want to use strange words). They are lying.',
        },
        {
          time: '8:41 PM',
          content: ' There are people that will tell you that Regular Expressions shouldn\'t be recursive. They are limiting you. They need to subjugate you, and they do it by keeping you in ignorance.',
        },
        {
          time: '8:42 PM',
          content: 'You can live in their reality or take the red pill.',
        },
        {
          time: '8:43 PM',
          content: 'Yes, I think there were an Old One or two protecting them, but they were watching football on the TV, so it wasn\'t difficult.',
        },
      ]
    },
  ]

  public leftSidebarVisibility: boolean = true
  public fromUser:any = ""
  message = ""
  formGroup

  constructor(public _profile: ProfileService,
              private _update: UpdateService,
              private _fb: FormBuilder,){
  }

  ngOnInit(): void {
    const form = {
      search: ['']
    }
    this.formGroup = this._fb.group(form);

    this.selectedItem = this.channels[0]
    this.messages.push({
      _id: this._profile.data._id,
      name: `${this._profile.data.firstName} (me)`,
      avatar: {
        type: 'img',
        src: 'assets/img/avatar/avatar2.jpg',
      },
      active: true,
      read: false,
      status: 'app-symbol--status-success',
    })
    this.fetchUsers()
    this.fetchMessages(this.messages[0])
  }

  onSelect(item) {
    this.selectedItem = item
  }

  onToggleLeftSidebar() {
    this.leftSidebarVisibility = !this.leftSidebarVisibility
  }


  fetchMessages(data){
    this.fromUser = data
    this._update.getPlugin("messages",
    [{organizationId:this._profile.data.organizationId}],
    null,
    [{"from":this._profile.data._id,"to":this.fromUser?._id},{"from":this.fromUser?._id,"to":this._profile.data._id}],
    {sortKey:"sentAt", sortType:"1"},
    [{"$lookup":{"from":"users","localField":"from","foreignField":"_id","as":"fromUser"}},{"$lookup":{"from":"users","localField":"to","foreignField":"_id","as":"toUser"}},{ "$addFields": { "fromUser": { "$toString": { "$arrayElemAt": ["$fromUser.firstName", 0] } } } },{ "$addFields": { "toUser": { "$toString": { "$arrayElemAt": ["$toUser.firstName", 0] } } } }])
    .subscribe(res=>{
      this.showMessages(res.data)
    })
  }

  // showMessages(data){
  //   // this.showEvent(res.data)
  //   console.log(data,"==========")
  // }

  fetchUsers(){
    this._update.getPlugin("users",[{organizationId:this._profile.data.organizationId}])
    .subscribe(res=>{
      this.displayUsers(res.data)
    })
  }

  displayUsers(data){
    data.forEach(el => {
      if(el._id != this._profile.data._id){
        this.messages.push( {
          name: el.firstName,
          avatar: {
            type: 'img',
            src: 'assets/img/avatar/avatar3.jpg',
          },
          active: false,
          read: true,
          _id: el._id,
          // status: 'app-symbol--status-success',
        });
      }
    });
  }

  showMessages(data,reset=true,lastProfile="") {
    reset ? this.selectedChannel = [] : '';
    // let lastProfile = ""
    let date = new Date()
    let insertedToday = false
    data.forEach(el => {
      let dateToCheck = new Date(el.sentAt)
      // if(!insertedToday && dateToCheck.getUTCFullYear() === date.getUTCFullYear() &&
      //     dateToCheck.getUTCMonth() === date.getUTCMonth() &&
      //     dateToCheck.getUTCDate() === date.getUTCDate()){
      //   this.selectedChannel.push({
      //     separator: true,
      //     time: 'Today'
      //   })
      //   insertedToday = true
      // }
      if(lastProfile == el.from ){
        this.selectedChannel[this.selectedChannel.length-1].rows.push({
          content: el.message,
        }) 
      }else {
        if(el.from == this._profile.data._id){
          this.selectedChannel.push({
            user: {
              name: `${this._profile.data.firstName} (me)`,
              avatar: {
                type: 'img',
                src: 'assets/img/avatar/avatar2.jpg',
              },
              active: false,
              status: 'app-symbol--status-success',
            },
            rows: [
              {
                // time: '6:55 PM',
                content: el.message,
              }
            ]
          })
        } else {
          this.selectedChannel.push({
            user: {
              name: el.fromUser,
              avatar: {
                type: 'img',
                src: 'assets/img/avatar/avatar3.jpg',
              },
              active: false,
              // status: 'app-symbol--status-success',
            },
            rows: [
              {
                // time: '6:55 PM',
                content: el.message,
              }
            ]
          })
        }
      }
      lastProfile = el.from
    });
  }

  
  sendMessage(){
    let newObj = {
      "to": this.fromUser._id,
      "from": this._profile.data._id,
      "sentAt": new Date(),
      "organizationId": this._profile.data.organizationId,
      "message": this.formGroup.value.search
    }
    this._update.createPlugin("messages",newObj)
    .subscribe(res=>{
      this.showMessages([newObj],false,this._profile.data._id)
      this.formGroup.reset()
    })
  }

}
