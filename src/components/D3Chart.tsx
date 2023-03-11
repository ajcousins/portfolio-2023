import * as d3 from 'd3';
import {
  menuObjects,
  xTranslationMax,
  sunObject,
  colours,
} from '../consts/landing';
import {
  newPointFromReference,
  referencePoints,
  shadowPoints,
  getTextScale,
  scaleTranslate,
  numToHex,
} from './helpers';
import { getCookie, setCookie } from '@/helpers/cookies';

const ANIMATION_FRAME_RATE = 1000 / 30; // FPS

export default class D3Chart {
  sunDom: SVGSVGElement | null = null;
  sunD3: d3.Selection<SVGCircleElement, unknown, null, undefined>;
  canvasD3: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  textObjDom: SVGSVGElement[] | null = null;
  textObjD3: d3.Selection<d3.BaseType, MenuObj, SVGSVGElement, unknown>;
  textObjOriginalBounds: Coord[][];
  sunBrightness: number = 1;
  origin: Coord = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  anchors: Coord[]; // text object anchor points
  anchorsTrans: Coord[]; // text object anchor points translated
  refPoints: Coord[]; // projected reference points: origin -> anchor -> baselineY
  refPointsTrans: Coord[]; // ref points translated
  baselineY: number;
  isTransitioning: boolean = false;
  userIsTouching: boolean = false;
  screenLog: SVGSVGElement;

  constructor(element: any) {
    this.canvasD3 = d3
      .select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', window.innerHeight)
      .attr('class', 'svg-canvas');

    const mousePos = {
      x: 0,
      y: 0,
    };

    this.screenLog = document.querySelector('svg') as SVGSVGElement;
    this.screenLog.addEventListener('mousemove', (e) => {
      mousePos.y = e.clientY;
      mousePos.x = e.clientX;
      this.update(mousePos);
    });
    window.addEventListener('resize', () => {
      this.update();
    });

    this.screenLog.addEventListener('touchstart', (e) => this.onTouch(), false);

    this.sunD3 = this.canvasD3
      .append('circle')
      .attr('class', 'sun')
      .attr('cx', window.innerWidth / 2)
      .attr('cy', 0)
      .attr('r', sunObject.r)
      .attr('fill', `#${colours.sun}`);

    this.textObjD3 = this.canvasD3
      .selectAll('.text-objs')
      .data(menuObjects as MenuObj[]);
    this.textObjD3
      .enter()
      .append('g')
      .attr('class', 'text-objs')
      .attr('alignment-baseline', 'middle')
      .attr('fill', `#${colours.menuObjects}`)
      .append('path')
      .attr('d', (obj) => obj.path)
      .on('click', (obj) => {
        this.transitionOut(obj.target.__data__.url);
      });

    /**
     * 'refPoints' need to be translated along the same Y line at fixed distances from
     * each other. The translated refPoints (refPointsTrans) are then used to calculate
     * an updated anchor position (anchorsTrans) for parallax effect.
     */
    this.anchors = menuObjects.map((obj) => ({
      x: (obj.xCentre / 100) * window.innerWidth,
      y: (obj.yBottom / 100) * window.innerHeight,
    }));
    this.anchorsTrans = [...this.anchors];
    this.baselineY = window.innerHeight - 20;
    this.baselineY = 700;
    this.refPoints = this.anchors.map(
      (obj): Coord => referencePoints(obj, this.origin, this.baselineY)
    );
    this.refPointsTrans = [...this.refPoints];

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

    const isTouchScreen = getCookie('isTouchScreen')
    if (isTouchScreen) this.onTouch();
  }

