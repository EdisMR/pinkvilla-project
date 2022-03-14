import { trigger, state, style, transition, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiInformationService } from '../api-information.service';
@Component({
  selector: 'app-gridinformation',
  templateUrl: './gridinformation.component.html',
  styleUrls: ['./gridinformation.component.scss'],
  animations:[
    trigger('itemsChanging', [
      // ...
      state('hidden', style({
        opacity: 0.3,
        transform: 'rotateY(90deg)'
      })),
      state('showed', style({
        opacity: 1,
        transform: 'rotateY(0deg)'
      })),
      transition('* => *', [
        animate('.5s')
      ]),
    ]),
  ]
})
export class GridinformationComponent implements OnInit {
  @HostListener('window:scroll')
  onWindowScroll(): void {
    /* console.log('-----------');
    console.log(window.pageYOffset);
    console.log(this.document.documentElement.scrollHeight);
    console.log(this.document.documentElement.scrollTop); */

    /* If scroll to bottom, show Button */
    if (
      window.pageYOffset >
      this.document.documentElement.scrollHeight - window.screen.height
      ) {
        this.buttonFunctionality=false
      }else{
        this.buttonFunctionality=true
    }
  }

  /* Keep the information */
  data!: any;

  /* If true, click to show more items */
  buttonFunctionality=true;

  /* Manage Animation */
  isChanging=false;


  /* More Items */
  getMore(): void {
    this.isChanging=true
    this._apiSvc.page++;
    this.subscriptionSvc.unsubscribe()
    this.getItems()
  }

  /* Last Items */
  getBack():void{
    if(this._apiSvc.page>0){
      this.isChanging=true
      this._apiSvc.page--;
      this.subscriptionSvc.unsubscribe()
      this.getItems()
    }
  }

  /* Get image URL */
  returnImageDir(elm: string) {
    let result = 'https://www.pinkvilla.com' + elm;
    return result;
  }

  getItems():void{
    this.document.documentElement.scrollTop=0
    this.subscriptionSvc=this._apiSvc.getInformation()
    .subscribe((e) => {
      this._apiSvc.results = e;
      this.data = this._apiSvc.results.nodes;
      this.isChanging=false
    })
  }

  subscriptionSvc!:Subscription;

  constructor(
    /* Get document DOM Information */
    @Inject(DOCUMENT) private document: Document,
    private _apiSvc: ApiInformationService
  ) {}

  ngOnInit(): void {
    this.getItems()
  }
}
