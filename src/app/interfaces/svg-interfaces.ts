export interface IPolygon{
    points: string;
    fill: string;
    stroke: string;
    strokeWidth: string;
}

export interface IRectangle{
    width: string;
    height: string;
    fill: string;
    stroke: string;
    strokeWidth: string;
}

export interface ICircle{
    cx: string;
    cy: string;
    r: string;
    stroke: string;
    strokeWidth: string;
    fill: string;
}

export interface IEllipse{
    cx: string;
    cy: string;
    rx: string;
    ry: string;
    stroke: string;
    strokeWidth: string;
    fill: string;
}

export interface IText{
    x: string;
    y: string;
    fill: string;
    transform?: string;
}