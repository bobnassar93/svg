import { Component, HostListener, OnInit } from '@angular/core';
import { ICircle, IEllipse, IPolygon, IRectangle } from 'src/app/interfaces/svg-interfaces';
import { SVG } from 'src/app/services/svg.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userStartedDrawing: boolean = false;
  points: string[] = [];
  svgElement!: SVGPolygonElement | SVGCircleElement | SVGEllipseElement;
  isAddingNew: boolean = true;
  svgElementType: string = 'polygon';
  showMenu: boolean = false;
  elementBeingEdited!: any;
  svgElements: (any)[] = [];

  constructor(public svg: SVG) {
  }

  ngOnInit(): void {
  }

  createPreviewElement(event: MouseEvent): void {
    if (this.userStartedDrawing === true) {
      // polygon
      if (this.svgElementType === 'polygon') {

        this.svg.polygon.points = `${this.points.join(' ')}, ${event.offsetX},${event.offsetY}`;
        this.svgElements[this.svgElements.length - 1] = this.svg.polygon;
      }
      // circle
      else if (this.svgElementType === 'circle') {
        this.svg.circle.r = Math.abs((event.offsetX - Number(this.svg.circle.cx))).toString();
        this.svgElements[this.svgElements.length - 1] = this.svg.circle;
      }
      // ellipse
      else if (this.svgElementType === 'ellipse') {
        this.svg.ellipse.rx = Math.abs((event.offsetX - Number(this.svg.ellipse.cx))).toString();
        this.svg.ellipse.ry = Math.abs((event.offsetY - Number(this.svg.ellipse.cy))).toString();
        this.svg.ellipse.transform = `rotate(${this.svg.ellipse.rotate} ${this.svg.ellipse.cx} ${this.svg.ellipse.cy})`;
        this.svgElements[this.svgElements.length - 1] = this.svg.ellipse;
      }
    }
  }

  addNewPoints(event: MouseEvent): void {
    if (this.showMenu) {
      this.showMenu = false;
      return;
    }
    this.userStartedDrawing = true;
    document.body.style.overflow = 'hidden';

    if (this.svgElementType === 'polygon') {
      this.points.push(`${event.offsetX},${event.offsetY}`);
      this.svg.polygon = this.svg.createPolygone('lime', '1', `${this.points.join(' ')}, ${event.offsetX},${event.offsetY}`, 'red', '1', 'polygon');
    } else if (this.svgElementType === 'circle') {
      this.svg.circle = this.svg.createCircle('lime', '1', event.offsetX.toString(), event.offsetY.toString(), '1', 'red', '1', 'circle');
    } else if (this.svgElementType === 'ellipse') {
      this.svg.ellipse = this.svg.createEllipse('lime', '1', event.offsetX.toString(), event.offsetY.toString(), '1', '1', 'red', '1', 'ellipse', '0', '');
    }

    if (this.isAddingNew === true) {
      this.isAddingNew = false;

      // Polygon
      if (this.svgElementType === 'polygon') {

        this.svgElements.push(this.svg.polygon);
      }
      // Circle
      else if (this.svgElementType === 'circle') {
        this.svgElements.push(this.svg.circle);
      }
      // Ellipse
      else if (this.svgElementType === 'ellipse') {
        this.svgElements.push(this.svg.ellipse);
      }
    }
  }

  finishDrawingElement(): void {
    this.userStartedDrawing = false;
    this.points = [];
    this.svg = new SVG();
    this.isAddingNew = true;
    document.body.style.overflow = 'auto';
  }

  cancelDrawingElement(): void {
    this.finishDrawingElement();
    this.svgElements.pop();
  }

  changeDrawingElement(): void {
    if (this.isAddingNew === false) {
      this.svgElements.pop();
    }
    this.finishDrawingElement();
  }

  @HostListener('document:keydown', ['$event'])
  onBackKeyPress(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'backspace') {
      if (this.svgElementType === 'polygon') {
        if (this.points.length === 0) {
          this.cancelDrawingElement();
          return;
        }

        this.points.splice(this.points.length - 1, 1);
        this.svg.polygon.points = `${this.points.join(' ')}`;
        this.svgElements[this.svgElements.length - 1] = this.svg.polygon;
      }
    } else if (event.key.toLowerCase() === 'escape') {
      this.cancelDrawingElement();
    }
  }

  @HostListener('document:wheel', ['$event'])
  onMouseWheelScroll(event: WheelEvent): void {
    if (this.userStartedDrawing === true) {
      if (this.svgElementType === 'polygon') {
        let fillOpacity = Number(this.svg.polygon.fillOpacity);
        if (Math.sign(event.deltaY) === -1) {
          if (fillOpacity < 1) {
            this.svg.polygon.fillOpacity = (fillOpacity += .1).toFixed(1);
          }
        } else {
          if (fillOpacity > 0) {
            this.svg.polygon.fillOpacity = (fillOpacity -= .1).toFixed(1);
          }

          this.svgElements[this.svgElements.length - 1] = this.svg.polygon;
        }
      }
      else if (this.svgElementType === 'circle') {
        let fillOpacity = Number(this.svg.circle.fillOpacity);

        if (Math.sign(event.deltaY) === -1) {
          if (fillOpacity < 1) {
            this.svg.circle.fillOpacity = (fillOpacity += .1).toFixed(1);
          }
        } else {
          if (fillOpacity > 0) {
            this.svg.circle.fillOpacity = (fillOpacity -= .1).toFixed(1);
          }
        }
        this.svgElements[this.svgElements.length - 1] = this.svg.circle;
      }
      else if (this.svgElementType === 'ellipse') {
        let fillOpacity = Number(this.svg.ellipse.fillOpacity);

        if (Math.sign(event.deltaY) === -1) {
          if (event.altKey) {

            let rotate = Number(this.svg.ellipse.rotate);

            if (event.shiftKey) {
              this.svg.ellipse.rotate = (rotate -= 10).toString();
            } else {
              this.svg.ellipse.rotate = (--rotate).toString();
            }
            this.svg.ellipse.transform = `rotate(${this.svg.ellipse.rotate} ${this.svg.ellipse.cx} ${this.svg.ellipse.cy})`;

          } else if (fillOpacity < 1) {
            this.svg.ellipse.fillOpacity = (fillOpacity += .1).toFixed(1);
          }

        } else {
          if (event.altKey) {
            let rotate = Number(this.svg.ellipse.rotate);
            if (event.shiftKey) {
              this.svg.ellipse.rotate = (rotate += 10).toString();
            } else {
              this.svg.ellipse.rotate = (++rotate).toString();
            }
            this.svg.ellipse.transform = `rotate(${this.svg.ellipse.rotate} ${this.svg.ellipse.cx} ${this.svg.ellipse.cy})`;
          } else if (fillOpacity > 0) {
            this.svg.ellipse.fillOpacity = (fillOpacity -= .1).toFixed(1);
          }
        }

        this.svgElements[this.svgElements.length - 1] = this.svg.ellipse;
      }
    }
  }

  onElementContextMenu(ev: MouseEvent, element: any): void {
    ev.preventDefault();
    this.showMenu = true;

    this.elementBeingEdited = element;

    setTimeout(() => {
      const innerW = window.innerWidth;
      const innerH = window.innerHeight;
      const menu = document.querySelector('#menu')! as HTMLElement;
      menu.style.display = 'block';

      console.log(menu.style.width);
      if (((innerW - ev.pageX) <= (menu.firstElementChild!.clientWidth + 30)) && ((innerH - ev.pageY) <= (menu.firstElementChild!.clientHeight + 30))) {
        menu.style.top = `${ev.pageY - menu.firstElementChild!.clientHeight}px`;
        menu.style.left = `${ev.pageX - menu.firstElementChild!.clientWidth}px`;
      }
      else if ((innerW - ev.pageX) <= (menu.firstElementChild!.clientWidth + 30)) {
        menu.style.top = `${ev.pageY}px`;
        menu.style.left = `${ev.pageX - menu.firstElementChild!.clientWidth}px`;
      } else if ((innerH - ev.pageY) <= (menu.firstElementChild!.clientHeight + 30)) {
        menu.style.top = `${ev.pageY - menu.firstElementChild!.clientHeight}px`;
        menu.style.left = `${ev.pageX}px`;
      }
      else {
        menu.style.top = `${ev.pageY}px`;
        menu.style.left = `${ev.pageX}px`;
      }
    }, 50);
  }
}

