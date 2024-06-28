import {Component, OnDestroy, OnInit} from '@angular/core'
import {takeUntil} from 'rxjs/operators'
import {Subject} from "rxjs"
import {defaultRouterTransition, MenuType} from "../../../@common"
import {SettingsService} from "../../../@common"
import {AppMenuService} from "../../../@common"
import { UpdateService } from 'src/app/services/update.service'
import { ProfileService } from 'src/app/services/profile.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    defaultRouterTransition,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>()

  public mainSidebarOpts = {
    breakpoint: 'md',
    opened: true,
    hoverAble: true,
    mode: 'side',
    toggleableBtn: false,
    size: 'sideBar1',
  }
  public miniSidebarOpts = {}
  public settingsVisible: boolean = false
  public searchVisible: boolean = false
  public lockScreenVisible: boolean = false

  public customMenu: Array<MenuType> = []

  public creatorMenu: Array<MenuType> = [
    {
      groupName: 'DASHBOARDS',
      opened: true,
      children: [
        {
          name: 'Dashboard',
          url: '/home',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
        },
        {
          name: 'Platform analytics',
          url: '/home/analytics',
          prefix: {
            type: 'ibm-icon',
            name: 'activity',
          },
        },
        {
          name: 'Stocks / crypto',
          url: '/home/crypto',
          prefix: {
            type: 'ibm-icon',
            name: 'analytics',
          },
          suffix: {
            type: 'badge',
            level: 'default',
            text: '!',
          },
        },
      ],
    },
    {
      groupName: 'APPLICATIONS',
      opened: true,
      children: [
        {
          name: 'Scrum board',

          prefix: {
            type: 'ibm-icon',
            name: 'dashboardReference',
          },
          url: '/home/scrum-board',
        },
        {
          name: 'Tasks',
          prefix: {
            type: 'ibm-icon',
            name: 'task',
          },
          suffix: {
            type: 'badge',
            level: 'danger',
            text: 3,
          },
          url: '/home/tasks',
        },
        {
          name: 'File manager',
          prefix: {
            type: 'ibm-icon',
            name: 'folder',
          },
          url: '/home/file-manager',
        },
        {
          name: 'Mail',
          prefix: {
            type: 'ibm-icon',
            name: 'email',
          },
          suffix: {
            type: 'badge',
            level: 'success',
            text: 'NEW',
          },
          url: '/home/mail',
        },
        {
          name: 'Messages',
          prefix: {
            type: 'ibm-icon',
            name: 'sendAlt',
          },
          url: '/home/messages',
        }
      ]
    },
    {
      groupName: 'PAGES',
      opened: true,
      children: [
        {
          name: 'User',
          parentUrl: '/home/user',
          prefix: {
            type: 'ibm-icon',
            name: 'userAvatar',
          },
          children: [
            {
              name: 'Settings',
              url: '/home/user/settings',
            },
            {
              name: 'Billing',
              url: '/home/user/billing',
            },
            {
              name: 'Creditcard',
              url: '/home/user/creditcard',
            },
            {
              name: 'Transactions',
              url: '/home/user/transactions',
            },
          ]
        },
        {
          name: 'Web application',
          parentUrl: '/home/application',
          prefix: {
            type: 'ibm-icon',
            name: 'application',
          },
          children: [
            {
              name: 'Welcome',
              url: '/home/application/welcome',
            },
            {
              name: 'Getting started',
              url: '/home/application/getting-started',
            },
            {
              name: 'FAQ',
              url: '/home/application/faq',
            },
            {
              name: 'Documentation',
              url: '/home/application/manual',
            },
            {
              name: 'Support',
              url: '/home/application/support',
            },
            {
              name: 'Changelog',
              url: '/home/application/changelog',
            },
          ]
        },
        {
          name: 'Auth',
          prefix: {
            type: 'ibm-icon',
            name: 'userAdmin',
          },
          children: [
            {
              name: 'Sign In',
              children: [
                {
                  name: 'Style #1',
                  url: '/home/modern/signin'
                },
                {
                  name: 'Style #2',
                  url: '/home/full/signin'
                },
                {
                  name: 'Style #3',
                  url: '/home/full-middle/signin'
                },
                {
                  name: 'Style #4',
                  url: '/home/basic/signin'
                }
              ]
            },
            {
              name: 'Sign Up',
              children: [
                {
                  name: 'Style #1',
                  url: '/home/modern/signup'
                },
                {
                  name: 'Style #2',
                  url: '/home/full/signup'
                },
                {
                  name: 'Style #3',
                  url: '/home/full-middle/signup'
                },
                {
                  name: 'Style #4',
                  url: '/home/basic/signup'
                }
              ]
            },
            {
              name: 'Book a demo',
              url: '/home/book-a-demo',
              suffix: {
                type: 'badge',
                level: 'danger',
                text: 'HOT',
              },
            },
            {
              name: 'Confirmation',
              url: '/home/confirmation',
              children: [
                {
                  name: 'Style #1',
                  url: '/home/modern/confirmation'
                },
                {
                  name: 'Style #2',
                  url: '/home/full/confirmation'
                },
                {
                  name: 'Style #3',
                  url: '/home/full-middle/confirmation'
                },
                {
                  name: 'Style #4',
                  url: '/home/basic/confirmation'
                }
              ]
            },

            {
              name: 'Forgot password',
              children: [
                {
                  name: 'Style #1',
                  url: '/home/modern/forgot-password'
                },
                {
                  name: 'Style #2',
                  url: '/home/full/forgot-password'
                },
                {
                  name: 'Style #3',
                  url: '/home/full-middle/forgot-password'
                },
                {
                  name: 'Style #4',
                  url: '/home/basic/forgot-password'
                }
              ]
            },
            {
              name: 'Reset password',
              children: [
                {
                  name: 'Style #1',
                  url: '/home/modern/reset-password'
                },
                {
                  name: 'Style #2',
                  url: '/home/full/reset-password'
                },
                {
                  name: 'Style #3',
                  url: '/home/full-middle/reset-password'
                },
                {
                  name: 'Style #4',
                  url: '/home/basic/reset-password'
                }
              ]
            },
            {
              name: 'Lock screen',
              callback: 'lock',
            },
          ]
        },
        {
          name: 'Pricing',
          parentUrl: '/home/pricing',
          prefix: {
            type: 'ibm-icon',
            name: 'money',
          },
          children: [
            {
              name: 'Startup',
              url: '/home/pricing/modern',
            },
            {
              name: 'Corporate',
              url: '/home/pricing/table',
            },
            {
              name: 'Basic',
              url: '/home/pricing/simple',
            },
          ]
        },
        {
          name: 'Profile',
          prefix: {
            type: 'ibm-icon',
            name: 'faceActivated',
          },
          url: '/home/profile',
        },
        {
          name: 'Timeline',
          prefix: {
            type: 'ibm-icon',
            name: 'alarm',
          },
          url: '/home/timeline',
        },
        {
          name: 'Invoice',
          prefix: {
            type: 'ibm-icon',
            name: 'document',
          },
          url: '/home/invoice',
        },
        {
          name: 'Search result',
          prefix: {
            type: 'ibm-icon',
            name: 'imageSearch',
          },
          url: '/home/search-result',
        },
        {
          name: 'Coming soon',
          prefix: {
            type: 'ibm-icon',
            name: 'inProgress',

          },
          children: [
            {
              name: 'Style #1',
              url: '/home/coming-soon/modern'
            },
            {
              name: 'Style #2',
              url: '/home/coming-soon/full'
            },
            {
              name: 'Style #3',
              url: '/home/coming-soon/full-middle'
            },
            {
              name: 'Style #4',
              url: '/home/coming-soon/basic'
            }
          ]
        },
        {
          name: 'Maintenance',
          prefix: {
            type: 'ibm-icon',
            name: 'hourglass',
          },
          url: '/home/maintenance',
        },
        {
          name: 'Errors',
          prefix: {
            type: 'ibm-icon',
            name: 'error',
          },
          suffix: {
            type: 'badge',
            level: 'danger',
            text: 2,
          },
          children: [
            {
              name: '404',
              url: '/home/errors/404',
            },
            {
              name: '500',
              url: '/home/errors/500',
            },
          ]
        },
        {
          name: 'Starters',
          parentUrl: '/home/starters',
          prefix: {
            type: 'ibm-icon',
            name: '3dCursorAlt',
          },
          children: [
            {
              name: 'Full width',
              parentUrl: '/home/starters/full-width',
              children: [
                {
                  name: 'Basic',
                  url: '/home/starters/full-width/basic'
                },
                {
                  name: 'Header',
                  url: '/home/starters/full-width/header'
                },
                {
                  name: 'Tabs',
                  url: '/home/starters/full-width/tabs'
                }
              ]
            },
            {
              name: 'Left sidebar',
              parentUrl: '/home/starters/left-sidebar',
              children: [
                {
                  name: 'Basic',
                  url: '/home/starters/left-sidebar/basic'
                },
                {
                  name: 'Header',
                  url: '/home/starters/left-sidebar/header'
                },
                {
                  name: 'Tabs',
                  url: '/home/starters/left-sidebar/tabs'
                }
              ]
            },
            {
              name: 'Right sidebar',
              parentUrl: '/home/starters/right-sidebar',
              children: [
                {
                  name: 'Basic',
                  url: '/home/starters/right-sidebar/basic'
                },
                {
                  name: 'Header',
                  url: '/home/starters/right-sidebar/header'
                },
                {
                  name: 'Tabs',
                  url: '/home/starters/right-sidebar/tabs'
                }
              ]
            },
            {
              name: 'Application',
              parentUrl: '/home/starters/application',
              children: [
                {
                  name: 'Basic',
                  url: '/home/starters/application/basic'
                },
                {
                  name: 'Advanced',
                  url: '/home/starters/application/advanced'
                },
                {
                  name: 'Complex',
                  url: '/home/starters/application/complex'
                }
              ]
            },
          ]
        }
      ]
    },
    {
      groupName: 'Components',
      opened: true,
      children: [
        {
          name: 'UI components',
          url: '/home/ui-components',
          prefix: {
            type: 'ibm-icon',
            name: 'view',
          },
        },
        {
          name: 'Widgets',
          prefix: {
            type: 'ibm-icon',
            name: 'phraseSentiment',
          },
          parentUrl: '/home/widgets',
          children: [
            {
              name: 'General',
              url: '/home/widgets/general',
              suffix: {
                type: 'badge',
                level: 'default',
                text: '!',
              },
            },
            {
              name: 'Cards',
              url: '/home/widgets/cards',
            },
            {
              name: 'Lists',
              url: '/home/widgets/lists',
            },
          ]
        },
        {
          name: 'Tables',
          parentUrl: '/home/tables',
          prefix: {
            type: 'ibm-icon',
            name: 'tableSplit',
          },
          children: [
            {
              name: 'Basic',
              url: '/home/tables/basic',
            },
            {
              name: 'Advanced',
              url: '/home/tables/advanced',
            },
            {
              name: 'Full Datagrid',
              url: '/home/tables/full',
              suffix: {
                type: 'badge',
                level: 'danger',
                text: 'HOT',
              },
            },
          ]
        },
        {
          name: 'Forms',
          prefix: {
            type: 'ibm-icon',
            name: 'textCreation',
          },
          parentUrl: '/home/forms',
          children: [
            {
              name: 'General',
              url: '/home/forms/general',
            },
            {
              name: 'Advanced',
              url: '/home/forms/advanced',
            },
            {
              name: 'Validation & Layouts',
              url: '/home/forms/validation',
            },
            {
              name: 'Wizard',
              url: '/home/forms/wizard',
            },
          ]
        },
        {
          name: 'Charts',
          url: '/home/charts',
          prefix: {
            type: 'ibm-icon',
            name: 'chartColumn',
          },
        },
        {
          name: 'Icons',
          url: '/home/icons',
          prefix: {
            type: 'ibm-icon',
            name: 'magicWand',
          },
        },
        {
          name: 'Typography',
          url: '/home/typography',
          prefix: {
            type: 'ibm-icon',
            name: 'textTracking',
          },
        }
      ]
    },
    {
      groupName: 'Menu features',
      opened: true,
      children: [
        {
          name: 'Badge number',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
          suffix: {
            type: 'badge',
            level: 'danger',
            text: 2,
          },
        },
        {
          name: 'Badge text',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
          suffix: {
            type: 'badge',
            level: 'success',
            text: 'Updated',

          },
        },
        {
          name: 'Disabled Item',
          disabled: true,
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
        },
        {
          name: 'Disabled Group',
          disabled: true,
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
          children: []
        },
        {
          name: 'Disabled Subitem',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
          children: [
            {
              name: 'Disabled Item',
              disabled: true,
            }
          ]
        },
        {
          name: 'Looooong Menu item, with loooong menu item',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
        },
        {
          name: 'Menu item',
          subtitle: 'with subtitle',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
          children: [
            {
              name: 'Subitem',
            },
          ]
        },
        {
          name: 'Menu item',
          subtitle: 'with subtitle',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
        },
        {
          name: 'Menu item',
          subtitle: 'with long subtitle, with long subtitle, with log subtitle',
          prefix: {
            type: 'ibm-icon',
            name: 'home',
          },
        },
      ]
    },
    {
      groupName: 'iconless features ',
      opened: true,
      children: [
        {
          name: 'Iconless',
        },
        {
          name: 'Iconless badge',
          suffix: {
            type: 'badge',
            level: 'danger',
            text: 'Deleted',
          },
        },
        {
          name: 'Iconless sub',
          children: [
            {
              name: 'Sub item',
            }
          ]
        },
      ]
    }
  ]

  public menu: Array<MenuType> = []

  constructor(private settingsService: SettingsService,
              private appMenuService: AppMenuService,
              private _update: UpdateService,
              private _profile: ProfileService) {
    this._update.getMenu()
    .subscribe(res=>{
      this.menu = res.data[0]["data"];
      this.aditionalMenu()
    })
  }

  ngOnInit(): void {
    this.appMenuService
      .$callbackClick
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params === 'lock') {
          this.lockScreenVisible = true
        }
      })
    this._update.getAttendance()
    .subscribe(res=>{
      this._profile.updateProfile({'presentToday':res.data.length?true:false})
    })
  }

  aditionalMenu(){
    let children = [
      {
        "name": "Users",
        "url": "/manage/users",
        "prefix": {
          "type": "ibm-icon",
          "name": "user"
        }
      },
      {
        "name": "Plugins",
        "url": "/manage/plugins",
        "prefix": {
          "type": "ibm-icon",
          "name": "tools"
        }
      },
      {
        "name": "Tasks",
        "url": "/manage/tasks",
        "prefix": {
          "name": "task",
          "type": "ibm-icon"
        }
      },
      {
        "name": "Attendance",
        "url": "/manage/attendance",
        "prefix": {
          "name": "calendar",
          "type": "ibm-icon"
        }
      }
    ]

    if(this._profile.data.superAdmin){
      children.unshift({
        "name": "Organizations",
        "url": "/manage/organizations",
        "prefix": {
          "type": "ibm-icon",
          "name": "buildingInsights1"
        }
      });
    }


    if(this._profile.data.admin){
      this.menu.push({
        "groupName": "MANAGE",
        "opened": true,
        "children": children,
      })
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
  }

  onMiniSidebarItemClick(event) {
    if (event.key === 'theme') {
      this.settingsVisible = !this.settingsVisible
    }
    if (event.key === 'search') {
      this.searchVisible = true
    }
  }

  onToggleThemeSettings() {
    this.settingsVisible = true
  }

  onSideBarOpen(event) {
    this.mainSidebarOpts.opened = true
  }

  onSideBarToggle(event) {
    this.mainSidebarOpts.opened = !this.mainSidebarOpts.opened
  }

  onCloseSettings(event) {
    this.settingsVisible = false
  }

  onSearchClose(event) {
    this.searchVisible = false
  }

  onLockClose(event) {
    this.lockScreenVisible = false
  }

  onCloseSidebar() {
    this.mainSidebarOpts.opened = false
  }

  onVisibilityChange(event){
    this.mainSidebarOpts.opened=event
  }
}
