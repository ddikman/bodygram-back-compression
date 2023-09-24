import { useEffect, useRef } from "react";

import styles from './compressionView.module.css'

export default function CompressionView({title, shoulderAngle, hipAngle, backHeight}) {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef('7');

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')
    const scale = ctx.canvas.width / 558;
    ctx.canvas.height = 542 * scale;

    const drawLine = (from, to, angle = 0, emphasis = false) => {
      const centerX = (from.x + to.x) / 2;
      const centerY = (from.y + to.y) / 2;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((Math.PI / 180) * angle);

      ctx.beginPath();
      ctx.moveTo(from.x - centerX, from.y - centerY);
      ctx.lineTo(to.x - centerX, to.y - centerY);

      if (emphasis) {
        ctx.strokeStyle = 'red';
      } else {
        ctx.strokeStyle = '#bababa';
        ctx.setLineDash([10, 5]);
      }

      ctx.stroke();
      ctx.closePath();

      ctx.restore();
    }

    const drawLines = () => {
      const shoulderHeight = 43 * scale;
      const hipHeight = 384 * scale;

      const left = 80 * scale;
      const right = ctx.canvas.width - left;

      drawLine({x: left, y: shoulderHeight}, {x: right, y: shoulderHeight});
      drawLine({x: left, y: hipHeight}, {x: right, y: hipHeight});

      const emphasis = true
      drawLine({x: left, y: shoulderHeight}, {x: right, y: shoulderHeight}, shoulderAngle, emphasis);
      drawLine({x: left, y: hipHeight}, {x: right, y: hipHeight}, hipAngle, emphasis);
    }

    const body = new Image();
    body.src = '/body.png';

    body.onload = () => {
      console.log('loading')
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(body, 0, 0, 558 * scale, 542 * scale);
      drawLines();
    }

  }, [canvasRef, hipAngle, shoulderAngle]);

  return (<div>
    <h2 style={{ fontSize: '0.8rem' }}>» {title}</h2>
    <div className={styles.container}>
        <canvas style={{ width: '100%' }} ref={canvasRef}></canvas>
      </div>
  </div>)
}