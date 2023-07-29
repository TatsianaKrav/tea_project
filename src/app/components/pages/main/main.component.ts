import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('modal')
  private modal!: ElementRef;

  private observable: Observable<ElementRef>;
  private subscription: Subscription | null = null;
  public isShown: boolean = false;

  constructor() {
    this.observable = new Observable((observer) => {
      const timeout = setTimeout(() => {
        observer.next(this.modal);
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    });
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }


  ngOnInit() {
    this.subscription = this.observable.subscribe((param) => {
     param.nativeElement.style.display = 'block';
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
