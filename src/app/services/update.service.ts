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
        { "$lookup": { "from": "menu", "localField": "menuId", "foreignField": "_id", "as": "menu" } },
        { "$unwind": "$menu" },
        {"$replaceRoot": {"newRoot": "$menu"} }
      ]
    }
    return this._api.post(url,form)
  }

}
