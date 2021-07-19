import { Component, HostListener, OnInit } from '@angular/core';
import { Polyline } from 'src/app/services/polyline.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  started: boolean = false;
  points: string[] = [];
  polygon!: SVGPolygonElement;
  addNew: boolean = true;

  constructor(public polyline: Polyline) { 
    polyline = new Polyline();
  }

  ngOnInit(): void {
  }

  createPreviewPolygon(event: MouseEvent): void {
    if (this.started === true){
      this.polyline.points = `${this.points.join(' ')}, ${event.clientX},${event.clientY}`;
     this.polygon.setAttributeNS(null,'points',this.polyline.points); 
    }
  }

  addNewPoints(event: MouseEvent): void {
    this.started = true;

    this.points.push(`${event.clientX},${event.clientY}`);

    this.polyline.points = `${this.points.join(' ')}`;
    if(this.addNew === true){
      this.addNew = false;
      this.polygon = this.polyline.createPolygone();
      document.querySelector('#_svg')!.appendChild(this.polygon);
      this.polygon.setAttributeNS(null,'points',this.polyline.points); 
    }
  }

  finishDrawingPolygon(): void{
    this.started = false;
    this.points = [];
    this.polyline = new Polyline();
    this.addNew = true;
  }

  @HostListener('document:keyup', ['$event'])
  onBackKeyPress(event: KeyboardEvent): void{
    if(event.key.toLowerCase() === 'backspace'){
      this.points.splice(this.points.length - 1, 1);
      this.polyline.points = `${this.points.join(' ')}`;
      this.polygon.setAttributeNS(null,'points',this.polyline.points);
    }
  }
}
