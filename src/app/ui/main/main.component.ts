import { Component, HostListener, OnInit } from '@angular/core';
import { SVG } from 'src/app/services/svg.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userStartedDrawing: boolean = false;
  points: string[] = [];
  isAddingNew: boolean = true;
  svgElementType: string = 'polygon';
  showMenu: boolean = false;
  elementIndex!: number;
  svgElements: (any)[] = [];
  deleteElementModal!: HTMLElement;
  rotationValue!: string;
  fillColor!: string;
  opacity!: string;
  strokeColor!: string;
  strokeWidth!: string;
  type!: string;
  _url: string = '';
  _w: number = window.innerWidth;
  _h: number = window.innerHeight;
  startingX!: number;
  startingY!: number;
  startDragging: boolean = false;
  timer!: any;
  dragElement!: {
    target: (SVGPolygonElement | SVGCircleElement | SVGEllipseElement),
    type: string
  };

  constructor(public svg: SVG) {
  }

  ngOnInit(): void {
    this.deleteElementModal = document.getElementById('deleteElementPrompt')!;
    this.deleteElementModal.addEventListener('show.bs.modal', () => {
      this.showMenu = false;
    });

    document.addEventListener('dragover', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
    }, false);

    document.addEventListener('drop', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      let dt = ev.dataTransfer!;
      let files = dt.files;

      let reader = new FileReader()
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result!.toString();
        img.onload = () => {
          this._w = img.width;
          this._h = img.height;
          this._url = img.src;
        }
      }
    }, false);
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

    if (this.svgElementType === 'polygon') {
      this.points.push(`${event.offsetX},${event.offsetY}`);

      if (this.svg.polygon != undefined) {
        this.svg.polygon = this.svg.createPolygone(this.svg.polygon.fill, this.svg.polygon.fillOpacity, `${this.points.join(' ')}, ${event.offsetX},${event.offsetY}`, this.svg.polygon.stroke, this.svg.polygon.strokeWidth, 'polygon');
      } else {
        this.svg.polygon = this.svg.createPolygone('#51ff00', '1', `${this.points.join(' ')}, ${event.offsetX},${event.offsetY}`, '#f20707', '1', 'polygon');
      }
    } else if (this.svgElementType === 'circle') {
      if (this.svg.circle != undefined) {
        this.svg.circle = this.svg.createCircle(this.svg.circle.fill, this.svg.circle.fillOpacity, event.offsetX.toString(), event.offsetY.toString(), '1', this.svg.circle.stroke, this.svg.circle.strokeWidth, 'circle');
      } else {
        this.svg.circle = this.svg.createCircle('#51ff00', '1', event.offsetX.toString(), event.offsetY.toString(), '1', '#f20707', '0', 'circle');
      }
    } else if (this.svgElementType === 'ellipse') {
      if (this.svg.ellipse != undefined) {
        this.svg.ellipse = this.svg.createEllipse(this.svg.ellipse.fill, this.svg.ellipse.fillOpacity, event.offsetX.toString(), event.offsetY.toString(), this.svg.ellipse.rx, this.svg.ellipse.ry, this.svg.ellipse.stroke, this.svg.ellipse.rotate, 'ellipse', '0', '');
      } else {
        this.svg.ellipse = this.svg.createEllipse('#51ff00', '1', event.offsetX.toString(), event.offsetY.toString(), '1', '1', '#f20707', '0', 'ellipse', '0', '');
      }
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

    document.body.style.overflow = 'hidden';
  }

  finishDrawingElement(): void {
    this.userStartedDrawing = false;
    this.points = [];
    this.svg = new SVG();
    this.isAddingNew = true;
    document.body.style.overflow = 'auto';
    this.showMenu = false;
  }

  cancelDrawingElement(): void {
    if (this.userStartedDrawing === true) {
      this.svgElements.pop();
    }
    this.finishDrawingElement();
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
        if (this.points.length === 1) {
          this.svg.polygon.strokeWidth = '1';
        }

        this.svgElements[this.svgElements.length - 1] = this.svg.polygon;
      }
    } else if (event.key.toLowerCase() === 'escape') {
      this.cancelDrawingElement();
      this.showMenu = false;
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
            if (Number(this.svg.ellipse.rotate) < 0) {
              this.svg.ellipse.rotate = '360';
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
            if (Number(this.svg.ellipse.rotate) > 360) {
              this.svg.ellipse.rotate = '0';
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

  onElementContextMenu(ev: MouseEvent, index: number): void {
    ev.preventDefault();

    this.showMenu = true;
    this.elementIndex = index;

    setTimeout(() => {
      const innerW = window.innerWidth;
      const innerH = window.innerHeight;
      const menu = document.querySelector('#menu')! as HTMLElement;
      menu.style.display = 'block';

      if (((innerW - ev.pageX) <= (menu.firstElementChild!.clientWidth)) && ((innerH - ev.pageY) <= (menu.firstElementChild!.clientHeight))) {
        menu.style.top = `${ev.pageY - menu.firstElementChild!.clientHeight}px`;
        menu.style.left = `${ev.pageX - menu.firstElementChild!.clientWidth}px`;
      }
      else if ((innerW - ev.pageX) <= (menu.firstElementChild!.clientWidth)) {
        menu.style.top = `${ev.pageY}px`;
        menu.style.left = `${ev.pageX - menu.firstElementChild!.clientWidth}px`;
      } else if ((innerH - ev.pageY) <= (menu.firstElementChild!.clientHeight)) {
        menu.style.top = `${ev.pageY - menu.firstElementChild!.clientHeight}px`;
        menu.style.left = `${ev.pageX}px`;
      }
      else {
        menu.style.top = `${ev.pageY}px`;
        menu.style.left = `${ev.pageX}px`;
      }

      this.fillColor = this.svgElements[this.elementIndex].fill;
      this.opacity = this.svgElements[this.elementIndex].fillOpacity;
      this.strokeColor = this.svgElements[this.elementIndex].stroke;
      this.strokeWidth = this.svgElements[this.elementIndex].strokeWidth;
      this.type = this.svgElements[this.elementIndex].type;

      if (this.svgElementType === 'ellipse') {
        this.rotationValue = this.svgElements[this.elementIndex].rotate;
      }
    }, 50);
  }

  changeElementFillColorEmitReceiver(ev: Event, property: string): void {
    const target = ev.target! as HTMLInputElement;
    const svgElement = this.svgElements[this.elementIndex];

    switch (property) {
      case 'fillColor':
        svgElement.fill = target.value;
        break;
      case 'strokeColor':
        svgElement.stroke = target.value;
        break;
      case 'opacity':
        svgElement.fillOpacity = target.value;
        break;
      case 'rotation':
        svgElement.transform = `rotate(${target.value} ${svgElement.cx} ${svgElement.cy})`;
        svgElement.rotate = target.value;
        break;
      case 'strokeWidth':
        svgElement.strokeWidth = target.value;
        break;
    }
  }

  removeElement(): void {
    this.svgElements.splice(this.elementIndex, 1);
  }

  saveChanges(): void {
    console.log(JSON.stringify(this.svgElements));
  }

  prepareForDragging(ev: any): void {

    // If not left click pressed, don't perform any action
    if (ev.button !== 0) {
      return;
    }

    if (ev.target.tagName.toLowerCase() !== 'polygon' && ev.target.tagName.toLowerCase() !== 'ellipse' && ev.target.tagName.toLowerCase() !== 'circle') {
      return;
    }
    this.dragElement = {
      target: ev.target,
      type: ev.target.tagName.toLowerCase()
    }

    this.timer = setTimeout(() => {
      this.startingX = ev.offsetX;
      this.startingY = ev.offsetY;
      this.startDragging = true;
      this.cancelDrawingElement();
      this.svg.animateCSS(ev.target as HTMLElement, 'flash');
    }, 500);
  }

  stopDragging(): void {
    if (this.startDragging === true) {
      this.startDragging = false;
      setTimeout(() => {
        this.cancelDrawingElement();
      }, 50);
    }
    clearTimeout(this.timer);
  }

  drag(ev: any): void {
    if (this.startDragging === false) {
      return;
    }
    let _x, _y, index;
    index = Number(this.dragElement.target.getAttribute('data-index'))!;
    switch (this.dragElement.type) {
      case 'polygon':
        this.dragElement.target = this.dragElement.target as SVGPolygonElement;
        _x = ev.offsetX - this.startingX;
        _y = ev.offsetY - this.startingY;
        this.startingX = ev.offsetX;
        this.startingY = ev.offsetY;

        let newPoints: string[] = [];
        if (this.startDragging === true) {

          for (let i = 0; i < this.dragElement.target.points.length; i++) {
            this.dragElement.target.points[i].x += _x;
            this.dragElement.target.points[i].y += _y;
            newPoints.push(`${this.dragElement.target.points[i].x},${this.dragElement.target.points[i].y}`);
          }

          this.svgElements[index].points = newPoints.join(' ');
        }
        break;
      case 'ellipse':
      case 'circle':
        this.dragElement.target = this.dragElement.target as SVGEllipseElement;
        _x = ev.offsetX - this.startingX;
        _y = ev.offsetY - this.startingY;
        this.startingX = ev.offsetX;
        this.startingY = ev.offsetY;

        this.svgElements[index].cx = Number(this.svgElements[index].cx) + _x;
        this.svgElements[index].cy = Number(this.svgElements[index].cy) + _y;
        break;
    }
  }
}

