interface Coord {
  x: number;
  y: number;
  r?: number;
}

interface MenuObj {
  text: string;
  url: string;
  heightPercent: number;
  xCentre: number;
  yBottom: number;
  path: string;
}

interface Scale {
  min: number;
  max: number;
}