import * as d3 from 'd3';
import { menuObjects } from './consts';
import { shadowPoints } from './helpers';

export default class D3Chart {
  SUN = {
    r: 8,
    x: 0,
    y: 0,
  };

  sunDom: SVGSVGElement | null = null;
  textObjDom: SVGSVGElement[] | null = null;
  textObjOriginalBounds: Coord[][];

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
    console.log("update");
    
    const svg = d3.select('.svg-canvas').attr('height', window.innerHeight - 4);
    const sun = d3.select('.sun');

    if (!this.sunDom || !this.textObjDom) return;
    const sunRect = this.sunDom.getBoundingClientRect();
    this.SUN.y = sunRect.y + sunRect.height / 2;

    if (mousePos) {
      this.SUN.x = sunRect.x + sunRect.width / 2;
      sun.attr('cy', mousePos.y * 0.6);
      sun.attr('cx', window.innerWidth / 2);
    } else {
      this.SUN.x = window.innerWidth / 2;
      sun.attr('cy', this.SUN.y > 0 ? this.SUN.y - 5 : 0);
      sun.attr('cx', this.SUN.x);
    }

    d3.selectAll('.text-objs').attr(
      'transform',
      (obj: any) => `
        translate(${(obj.xCentre / 100) * window.innerWidth}, 
          ${(obj.yBottom / 100) * window.innerHeight}) 
        scale(${obj.scale}) 
        rotate(-90)
      `
    );

    this.textObjDom.forEach((obj, i) => {
      svg.append('path').attr('class', `shadow-${i}`);
      d3.select(`.shadow-${i}`)
        .attr('d', () =>
          shadowPoints(obj, this.SUN, this.textObjOriginalBounds[i])
        )
        .attr('fill', '#00000055');
    });
  }
}
