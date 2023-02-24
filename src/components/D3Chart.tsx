import * as d3 from 'd3';
import { menuObjects, xTranslationMax } from './consts';
import {
  newPointFromReference,
  referencePoints,
  shadowPoints,
  getTextScale,
} from './helpers';

export default class D3Chart {
  SUN = {
    r: 8,
    x: 0,
    y: 0,
  };

  sunDom: SVGSVGElement | null = null;
  textObjDom: SVGSVGElement[] | null = null;
  textObjOriginalBounds: Coord[][];
  anchors: Coord[];
  anchorsTrans: Coord[];
  refPoints: Coord[];
  refPointsTrans: Coord[];
  origin: Coord = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  baselineY: number;

  constructor(element: any) {
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', window.innerHeight)
      .attr('class', 'svg-canvas');

    const mousePos = {
      x: 0,
      y: 0,
    };

    const screenLog = document.querySelector('svg') as SVGSVGElement;
    screenLog.addEventListener('mousemove', (e) => {
      mousePos.y = e.clientY;
      mousePos.x = e.clientX;
      this.update(mousePos);
    });
    window.addEventListener('resize', () => {
      this.update();
    });

    svg
      .append('circle')
      .attr('class', 'sun')
      .attr('cx', window.innerWidth / 2)
      .attr('cy', 0)
      .attr('r', this.SUN.r)
      .attr('fill', '#ffffff');

    const textObjs = svg.selectAll('.text-objs').data(menuObjects as MenuObj[]);
    textObjs
      .enter()
      .append('g')
      .attr('class', 'text-objs')
      .attr('alignment-baseline', 'middle')
      .attr('fill', '#000000CC')
      .append('path')
      .attr('d', (obj) => obj.path);

    this.anchors = menuObjects.map((obj) => ({
      x: (obj.xCentre / 100) * window.innerWidth,
      y: (obj.yBottom / 100) * window.innerHeight,
    }));
    this.anchorsTrans = [...this.anchors];

    // Origin
    // svg
    //   .append('circle')
    //   .attr('class', 'origin')
    //   .attr('cx', this.origin.x)
    //   .attr('cy', this.origin.y)
    //   .attr('r', '3px')
    //   .attr('fill', 'red');

    // Anchors
    // this.anchors.forEach((anchor, i) => {
    //   svg
    //     .append('circle')
    //     .attr('class', 'anchor')
    //     .attr('cx', anchor.x)
    //     .attr('cy', anchor.y)
    //     .attr('r', '3px')
    //     .attr('fill', 'red');
    // });

    // Reference points
    this.baselineY = window.innerHeight - 20;
    this.baselineY = 700;
    this.refPoints = this.anchors.map(
      (obj): Coord => referencePoints(obj, this.origin, this.baselineY)
    );
    this.refPointsTrans = [...this.refPoints];

    this.refPoints.forEach((p) => {
      svg
        .append('circle')
        .attr('class', 'ref-points')
        .attr('cx', p.x)
        .attr('cy', p.y)
        .attr('r', '3px')
        .attr('fill', 'blue');
    });

    this.sunDom = document.querySelector('.sun') as SVGSVGElement;
    this.textObjDom = Array.from(
      document.querySelectorAll('.text-objs')
    ) as SVGSVGElement[];

    this.textObjOriginalBounds = this.textObjDom.map((obj) => {
      const bounds = obj.getBoundingClientRect();
      return [
        { x: bounds.left, y: bounds.top }, // top left
        { x: bounds.right, y: bounds.top }, // top right
        { x: bounds.right, y: bounds.bottom }, // bottom right
        { x: bounds.left, y: bounds.bottom }, // bottom left
      ];
    });

    this.update();
  }

  update(mousePos?: Coord) {
    const svg = d3.select('.svg-canvas').attr('height', window.innerHeight - 4);
    const sun = d3.select('.sun');
    // const origin = d3.select('.origin');
    // const anchorDots = d3.selectAll('.anchor');
    // const refPointDots = d3.selectAll('.ref-points');
    this.origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    if (!this.sunDom || !this.textObjDom) return;
    const sunRect = this.sunDom.getBoundingClientRect();
    this.SUN.y = sunRect.y + sunRect.height / 2;

    if (mousePos) {
      // sun
      this.SUN.x = sunRect.x + sunRect.width / 2;
      sun.attr('cy', mousePos.y * 0.6);
      sun.attr('cx', this.origin.x);

      // menu object xTranslate
      const ratioFromOrigin =
        (-1 * (mousePos.x - this.origin.x)) / (window.innerWidth / 2);
      this.refPointsTrans = this.refPoints.map((p) => ({
        ...p,
        x: p.x + ratioFromOrigin * xTranslationMax,
      }));
      this.anchorsTrans = this.refPointsTrans.map((refPoint, i) => {
        return newPointFromReference(this.anchors[i], refPoint, this.origin);
      });
    } else {
      // window resize
      this.SUN.x = this.origin.x;
      sun.attr('cy', this.SUN.y > 0 ? this.SUN.y - 3 : 0);
      sun.attr('cx', this.SUN.x);
      // origin.attr('cy', this.origin.y).attr('cx', this.origin.x);
      this.anchorsTrans = menuObjects.map((obj) => ({
        x: (obj.xCentre / 100) * window.innerWidth,
        y: (obj.yBottom / 100) * window.innerHeight,
      }));
      this.anchors = [...this.anchorsTrans];
      this.refPointsTrans = this.refPoints.map((p, i) => ({
        y: p.y,
        x: p.x,
      }));
      this.baselineY = window.innerHeight - 20;
      this.refPoints = this.anchorsTrans.map(
        (obj): Coord => referencePoints(obj, this.origin, this.baselineY)
      );
    }
    // anchorDots
    //   .attr('cx', (_, i) => this.anchorsTrans[i].x)
    //   .attr('cy', (_, i) => this.anchorsTrans[i].y);
    // refPointDots
    //   .attr('cx', (_, i) => this.refPointsTrans[i].x)
    //   .attr('cy', this.baselineY);

    d3.selectAll('.text-objs').attr(
      'transform',
      (obj: any, i: number) => `
        translate(${this.anchorsTrans[i].x}, 
          ${this.anchorsTrans[i].y}) 
        scale(${getTextScale(
          this.textObjOriginalBounds[i],
          window.innerHeight,
          menuObjects[i].heightPercent,
        )}) 
        rotate(-90)
      `
    );

    this.textObjDom.forEach((obj, i) => {
      svg.append('path').attr('class', `shadow-${i}`);
      d3.select(`.shadow-${i}`)
        .attr('d', () =>
          this.anchorsTrans[i].y < this.SUN.y
            ? ''
            : shadowPoints(obj, this.SUN, this.textObjOriginalBounds[i])
        )
        .style('fill', '#aa9b72')
        .style('mix-blend-mode', 'darken');
    });
  }
}
