import { Injectable } from '@angular/core';
import { ICircle, IEllipse, IPolygon, IRectangle } from '../interfaces/svg-interfaces';
@Injectable({
  providedIn: 'root'
})
export class SVG {
  polygon!: IPolygon;
  ellipse!: IEllipse;
  circle!: ICircle;
  rectangle!: IRectangle;

  constructor() {
  }

  createPolygone(fill: string, fillOpacity: string = '1', points: string,
    stroke: string, strokeWidth: string, type: string): IPolygon {
    this.polygon = {
      fill,
      fillOpacity,
      points,
      stroke,
      strokeWidth,
      type
    };
    return this.polygon;
  }

  createCircle(fill: string, fillOpacity: string = '1', cx: string, cy: string, r: string,
    stroke: string, strokeWidth: string, type: string): ICircle {
    this.circle = {
      cx,
      cy,
      fill,
      fillOpacity,
      r,
      stroke,
      strokeWidth,
      type
    }
    return this.circle;
  }

  createEllipse(fill: string, fillOpacity: string = '1', cx: string, cy: string, rx: string, ry: string,
    stroke: string, strokeWidth: string, type: string, rotate: string, transform: string): IEllipse {
    this.ellipse = {
      cx,
      cy,
      fill,
      fillOpacity,
      rotate,
      rx,
      ry,
      stroke,
      strokeWidth,
      type,
      transform
    }

    return this.ellipse;
  }
}
