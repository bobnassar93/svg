export interface commonAttributes {
    fill: string;
    stroke: string;
    strokeWidth: string;
    fillOpacity: string;
    type: string;
}

export interface IPolygon extends commonAttributes{
    points: string;
}

export interface IRectangle extends commonAttributes{
    width: string;
    height: string;
}

export interface ICircle extends commonAttributes{
    cx: string;
    cy: string;
    r: string;
}

export interface IEllipse extends commonAttributes{
    cx: string;
    cy: string;
    rx: string;
    ry: string;
    rotate: string;
    transform: string;
}

export interface IText{
    x: string;
    y: string;
    fill: string;
    transform?: string;
}