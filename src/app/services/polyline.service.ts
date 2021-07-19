import { Injectable } from '@angular/core';
import { IPolyline } from '../interfaces/polyline';
@Injectable()
export class Polyline implements IPolyline {
  points: string = '';
  fill: string = 'lime';
  stroke: string = 'red';
  strokeWidth: string = '1';

  constructor() {
  }

  createPolygone(): SVGPolygonElement {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    polygon.setAttributeNS(null,'points', this.points);
    polygon.setAttribute('style', `fill:${this.fill};stroke:${this.stroke};stroke-width:${this.strokeWidth}`);
    return polygon;
  }
}
