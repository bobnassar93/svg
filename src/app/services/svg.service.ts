import { Injectable } from '@angular/core';
import { ICircle, IEllipse, IPolygon, IRectangle } from '../interfaces/svg-interfaces';
@Injectable({
  providedIn: 'root'
})
export class SVG implements IEllipse, ICircle, IPolygon, IRectangle {
  points: string = '';
  fill: string = 'lime';
  stroke: string = 'red';
  strokeWidth: string = '1';
  cx!: string;
  cy!: string;
  rx!: string;
  ry!: string;
  r!: string;
  width!: string;
  height!: string;

  constructor() {
  }


  createPolygone(): SVGPolygonElement {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttributeNS(null, 'points', this.points);
    polygon.setAttribute('style', `fill:${this.fill};stroke:${this.stroke};stroke-width:${this.strokeWidth}`);
    return polygon;
  }
}
