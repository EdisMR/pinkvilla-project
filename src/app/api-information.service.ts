import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInterface } from './data-interface';
@Injectable({
  providedIn: 'root'
})
export class ApiInformationService {

  apiDirection:string="https://www.pinkvilla.com/photo-gallery-feed-page/page/"

  /* Number of items */
  page=1;

  /* Keep received data */
  results:any=[];

  getInformation():Observable<any>{
    return this._http.get<any[]>(this.apiDirection+this.page)
  }

  /* Get image URL */
  returnImageDir(elm: string) {
    let result = `https://www.pinkvilla.com/${elm}`;
    return result;
  }

  constructor(private _http:HttpClient) {
  }
}
