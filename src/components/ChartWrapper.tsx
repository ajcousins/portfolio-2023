import React ,{ useRef, useState, useEffect } from 'react'
import D3Chart from './D3Chart';

export default function ChartWrapper() {
  const chartArea = useRef(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartArea.current))
    }
  }, [chart])

  return (
    <div ref={chartArea} />
  )
}
