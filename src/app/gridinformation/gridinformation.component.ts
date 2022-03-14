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
        opacity: 0.05,
        transform:"scale(0.5)"
      })),
      state('showed', style({
        opacity: 1,
        transform:"scale(1)"
      })),
      transition('hidden => showed', [
        animate('.5s')
      ]),
      transition('showed => hidden', [
        animate('0.1s')
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

    if (
      window.pageYOffset >
      this.document.documentElement.scrollHeight - window.screen.height
      ) {
        this.buttonFunctionality=false
      }else{
        this.buttonFunctionality=true
    }
  }
  data!: any;

  buttonFunctionality=true;

  isChanging=false;

  getMore(): void {
    this.isChanging=true
    this._apiSvc.page++;
    this.subscriptionSvc.unsubscribe()
    this.getItems()
  }

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
    @Inject(DOCUMENT) private document: Document,
    private _apiSvc: ApiInformationService
  ) {}

  ngOnInit(): void {
    this.getItems()
  }
}
