import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription, distinctUntilChanged, fromEvent } from 'rxjs';
import { ProfileService } from './profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('inOut', [
      transition('void => *', [style({ opacity: 0 }), animate('150ms',style({ opacity: 1 }))]),
      transition('* => void', [animate('150ms',style({ opacity: 0 }))])
    ]) 
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  logo = "PING-PONG 1337";
  public profile$ !: Observable<any>;
  private replay : any;
  notLogged : boolean = true;
  dropDown = false;

  
  @ViewChild('dropDownContent') dropDownContent !:ElementRef;
  @ViewChild('dropDownContent_') dropDownContent_ !:ElementRef;
  @ViewChild('dropDownContent__') dropDownContent__ !:ElementRef;
  
  constructor(public profileService : ProfileService, private route: Router) {}
  getcurrentPath()
  {
    return this.route.url;
  }
  onclick(){
    this.dropDown = !this.dropDown
  }
  ngOnInit(): void {
    this.profile$ = this.profileService.getUserData('');
    this.replay = this.profile$.subscribe({next: (data) => {
      if (data.statusCode)
        this.notLogged = true;
      else
        this.notLogged = false;

  },});
  }
  ngOnDestroy(): void {
    this.replay.unsubscribe()
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement !== this.dropDownContent?.nativeElement && clickedElement !== this.dropDownContent_?.nativeElement  && clickedElement !== this.dropDownContent__?.nativeElement ) {
      this.dropDown = false;
    }
  }

}