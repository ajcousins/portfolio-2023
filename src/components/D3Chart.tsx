import * as d3 from 'd3';
import { menuObjects, getTextStyle } from './consts';

// const 

export default class D3Chart {

  SUN = {
    r: 8,
    xCentre: 300,
    yCentre: 100,
  };

  constructor(element: any) {
    const height = window.innerHeight;
    // console.log('height:', height);

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', window.innerHeight)
      .style('class', 'svg-canvas');

    const mouse = {
      pos: {
        x: 0,
        y: 0,
      }
    }
    const screenLog  = document.querySelector('svg') as SVGSVGElement;
    screenLog.addEventListener('mousemove', (e) => {
      mouse.pos.y = e.clientY;
      mouse.pos.x = e.clientX;
      console.log('x:', mouse.pos.x, 'y:', mouse.pos.y);
      this.update(mouse.pos.x, mouse.pos.y);
    });

    const textObjs = svg.selectAll('text').data(menuObjects as MenuObj[]);
    
    svg
      .append('circle')
      .attr('class', 'sun')
      .attr('cx', this.SUN.xCentre)
      .attr('cy', this.SUN.yCentre)
      .attr('r', this.SUN.r)
      .attr('fill', '#ff6666');
      
    textObjs
      .enter()
      .append('text')
      .text((d) => d.text)
      .attr('style', (d) => getTextStyle(d.textHeight))
      .attr('alignment-baseline', 'middle')
      .attr('transform', (d) => `rotate(-90,${d.xCentre},${d.yBottom})`)
      .attr('x', (d) => d.xCentre)
      .attr('y', (d) => d.yBottom)


    const sun = document.querySelector('.sun') as SVGSVGElement;
    console.log('sun:', sun);
    sun.addEventListener('mousedown', (e) => {
      console.log('mouse down on sun');
    });
  }

  update(x: number, y: number) {
    console.log("update");
    // const sun = document.querySelector('.sun')
    // sun.attr
    const sun = d3.select(document.querySelector('.sun'))
    .attr('cy', y)
  }
}