  update(mousePos?: Coord) {
    if (
      this.isTransitioning ||
      !this.sunDom ||
      !this.textObjDom ||
      this.userIsTouching
    )
      return;

    this.canvasD3.attr('height', window.innerHeight - 4);
    this.origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const sunRect = this.sunDom.getBoundingClientRect();
    sunObject.y = sunRect.y + sunRect.height / 2;

    if (mousePos) {
      // sun
      sunObject.x = sunRect.x + sunRect.width / 2;
      this.sunD3.attr('cy', mousePos.y * 0.6);
      this.sunD3.attr('cx', this.origin.x);

      // menu object xTranslate
      const ratioFromOrigin =
        (-1 * (mousePos.x - this.origin.x)) / (window.innerWidth / 2);
      this.refPointsTrans = this.refPoints.map((p) => ({
        ...p,
        x: p.x + ratioFromOrigin * xTranslationMax,
      }));
      this.anchorsTrans = this.refPointsTrans.map((refPoint, i) =>
        newPointFromReference(this.anchors[i], refPoint, this.origin)
      );
    } else {
      // else window resize
      sunObject.x = this.origin.x;
      this.sunD3.attr('cy', sunObject.y > 0 ? sunObject.y - 3 : 0);
      this.sunD3.attr('cx', sunObject.x);
      this.anchorsTrans = menuObjects.map((obj) => ({
        x: (obj.xCentre / 100) * window.innerWidth,
        y: (obj.yBottom / 100) * window.innerHeight,
      }));
      this.anchors = [...this.anchorsTrans];
      this.refPointsTrans = this.refPoints.map((p) => ({
        y: p.y,
        x: p.x,
      }));
      this.baselineY = window.innerHeight - 20;
      this.refPoints = this.anchorsTrans.map(
        (obj): Coord => referencePoints(obj, this.origin, this.baselineY)
      );
    }

    if (sunObject.y > this.origin.y) {
      const sunBounds = { min: this.origin.y, max: window.innerHeight * 0.59 };
      const brightnessDomain = { min: 1, max: 0 };
      this.sunBrightness = scaleTranslate(
        sunObject.y,
        sunBounds,
        brightnessDomain
      );
    } else {
      this.sunBrightness = 1;
    }

    this.updateShadows();
  }

  transitionOut(urlTarget: string) {
    const TRANSITION_LENGTH = 1000;
    this.isTransitioning = true;
    this.sunD3.transition().duration(TRANSITION_LENGTH).attr('r', 0);

    d3.selectAll('.text-objs')
      .transition()
      .duration(TRANSITION_LENGTH)
      .style('fill', `#${colours.menuObjects}00`);

    this.textObjDom?.forEach((_, i) => {
      d3.select(`.shadow-${i}`)
        .transition()
        .duration(TRANSITION_LENGTH)
        .style('fill', `#${colours.shadows}00`);
    });

    setTimeout(() => {
      window.location = urlTarget as unknown as Location;
    }, TRANSITION_LENGTH);
  }

  onTouch() {
    if (!this.userIsTouching) {
      this.moveSun(this.origin.y, 3000);
    }
    this.userIsTouching = true;
    setCookie('isTouchScreen', '1', 30)
  }

  moveSun(yPos: number, transitionTime: number) {
    this.sunD3
      .transition()
      .ease(d3.easeCubicInOut)
      .duration(transitionTime)
      .attr('cy', yPos)
      .attr('r', sunObject.r * 4);

    const move = setInterval(() => {
      const sunRect = this.sunDom!.getBoundingClientRect();
      sunObject.y = sunRect.y + sunRect.height / 2;
      this.updateShadows();
    }, ANIMATION_FRAME_RATE);

    setTimeout(() => {
      clearInterval(move);
      const top = window.innerHeight / 4;
      if (yPos > top) this.moveSun(top, 6000);
      else this.moveSun(this.origin.y, 6000);
    }, transitionTime);
  }

  updateShadows() {
    if (this.isTransitioning) return;
    const dimHex = numToHex(this.sunBrightness);
    this.sunD3.style('fill', `#${colours.sun}${dimHex}`);

    d3.selectAll('.text-objs').attr(
      'transform',
      (_, i: number) => `
        translate(${this.anchorsTrans[i].x}, 
          ${this.anchorsTrans[i].y}) 
        scale(${getTextScale(
          this.textObjOriginalBounds[i],
          window.innerHeight,
          menuObjects[i].heightPercent
        )}) 
        rotate(-90)
      `
    );

    this.textObjDom?.forEach((obj, i) => {
      this.canvasD3.append('path').attr('class', `shadow-${i}`);
      d3.select(`.shadow-${i}`)
        .attr('d', () =>
          this.anchorsTrans[i].y < sunObject.y
            ? ''
            : shadowPoints(obj, sunObject, this.textObjOriginalBounds[i])
        )
        .style('fill', `#${colours.shadows}${dimHex}`)
        .style('mix-blend-mode', 'darken');
    });
  }
}
