import { Component, HostListener, OnInit } from '@angular/core';
import { SVG } from 'src/app/services/svg.service';


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

  constructor(public svg: SVG) { 
    svg = new SVG();
  }

  ngOnInit(): void {
  }

  createPreviewPolygon(event: MouseEvent): void {
    if (this.started === true){
      this.svg.points = `${this.points.join(' ')}, ${event.clientX},${event.clientY}`;
     this.polygon.setAttributeNS(null,'points',this.svg.points); 
    }
  }

  addNewPoints(event: MouseEvent): void {
    this.started = true;

    this.points.push(`${event.clientX},${event.clientY}`);

    this.svg.points = `${this.points.join(' ')}`;

    if(this.addNew === true){
      this.addNew = false;
      this.polygon = this.svg.createPolygone();
      document.querySelector('#_svg')!.appendChild(this.polygon);
      this.polygon.setAttributeNS(null,'points',this.svg.points); 
    }
  }

  finishDrawingPolygon(): void{
    this.started = false;
    this.points = [];
    this.svg = new SVG();
    this.addNew = true;
  }

  @HostListener('document:keyup', ['$event'])
  onBackKeyPress(event: KeyboardEvent): void{
    if(event.key.toLowerCase() === 'backspace'){
      this.points.splice(this.points.length - 1, 1);
      this.svg.points = `${this.points.join(' ')}`;
      this.polygon.setAttributeNS(null,'points',this.svg.points);
    }
  }
}
