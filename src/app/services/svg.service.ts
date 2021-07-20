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
  r: string = '0';
  fillOpacity: string = '1';
  width!: string;
  height!: string;

  constructor() {
  }

  createPolygone(): SVGPolygonElement {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttributeNS(null, 'points', this.points);
    polygon.setAttribute('style', `fill:${this.fill};stroke:${this.stroke};stroke-width:${this.strokeWidth}`);
    polygon.setAttributeNS(null, 'fill-opacity', this.fillOpacity);
    return polygon;
  }

  createCircle(): SVGCircleElement {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttributeNS(null, 'cx', this.cx);
    circle.setAttributeNS(null, 'cy', this.cy);
    circle.setAttributeNS(null, 'r', this.r);
    circle.setAttributeNS(null, 'fill', this.fill);
    circle.setAttributeNS(null, 'stroke', this.stroke);
    circle.setAttributeNS(null, 'stroke-width', this.strokeWidth);
    circle.setAttributeNS(null, 'fill-opacity', this.fillOpacity);
    return circle;
  }
}
