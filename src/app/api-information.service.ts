import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiInformationService {

  apiDirection:string="https://www.pinkvilla.com/photo-gallery-feed-page/page/"

  /* Number of items */
  page=1;

  /* Keep received data */
  results!:any;

  getInformation(){
    return this._http.get(this.apiDirection+this.page)
  }



  constructor(private _http:HttpClient) {
  }
}
