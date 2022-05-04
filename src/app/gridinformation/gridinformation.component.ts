import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiInformationService } from '../api-information.service';
@Component({
  selector: 'app-gridinformation',
  templateUrl: './gridinformation.component.html',
  styleUrls: ['./gridinformation.component.scss']
})

export class GridinformationComponent implements OnInit, AfterViewInit {
  data(): any[]{
    return this._apiSvc.results
  }
  subscriptionSvc!:Subscription;
  @ViewChildren('loading',{read:ElementRef})
  loading!:QueryList<ElementRef>;















  /* More Items */
  getMore(): void {
    this._apiSvc.page++;
    this.getItems()
  }


  /* Get image URL */
  returnImageDir(elm: string) {
    return this._apiSvc.returnImageDir(elm)
  }

  getItems():void{
    this.subscriptionSvc=this._apiSvc.getInformation()
    .subscribe((e) => {
      this._apiSvc.results=this._apiSvc.results.concat(e.nodes)
    })
  }








  observer!:IntersectionObserver;


  intersectionObserver(){
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting){
          /* timer 2 seconds */
          setTimeout(()=>{
            this.getMore()
          },2000)
        }
      })
    }, options);
  }

  ngAfterViewInit() {
      this.observer.observe(this.loading.first.nativeElement)
  }







  constructor(
    private _apiSvc: ApiInformationService,
    ) {
      this.intersectionObserver()
  }

  ngOnInit(): void {
  }
}
