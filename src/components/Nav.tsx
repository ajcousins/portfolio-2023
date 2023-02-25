import React from 'react';
import Link from 'next/link';

export default function Nav() {
  const SUN_RADIUS = 16;
  const svgConstants = {
    height: SUN_RADIUS * 2,
    center: SUN_RADIUS,
  };

  return (
    <div className="nav">
      <div className="nav-area">
        <Link href="/">
          <svg height={`${svgConstants.height}`}>
            <circle
              fill="white"
              cx={`${svgConstants.center}`}
              cy={`${svgConstants.center}`}
              r={`${SUN_RADIUS}`}
            />
          </svg>
        </Link>
        <Link href="/portfolio">
          <span className="bold">PORTFOLIO</span>
        </Link>
        <Link href="/about">
          <span className="bold">ABOUT</span>
        </Link>
        <Link href="/contact">
          <span className="bold">CONTACT</span>
        </Link>
      </div>
    </div>
  );
}

/*
   this.sunD3 = this.canvasD3
      .append('circle')
      .attr('class', 'sun')
      .attr('cx', window.innerWidth / 2)
      .attr('cy', 0)
      .attr('r', sunObject.r)
      .attr('fill', `#${colours.sun}`);
*/
