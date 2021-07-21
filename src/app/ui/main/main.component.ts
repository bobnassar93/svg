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
  svgElement!: SVGPolygonElement | SVGCircleElement | SVGEllipseElement;
  addNew: boolean = true;
  svgElementType: string = 'polygon';
  showMenu: boolean = false;
  constructor(public svg: SVG) {
  }

  ngOnInit(): void {
    this.svg = new SVG();
  }

  createPreviewElement(event: MouseEvent): void {
    if (this.started === true) {
      // polygon
      if (this.svgElementType === 'polygon') {
        this.svg.points = `${this.points.join(' ')}, ${event.offsetX},${event.offsetY}`;
        this.svgElement.setAttributeNS(null, 'points', this.svg.points);
      }
      // circle
      else if (this.svgElementType === 'circle') {
        this.svg.r = Math.abs((event.offsetX - Number(this.svg.cx))).toString();
        this.svgElement.setAttributeNS(null, 'r', this.svg.r);
      }
      // ellipse
      else if (this.svgElementType === 'ellipse') {
        this.svg.rx = Math.abs((event.offsetX - Number(this.svg.cx))).toString();
        this.svg.ry = Math.abs((event.offsetY - Number(this.svg.cy))).toString();
        this.svgElement.setAttributeNS(null, 'rx', this.svg.rx);
        this.svgElement.setAttributeNS(null, 'ry', this.svg.ry);
        this.svgElement.setAttributeNS(null, 'transform', `rotate(${this.svg.rotate} ${this.svg.cx} ${this.svg.cy})`);
      }
    }
  }

  addNewPoints(event: MouseEvent): void {
    if(this.showMenu){
      this.showMenu = false;
      return;
    }
    this.started = true;
    document.body.style.overflow = 'hidden';

    if (this.svgElementType === 'polygon') {
      this.points.push(`${event.offsetX},${event.offsetY}`);

      this.svg.points = `${this.points.join(' ')}`;
    }

    if (this.addNew === true) {
      this.addNew = false;

      // Polygon
      if (this.svgElementType === 'polygon') {

        this.svgElement = this.svg.createPolygone();
        document.querySelector('#_svg')!.appendChild(this.svgElement);
        this.svgElement.setAttributeNS(null, 'points', this.svg.points);
        this.svgElement.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          this.showMenu = true;
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
        });
      }
      // Circle
      else if (this.svgElementType === 'circle') {
        this.svg.cx = event.offsetX.toString();
        this.svg.cy = event.offsetY.toString();
        this.svgElement = this.svg.createCircle();
        document.querySelector('#_svg')!.appendChild(this.svgElement);
        this.svgElement.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          this.showMenu = true;
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
        });
      }
      // Ellipse
      else if (this.svgElementType === 'ellipse') {
        this.svg.cx = event.offsetX.toString();
        this.svg.cy = event.offsetY.toString();
        this.svgElement = this.svg.createEllipse();
        document.querySelector('#_svg')!.appendChild(this.svgElement);
        this.svgElement.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          this.showMenu = true;
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
        });
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
    if (this.addNew === false) {
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
      this.svgElement.setAttributeNS(null, 'points', this.svg.points);
    } else if (event.key.toLowerCase() === 'escape') {
      this.cancelDrawingElement();
    }
  }

  @HostListener('document:wheel', ['$event'])
  onMouseWheelScroll(event: WheelEvent): void {
    if (this.started === true) {
      if (this.svgElementType === 'polygon') {
        let fillOpacity = Number(this.svgElement.getAttributeNS(null, 'fill-opacity'));
        if (Math.sign(event.deltaY) === -1) {
          if (fillOpacity < 1) {
            this.svgElement.setAttributeNS(null, 'fill-opacity', (fillOpacity += .1).toFixed(1));
          }
        } else {
          if (fillOpacity > 0) {
            this.svgElement.setAttributeNS(null, 'fill-opacity', (fillOpacity -= .1).toFixed(1));
          }
        }
      }
      else if (this.svgElementType === 'circle') {
        let fillOpacity = Number(this.svgElement.getAttributeNS(null, 'fill-opacity'));
        if (Math.sign(event.deltaY) === -1) {
          if (fillOpacity < 1) {
            this.svgElement.setAttributeNS(null, 'fill-opacity', (fillOpacity += .1).toFixed(1));
          }
        } else {
          if (fillOpacity > 0) {
            this.svgElement.setAttributeNS(null, 'fill-opacity', (fillOpacity -= .1).toFixed(1));
          }
        }
      }
      else if (this.svgElementType === 'ellipse') {
        let fillOpacity = Number(this.svgElement.getAttributeNS(null, 'fill-opacity'));
        if (Math.sign(event.deltaY) === -1) {
          if (event.altKey) {
            let rotate = Number(this.svg.rotate);
            if (event.shiftKey) {
              this.svg.rotate = (rotate -= 10).toString();
            } else {
              this.svg.rotate = (--rotate).toString();
            }
            this.svgElement.setAttributeNS(null, 'transform', `rotate(${this.svg.rotate} ${this.svg.cx} ${this.svg.cy})`);
          } else if (fillOpacity < 1) {
            this.svgElement.setAttributeNS(null, 'fill-opacity', (fillOpacity += .1).toFixed(1));
          }

        } else {
          if (event.altKey) {
            let rotate = Number(this.svg.rotate);
            if (event.shiftKey) {
              this.svg.rotate = (rotate += 10).toString();
            } else {
              this.svg.rotate = (++rotate).toString();
            }
            this.svgElement.setAttributeNS(null, 'transform', `rotate(${this.svg.rotate} ${this.svg.cx} ${this.svg.cy})`);
          } else if (fillOpacity > 0) {
            this.svgElement.setAttributeNS(null, 'fill-opacity', (fillOpacity -= .1).toFixed(1));
          }
        }
      }
    }
  }
}
