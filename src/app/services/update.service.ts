import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {UrlService} from "./url.service";
import { url } from 'inspector';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private _api: ApiService,
              private _url: UrlService,
              private _profile: ProfileService
  ) { }

  login(form){
    const url = this._url.generateUrl("login")
    return this._api.post(url,form,{auth:'skip'})
  }

  getMenu(){
    const url = this._url.generateUrl("getMenu")
    let form = {
      "aggregationPipeline": [
        { "$match": { "_id": this._profile.data.organizationId } },
        { "$lookup": { "from": "menus", "localField": "menuId", "foreignField": "_id", "as": "menus" } },
        { "$unwind": "$menus" },
        {"$replaceRoot": {"newRoot": "$menus"} }
      ]
    }
    return this._api.post(url,form)
  }

  getManage(type){
    let url = this._url.generateUrl(type)
    if(!this._profile.data.superAdmin){
      let search = [{organizationId:this._profile.data.organizationId}]
      let jsonString = JSON.stringify(search);
      let encodedString = encodeURIComponent(jsonString);
      url = `${url}?search=${encodedString}`
    }
    return this._api.get(url)
  }

  createManage(type,data){
    const url = this._url.generateUrl(type)
    return this._api.post(url,data)
  }

  
  getPlugin(type,search,date=null,searchOr=null,sort=null,customLookup=null){
    const baseUrl = this._url.generateUrl(type)
    let url = `${baseUrl}?limit=-1`
    // this._profile.data.superAdmin ? '' : search = {...search,...{organizationId:this._profile.data.organizationId}}
    if(search){
      let jsonString = JSON.stringify(search);
      let encodedString = encodeURIComponent(jsonString);
      url = `${url}&search=${encodedString}`
    }
    if(searchOr){
      let jsonString = JSON.stringify(searchOr);
      let encodedString = encodeURIComponent(jsonString);
      url = `${url}&searchOr=${encodedString}`
    }
    if(date){
      url = `${url}&startDate=${date["start"]}&endDate=${date["end"]}&dateKey=${date["key"]}`
    }
    if(sort && sort.sortKey && sort.sortType){
      url = `${url}&sortKey=${sort.sortKey}&sortType=${sort.sortType}`
    }
    if(customLookup){
      let jsonString = JSON.stringify(customLookup);
      let encodedString = encodeURIComponent(jsonString);
      url = `${url}&customLookup=${encodedString}`
    }
    return this._api.get(url)
  }

  updatePlugin(type,updateId,body){
    const baseUrl = this._url.generateUrl(type)
    const url = `${baseUrl}/${updateId}`
    return this._api.put(url,body)
  }

  createPlugin(type,body){
    const baseUrl = this._url.generateUrl(type)
    return this._api.post(baseUrl,body)
  }

  deletePlugin(type,id){
    const baseUrl = this._url.generateUrl(type)
    const url = `${baseUrl}/${id}`
    return this._api.delete(url)
  }

  markAttendance(){
    let obj = {
      "userId": this._profile.data._id,
      "organizationId": this._profile.data.organizationId,
      "date": this.formatDate(""),
      "type": "present",
      "createdBy": this._profile.data._id,
      "createdAt": new Date()
    }
    return this.createPlugin("attendance",obj)
  }

  getAttendance(){
    return this.getPlugin("attendance",
    [{organizationId:this._profile.data.organizationId,userId:this._profile.data._id}],
    {start:this.formatDate(""),end:this.formatDate(""),key:"date"})
  }

  formatDate(dateString){
    const date = dateString ? new Date(dateString) : new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
