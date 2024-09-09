import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  base = "https://api.mini-coders.com/node/api"
  // base = "http://localhost:3000"
  constructor() { }

  generateUrl(functionName){
    switch (functionName) {
      case "login":
        return `${this.base}/login`
        break;
      case "getMenu":
        return `${this.base}/graph/organizations`
        break;
    
      default:
        return `${this.base}/${functionName}`
        break;
    }
  }
}
