import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../services/update.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'carbon-components-angular';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  public settingsVisible: boolean = false

  constructor(private route: ActivatedRoute,
              private _update: UpdateService,
              private _fb: FormBuilder,
              private notificationService: NotificationService,
              private _profile: ProfileService) { 
              this.fieldForm = this._fb.group({
                fieldType: "",
                fieldKey: ""
              });
              }

  type
  columnDefs
  rowData
  uniqueKeys
  formGroup
  visibleData
  fieldForm: FormGroup;
  keys: string[] = []; 

  fields = [
    { content: "Text Field", id: "text" },
    { content: "Dropdown Field", id: "dropdown" },
    { content: "Toggle Field", id: "toggle" }
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      this.fetchData(this.type)
    });
  }

  fetchData(type){
    this._update.getManage(type).subscribe(res=>{
      this.visibleData = res.data
      this.tranasformData(res.data)
    })
  }

  tranasformData(data){
    const keys = new Set();

    data.forEach(obj => {
      Object.keys(obj).forEach(key => keys.add(key));
    });

    this.uniqueKeys = Array.from(keys);

    let index = this.uniqueKeys.findIndex(item => item === "passwordHash");
    if (index !== -1) {
      this.uniqueKeys[index] = "password";
    }

    if(!this._profile.data.superAdmin){
      index = this.uniqueKeys.findIndex(item => item === "superAdmin");
      this.uniqueKeys.splice(index, 1);
  
      index = this.uniqueKeys.findIndex(item => item === "organizationId");
      this.uniqueKeys.splice(index, 1);
    }


    this.columnDefs = this.uniqueKeys.map((key:any) => {
      if (key === '_id') {
        return {
          headerName: 'Id',
          field: '_id',
          cellClass: 'cell-flex-middle overflow-hidden',
          // cellRenderer: companyCellRenderer,
          // width: 350,
          pinned: true,
          checkboxSelection: true,
          headerCheckboxSelection: true,
        };
      } else if(key === 'password') {
        return {
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          field: "passwordHash",
          headerClass: 'cell-flex-right',
          cellClass: 'cell-flex-middle cell-flex-right'
        };
      } else {
        return {
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          field: key,
          headerClass: 'cell-flex-right',
          cellClass: 'cell-flex-middle cell-flex-right'
        };
      }
    });

    this.rowData = data;

    this.createForm(this.uniqueKeys)
  }

  onCloseSettings(event) {
    this.settingsVisible = false
  }

  createForm(keys){
    const form = {};
    keys.forEach(key => {
      form[key] = [''];
    });
    this.keys = [...keys];
    this.formGroup = this._fb.group(form);
  }

  submitForm(){
    let formData = this.formGroup.value;
    if(formData._id == ""){
      delete formData._id
    }
    if(!this._profile.data.superAdmin){
      formData = {...formData,...{organizationId:this._profile.data.organizationId}}
    }
    this._update.createManage(this.type,formData).subscribe(res=>{
      this.visibleData.push(res.data)
      this.tranasformData(this.visibleData)
      this.onCloseSettings("")
      this.notificationService.showToast({
        type: "success",
        title: res.message,
        target: "#notificationHolder",
        duration: 2000,
      })
    })
  }

  addField() {
  const newKey = this.fieldForm.value['fieldKey'];
  if (newKey && !this.formGroup.contains(newKey)) {
    this.formGroup.addControl(newKey, this._fb.control(''));
    this.keys.push(newKey);
  }
  this.fieldForm.reset();
}

}
