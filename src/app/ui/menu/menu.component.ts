import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output()
  changeElementProperties = new EventEmitter<{ ev: Event, property: string }>();

  @Output()
  duplicateElement = new EventEmitter();

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

  changeElementPropertiesEmitter(ev: Event, property: string): void {
    this.changeElementProperties.emit({ ev, property });
  }

  duplicateElementEmitter(): void {
    this.duplicateElement.emit();
  }
}
