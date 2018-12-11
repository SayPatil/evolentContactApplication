import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ContactD } from './contact';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //private _url: string = "/assets/data/contact.json";
  private _url: string ="http://localhost:3000/contacts";
  
  constructor(private http:HttpClient) { }

  getContact(): Observable<ContactD[]>{
    return this.http.get<ContactD[]>(this._url)
                    .pipe(tap(data => JSON.stringify(data)) , catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

  getUserByName(id: number) {
    return this.http.get<ContactD>(this._url+ '/' + id);
  }  

  createUser(contact: ContactD) {
    return this.http.post(this._url, contact);
  } 
  
  updateContact(contact: ContactD) {
    return this.http.put(this._url + '/' + contact.id, contact);
  }
  deleteUser(id: number) {
    return this.http.delete(this._url + '/' + id);
  }


}
