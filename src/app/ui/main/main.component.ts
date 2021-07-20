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
  circle!: SVGCircleElement;
  ellipse!: SVGEllipseElement;
  addNew: boolean = true;
  svgElement: string = 'polygon';

  constructor(public svg: SVG) {
  }

  ngOnInit(): void {
    this.svg = new SVG();
  }

  createPreviewElement(event: MouseEvent): void {
    if (this.started === true) {
      if (this.svgElement === 'polygon') {
        this.svg.points = `${this.points.join(' ')}, ${event.offsetX},${event.offsetY}`;
        this.polygon.setAttributeNS(null, 'points', this.svg.points);
      } else if (this.svgElement === 'circle') {
        this.svg.r = Math.abs((event.offsetX - Number(this.svg.cx))).toString();
        this.circle.setAttributeNS(null, 'r', this.svg.r);
      } else if (this.svgElement === 'ellipse') {
        this.svg.rx = Math.abs((event.offsetX - Number(this.svg.cx))).toString();
        this.svg.ry = Math.abs((event.offsetY - Number(this.svg.cy))).toString();
        this.ellipse.setAttributeNS(null, 'rx', this.svg.rx);
        this.ellipse.setAttributeNS(null, 'ry', this.svg.ry);
        this.ellipse.setAttributeNS(null, 'transform', `rotate(${this.svg.rotate} ${this.svg.cx} ${this.svg.cy})`);
      }
    }
  }

  addNewPoints(event: MouseEvent): void {
    this.started = true;
    document.body.style.overflow = 'hidden';

    if (this.svgElement === 'polygon') {
      this.points.push(`${event.offsetX},${event.offsetY}`);

      this.svg.points = `${this.points.join(' ')}`;
    }

    if (this.addNew === true) {
      this.addNew = false;

      // Polygon
      if (this.svgElement === 'polygon') {

        this.polygon = this.svg.createPolygone();
        document.querySelector('#_svg')!.appendChild(this.polygon);
        this.polygon.setAttributeNS(null, 'points', this.svg.points);
      }
      // Circle
      else if (this.svgElement === 'circle') {
        this.svg.cx = event.offsetX.toString();
        this.svg.cy = event.offsetY.toString();
        this.circle = this.svg.createCircle();
        document.querySelector('#_svg')!.appendChild(this.circle);
      }
      // Ellipse
      else if (this.svgElement === 'ellipse') {
        this.svg.cx = event.offsetX.toString();
        this.svg.cy = event.offsetY.toString();
        this.ellipse = this.svg.createEllipse();
        document.querySelector('#_svg')!.appendChild(this.ellipse);
      }
    }
  }

  finishDrawingElement(): void {
    this.started = false;
    this.points = [];
    this.svg = new SVG();
    this.addNew = true;
    document.body.style.overflow = 'auto';
  }

  cancelDrawingElement(): void {
    this.finishDrawingElement();
    if (document.querySelector('#_svg')!.childNodes.length > 0) {
      document.querySelector('#_svg')!.removeChild(document.querySelector('#_svg')!.childNodes[document.querySelector('#_svg')!.childNodes.length - 1]);
    }
  }

  changeDrawingElement(): void {
    if(this.addNew === false){
      if (document.querySelector('#_svg')!.childNodes.length > 0) {
        document.querySelector('#_svg')!.removeChild(document.querySelector('#_svg')!.childNodes[document.querySelector('#_svg')!.childNodes.length - 1]);
      }
    }
    this.finishDrawingElement();
  }

  @HostListener('document:keydown', ['$event'])
  onBackKeyPress(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'backspace') {
      this.points.splice(this.points.length - 1, 1);
      this.svg.points = `${this.points.join(' ')}`;
      this.polygon.setAttributeNS(null, 'points', this.svg.points);
    } else if (event.key.toLowerCase() === 'escape') {
      this.cancelDrawingElement();
    }
  }

  @HostListener('document:wheel', ['$event'])
  onMouseWheelScroll(event: WheelEvent): void {
    if (this.started === true) {
      if (this.svgElement === 'polygon') {
        let fillOpacity = Number(this.polygon.getAttributeNS(null, 'fill-opacity'));
        if (Math.sign(event.deltaY) === -1) {
          if (fillOpacity < 1) {
            this.polygon.setAttributeNS(null, 'fill-opacity', (fillOpacity += .1).toFixed(1));
          }
        } else {
          if (fillOpacity > 0) {
            this.polygon.setAttributeNS(null, 'fill-opacity', (fillOpacity -= .1).toFixed(1));
          }
        }
      }
      else if (this.svgElement === 'circle') {
        let fillOpacity = Number(this.circle.getAttributeNS(null, 'fill-opacity'));
        if (Math.sign(event.deltaY) === -1) {
          if (fillOpacity < 1) {
            this.circle.setAttributeNS(null, 'fill-opacity', (fillOpacity += .1).toFixed(1));
          }
        } else {
          if (fillOpacity > 0) {
            this.circle.setAttributeNS(null, 'fill-opacity', (fillOpacity -= .1).toFixed(1));
          }
        }
      }
      else if (this.svgElement === 'ellipse') {
        let fillOpacity = Number(this.ellipse.getAttributeNS(null, 'fill-opacity'));
        if (Math.sign(event.deltaY) === -1) {
          if (event.altKey) {
            let rotate = Number(this.svg.rotate);
            if (event.shiftKey) {
              this.svg.rotate = (rotate -= 10).toString();
            } else {
              this.svg.rotate = (--rotate).toString();
            }
            this.ellipse.setAttributeNS(null, 'transform', `rotate(${this.svg.rotate} ${this.svg.cx} ${this.svg.cy})`);
          } else if (fillOpacity < 1) {
            this.ellipse.setAttributeNS(null, 'fill-opacity', (fillOpacity += .1).toFixed(1));
          }

        } else {
          if (event.altKey) {
            let rotate = Number(this.svg.rotate);
            if (event.shiftKey) {
              this.svg.rotate = (rotate += 10).toString();
            } else {
              this.svg.rotate = (++rotate).toString();
            }
            this.ellipse.setAttributeNS(null, 'transform', `rotate(${this.svg.rotate} ${this.svg.cx} ${this.svg.cy})`);
          } else if (fillOpacity > 0) {
            this.ellipse.setAttributeNS(null, 'fill-opacity', (fillOpacity -= .1).toFixed(1));
          }
        }
      }
    }
  }
}
