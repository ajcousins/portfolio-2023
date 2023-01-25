import * as d3 from 'd3';
import { menuObjects, getTextStyle } from './consts';
import { shadowPoints } from './helpers';
import { distort_path } from '../references/transform';

export default class D3Chart {
  SUN = {
    r: 8,
    x: 0,
    y: 0,
  };

  sunDom: SVGSVGElement | null = null;
  textObjDom: SVGSVGElement[] | null = null;

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
      console.log('resize');
      this.update();
    });

    svg
      .append('circle')
      .attr('class', 'sun')
      .attr('cx', window.innerWidth / 2)
      .attr('cy', 0)
      .attr('r', this.SUN.r)
      .attr('fill', '#ff6666');

    const textObjs = svg.selectAll('text').data(menuObjects as MenuObj[]);
    textObjs
      .enter()
      .append('text')
      .text((d) => d.text)
      .attr('class', 'textObj')
      .attr('style', (d) => getTextStyle(d.textHeight, window.innerHeight))
      .attr('alignment-baseline', 'middle');

    // svg
    //   .append('rect')
    //   .attr('x', 100)
    //   .attr('y', 100)
    //   .attr('width', 200)
    //   .attr('height', 100);


    // const testInputPath = 'M0.275568 27V0.818181H10.6051C12.5909 0.818181 14.2827 1.19744 15.6804 1.95597C17.0781 2.70597 18.1435 3.75 18.8764 5.08807C19.6179 6.41761 19.9886 7.9517 19.9886 9.69034C19.9886 11.429 19.6136 12.9631 18.8636 14.2926C18.1136 15.6222 17.027 16.6577 15.6037 17.3991C14.1889 18.1406 12.4759 18.5114 10.4645 18.5114H3.88068V14.0753H9.5696C10.6349 14.0753 11.5128 13.892 12.2031 13.5256C12.902 13.1506 13.4219 12.6349 13.7628 11.9787C14.1122 11.3139 14.2869 10.5511 14.2869 9.69034C14.2869 8.82102 14.1122 8.0625 13.7628 7.41477C13.4219 6.75852 12.902 6.25142 12.2031 5.89347C11.5043 5.52699 10.6179 5.34375 9.54403 5.34375H5.81108V27H0.275568ZM47.6438 13.9091C47.6438 16.7642 47.1026 19.1932 46.0202 21.196C44.9464 23.1989 43.4805 24.7287 41.6225 25.7855C39.7731 26.8338 37.6935 27.358 35.3839 27.358C33.0572 27.358 30.9691 26.8295 29.1197 25.7727C27.2702 24.7159 25.8086 23.1861 24.7347 21.1832C23.6609 19.1804 23.1239 16.7557 23.1239 13.9091C23.1239 11.054 23.6609 8.625 24.7347 6.62216C25.8086 4.61932 27.2702 3.09375 29.1197 2.04545C30.9691 0.988636 33.0572 0.460226 35.3839 0.460226C37.6935 0.460226 39.7731 0.988636 41.6225 2.04545C43.4805 3.09375 44.9464 4.61932 46.0202 6.62216C47.1026 8.625 47.6438 11.054 47.6438 13.9091ZM42.0316 13.9091C42.0316 12.0597 41.7546 10.5 41.2006 9.23011C40.6552 7.96023 39.8839 6.99716 38.8867 6.34091C37.8896 5.68466 36.7219 5.35653 35.3839 5.35653C34.0458 5.35653 32.8782 5.68466 31.881 6.34091C30.8839 6.99716 30.1083 7.96023 29.5543 9.23011C29.0089 10.5 28.7362 12.0597 28.7362 13.9091C28.7362 15.7585 29.0089 17.3182 29.5543 18.5881C30.1083 19.858 30.8839 20.821 31.881 21.4773C32.8782 22.1335 34.0458 22.4616 35.3839 22.4616C36.7219 22.4616 37.8896 22.1335 38.8867 21.4773C39.8839 20.821 40.6552 19.858 41.2006 18.5881C41.7546 17.3182 42.0316 15.7585 42.0316 13.9091ZM51.7443 27V0.818181H62.0739C64.0511 0.818181 65.7386 1.17187 67.1364 1.87926C68.5426 2.57812 69.6122 3.57102 70.3452 4.85795C71.0866 6.13636 71.4574 7.64062 71.4574 9.37074C71.4574 11.1094 71.0824 12.6051 70.3324 13.858C69.5824 15.1023 68.4957 16.0568 67.0724 16.7216C65.6577 17.3864 63.9446 17.7188 61.9332 17.7188H55.017V13.2699H61.0384C62.0952 13.2699 62.973 13.125 63.6719 12.8352C64.3707 12.5455 64.8906 12.1108 65.2315 11.5312C65.581 10.9517 65.7557 10.2315 65.7557 9.37074C65.7557 8.50142 65.581 7.76847 65.2315 7.17188C64.8906 6.57528 64.3665 6.12358 63.6591 5.81676C62.9602 5.50142 62.0781 5.34375 61.0128 5.34375H57.2798V27H51.7443ZM65.8835 15.0852L72.3906 27H66.2798L59.9134 15.0852H65.8835ZM74.3722 5.3821V0.818181H95.875V5.3821H87.8594V27H82.3878V5.3821H74.3722ZM99.4162 27V0.818181H116.751V5.3821H104.952V11.6207H115.601V16.1847H104.952V27H99.4162ZM144.534 13.9091C144.534 16.7642 143.993 19.1932 142.911 21.196C141.837 23.1989 140.371 24.7287 138.513 25.7855C136.664 26.8338 134.584 27.358 132.275 27.358C129.948 27.358 127.86 26.8295 126.01 25.7727C124.161 24.7159 122.699 23.1861 121.625 21.1832C120.551 19.1804 120.015 16.7557 120.015 13.9091C120.015 11.054 120.551 8.625 121.625 6.62216C122.699 4.61932 124.161 3.09375 126.01 2.04545C127.86 0.988636 129.948 0.460226 132.275 0.460226C134.584 0.460226 136.664 0.988636 138.513 2.04545C140.371 3.09375 141.837 4.61932 142.911 6.62216C143.993 8.625 144.534 11.054 144.534 13.9091ZM138.922 13.9091C138.922 12.0597 138.645 10.5 138.091 9.23011C137.546 7.96023 136.775 6.99716 135.777 6.34091C134.78 5.68466 133.613 5.35653 132.275 5.35653C130.936 5.35653 129.769 5.68466 128.772 6.34091C127.775 6.99716 126.999 7.96023 126.445 9.23011C125.9 10.5 125.627 12.0597 125.627 13.9091C125.627 15.7585 125.9 17.3182 126.445 18.5881C126.999 19.858 127.775 20.821 128.772 21.4773C129.769 22.1335 130.936 22.4616 132.275 22.4616C133.613 22.4616 134.78 22.1335 135.777 21.4773C136.775 20.821 137.546 19.858 138.091 18.5881C138.645 17.3182 138.922 15.7585 138.922 13.9091ZM148.635 27V0.818181H154.17V22.4361H165.395V27H148.635ZM174.596 0.818181V27H169.061V0.818181H174.596ZM203.21 13.9091C203.21 16.7642 202.669 19.1932 201.587 21.196C200.513 23.1989 199.047 24.7287 197.189 25.7855C195.339 26.8338 193.26 27.358 190.95 27.358C188.624 27.358 186.536 26.8295 184.686 25.7727C182.837 24.7159 181.375 23.1861 180.301 21.1832C179.227 19.1804 178.69 16.7557 178.69 13.9091C178.69 11.054 179.227 8.625 180.301 6.62216C181.375 4.61932 182.837 3.09375 184.686 2.04545C186.536 0.988636 188.624 0.460226 190.95 0.460226C193.26 0.460226 195.339 0.988636 197.189 2.04545C199.047 3.09375 200.513 4.61932 201.587 6.62216C202.669 8.625 203.21 11.054 203.21 13.9091ZM197.598 13.9091C197.598 12.0597 197.321 10.5 196.767 9.23011C196.222 7.96023 195.45 6.99716 194.453 6.34091C193.456 5.68466 192.288 5.35653 190.95 5.35653C189.612 5.35653 188.445 5.68466 187.447 6.34091C186.45 6.99716 185.675 7.96023 185.121 9.23011C184.575 10.5 184.303 12.0597 184.303 13.9091C184.303 15.7585 184.575 17.3182 185.121 18.5881C185.675 19.858 186.45 20.821 187.447 21.4773C188.445 22.1335 189.612 22.4616 190.95 22.4616C192.288 22.4616 193.456 22.1335 194.453 21.4773C195.45 20.821 196.222 19.858 196.767 18.5881C197.321 17.3182 197.598 15.7585 197.598 13.9091Z'
    const testInputPath = 'M6.78835 27H0.856534L9.89489 0.818181H17.0284L26.054 27H20.1222L13.5639 6.80114H13.3594L6.78835 27ZM6.41761 16.7088H20.429V21.0298H6.41761V16.7088ZM29.2053 27V0.818181H39.6882C41.6143 0.818181 43.2209 1.10369 44.5078 1.67472C45.7947 2.24574 46.7621 3.03835 47.4098 4.05256C48.0575 5.05824 48.3814 6.21733 48.3814 7.52983C48.3814 8.55256 48.1768 9.4517 47.7678 10.2273C47.3587 10.9943 46.7962 11.625 46.0803 12.1193C45.3729 12.6051 44.5632 12.9503 43.6513 13.1548V13.4105C44.6484 13.4531 45.5817 13.7344 46.451 14.2543C47.3288 14.7741 48.0405 15.5028 48.5859 16.4403C49.1314 17.3693 49.4041 18.4773 49.4041 19.7642C49.4041 21.1534 49.0589 22.3935 48.3686 23.4844C47.6868 24.5668 46.6768 25.4233 45.3388 26.054C44.0007 26.6847 42.3516 27 40.3913 27H29.2053ZM34.7408 22.4744H39.2536C40.7962 22.4744 41.9212 22.1804 42.6286 21.5923C43.3359 20.9957 43.6896 20.2031 43.6896 19.2145C43.6896 18.4901 43.5149 17.8509 43.1655 17.2969C42.8161 16.7429 42.3175 16.3082 41.6697 15.9929C41.0305 15.6776 40.2678 15.5199 39.3814 15.5199H34.7408V22.4744ZM34.7408 11.7741H38.8445C39.603 11.7741 40.2763 11.642 40.8643 11.3778C41.4609 11.1051 41.9297 10.7216 42.2706 10.2273C42.62 9.73295 42.7947 9.14062 42.7947 8.45028C42.7947 7.50426 42.4581 6.74148 41.7848 6.16193C41.12 5.58239 40.174 5.29261 38.9467 5.29261H34.7408V11.7741ZM77.0657 13.9091C77.0657 16.7642 76.5245 19.1932 75.4421 21.196C74.3683 23.1989 72.9023 24.7287 71.0444 25.7855C69.195 26.8338 67.1154 27.358 64.8058 27.358C62.479 27.358 60.391 26.8295 58.5415 25.7727C56.6921 24.7159 55.2305 23.1861 54.1566 21.1832C53.0827 19.1804 52.5458 16.7557 52.5458 13.9091C52.5458 11.054 53.0827 8.625 54.1566 6.62216C55.2305 4.61932 56.6921 3.09375 58.5415 2.04545C60.391 0.988636 62.479 0.460226 64.8058 0.460226C67.1154 0.460226 69.195 0.988636 71.0444 2.04545C72.9023 3.09375 74.3683 4.61932 75.4421 6.62216C76.5245 8.625 77.0657 11.054 77.0657 13.9091ZM71.4535 13.9091C71.4535 12.0597 71.1765 10.5 70.6225 9.23011C70.0771 7.96023 69.3058 6.99716 68.3086 6.34091C67.3114 5.68466 66.1438 5.35653 64.8058 5.35653C63.4677 5.35653 62.3001 5.68466 61.3029 6.34091C60.3058 6.99716 59.5302 7.96023 58.9762 9.23011C58.4308 10.5 58.158 12.0597 58.158 13.9091C58.158 15.7585 58.4308 17.3182 58.9762 18.5881C59.5302 19.858 60.3058 20.821 61.3029 21.4773C62.3001 22.1335 63.4677 22.4616 64.8058 22.4616C66.1438 22.4616 67.3114 22.1335 68.3086 21.4773C69.3058 20.821 70.0771 19.858 70.6225 18.5881C71.1765 17.3182 71.4535 15.7585 71.4535 13.9091ZM97.3381 0.818181H102.874V17.821C102.874 19.7301 102.418 21.4006 101.506 22.8324C100.602 24.2642 99.3366 25.3807 97.7088 26.1818C96.081 26.9744 94.1847 27.3707 92.0199 27.3707C89.8466 27.3707 87.946 26.9744 86.3182 26.1818C84.6903 25.3807 83.4247 24.2642 82.5213 22.8324C81.6179 21.4006 81.1662 19.7301 81.1662 17.821V0.818181H86.7017V17.348C86.7017 18.3452 86.919 19.2315 87.3537 20.0071C87.7969 20.7827 88.419 21.392 89.2202 21.8352C90.0213 22.2784 90.9545 22.5 92.0199 22.5C93.0938 22.5 94.027 22.2784 94.8196 21.8352C95.6207 21.392 96.2386 20.7827 96.6733 20.0071C97.1165 19.2315 97.3381 18.3452 97.3381 17.348V0.818181ZM106.431 5.3821V0.818181H127.934V5.3821H119.918V27H114.446V5.3821H106.431Z'
    const check = svg
      .append('path')
      .attr('class', 'test_path')
      .attr('d', testInputPath);
      console.log("check:", check);
      

    const testBounds = document
      .querySelector('.test_path')
      ?.getBoundingClientRect();
      console.log("testBounds:", testBounds);
      
    const testBoundsSrc = [
      { x: testBounds?.left, y: testBounds?.top },
      { x: testBounds?.right, y: testBounds?.top },
      { x: testBounds?.right, y: testBounds?.bottom},
      { x: testBounds?.left, y: testBounds?.bottom},
    ] as Coord[];
    console.log("testBoundsSrc:", testBoundsSrc);
    
    const testBoundsDest = [
      { x: 100, y: 100 },
      { x: 400, y: 80 },
      { x: 430, y: 250},
      { x: 70, y: 220},
    ] as Coord[];
    
    const newPath = distort_path(testInputPath, testBoundsSrc, testBoundsDest)
    console.log("newPath:", newPath);
    

    svg
      .append('path')
      .attr('d', distort_path(testInputPath, testBoundsSrc, testBoundsDest))


    this.sunDom = document.querySelector('.sun') as SVGSVGElement;
    this.textObjDom = Array.from(
      document.querySelectorAll('.textObj')
    ) as SVGSVGElement[];

    this.update();
  }

  update(mousePos?: Coord) {
    // console.log('update');

    const svg = d3.select('.svg-canvas').attr('height', window.innerHeight - 4);

    const sun = d3.select('.sun');

    if (!this.sunDom || !this.textObjDom) return;
    // console.log('sunDom');

    const sunRect = this.sunDom.getBoundingClientRect();
    // console.log("sunRect:", sunRect);
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

    d3.selectAll('.textObj')
      .attr('x', (d: any) => (d.xCentre / 100) * window.innerWidth)
      .attr('y', (d: any) => (d.yBottom / 100) * window.innerHeight)
      .attr('style', (d: any) => getTextStyle(d.textHeight, window.innerHeight))
      .attr(
        'transform',
        (d: any) =>
          `rotate(-90,${(d.xCentre / 100) * window.innerWidth},${
            (d.yBottom / 100) * window.innerHeight
          })`
      );

    // const textObjDom = Array.from(
    //   document.querySelectorAll('.textObj')
    // ) as SVGSVGElement[];
    // console.log('textObjDom:', textObjDom);

    this.textObjDom.forEach((obj, i) => {
      svg.append('path').attr('class', `shadow-${i}`);
      d3.select(`.shadow-${i}`)
        .attr('d', shadowPoints(obj, this.SUN))
        // .attr('stroke-width', 0.1)
        // .attr('fill', 'none')
        // .attr('stroke', 'black');
        .attr('fill', '#00000020');
    });
  }
}