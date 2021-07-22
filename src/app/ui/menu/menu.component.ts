import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output()
  changeElementFillColor = new EventEmitter<{ev: Event, property: string}>();

  @Input()
  type: string = '';
  @Input()
  rotation!: string;
  @Input()
  fillColor!: string;
  @Input()
  opacity!: string;
  @Input()
  strokeColor!: string;
  @Input()
  strokeWidth!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  changeElementFillColorEmitter(ev: Event, property: string): void{
    this.changeElementFillColor.emit({ev, property});
    console.log(this.type);
  }

}
