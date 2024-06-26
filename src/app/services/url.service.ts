import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

constructor() { }

  generateUrl(functionName){
    switch (functionName) {
      case "login":
        return "http://localhost:3000/api/login"
        break;
      case "getMenu":
        return "http://localhost:3000/api/graph/organizations"
        break;
    
      default:
        return `http://localhost:3000/api/${functionName}`
        break;
    }
  }
}
