import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isSideBarCollapsedEvent : EventEmitter<boolean> = new EventEmitter<boolean>();

  isNavbarCollapsed: boolean = true;
  isSideBarCollapsed : boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  collapseSidebar(){
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
    this.isSideBarCollapsedEvent.emit(this.isSideBarCollapsed);
  }

}
