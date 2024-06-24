import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private _http: HttpClient,
            private _profile: ProfileService
) { }

  generateHeadders(headers){
    if(headers.auth != "skip"){
      headers = {...headers,...{ "Authorization": this._profile.data.authToken}}
    }
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', ...headers })
    }
  }

  get(apiUrl, headers={}): Observable<any> {
    return this._http.get<any>(apiUrl, this.generateHeadders(headers));
  }

  post(apiUrl, body, headers={}): Observable<any> {
    return this._http.post<any>(apiUrl, body, this.generateHeadders(headers))
    .pipe(
      catchError(this.handleError)
    );
  }

  put(apiUrl, body, headers={}): Observable<any> {
    return this._http.put<any>(apiUrl, body, this.generateHeadders(headers));
  }

  delete(apiUrl, headers={}): Observable<any> {
    return this._http.delete<any>(apiUrl, this.generateHeadders(headers));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized access. Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have the necessary permissions.';
          break;
        case 404:
          errorMessage = `Not Found: The requested resource could not be found.`;
          break;
        case 500:
          errorMessage = 'Internal Server Error. Please try again later.';
          break;
        default:
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
          break;
      }
    }
    
    // Optionally log the error to the console
    console.error(errorMessage);

    // Return a user-facing error message
    return throwError(errorMessage);
  }

}
