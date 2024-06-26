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
    const url = this._url.generateUrl(type)
    return this._api.get(url)
  }

  createManage(type,data){
    const url = this._url.generateUrl(type)
    return this._api.post(url,data)
  }

  
  getPlugin(type,search){
    const baseUrl = this._url.generateUrl(type)
    let jsonString = JSON.stringify(search);
    let encodedString = encodeURIComponent(jsonString);
    const url = `${baseUrl}?limit=-1&search=${encodedString}`
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


}
