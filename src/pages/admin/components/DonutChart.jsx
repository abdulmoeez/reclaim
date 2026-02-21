import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

const COLORS = [
  'rgba(245,184,59,.9)',
  'rgba(120,180,255,.85)',
  'rgba(62,220,142,.85)',
  'rgba(255,120,90,.85)',
];

export default function DonutChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data?.length) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width * dpr;
    const h = rect.height * dpr;

    canvas.width = w;
    canvas.height = h;
    ctx.scale(dpr, dpr);

    const cw = rect.width;
    const ch = rect.height;
    const cx = cw / 2;
    const cy = ch / 2;
    const r = Math.min(cx, cy) * 0.85;
    const inner = r * 0.62;

    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    let start = -Math.PI / 2;

    ctx.clearRect(0, 0, cw, ch);

    data.forEach((d, i) => {
      const ang = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.arc(cx, cy, r, start, start + ang);
      ctx.closePath();
      ctx.fill();
      start += ang;
    });

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    ctx.fillStyle = 'rgba(255,255,255,.92)';
    ctx.font = '700 18px ui-sans-serif, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Status', cx, cy - 6);
    ctx.fillStyle = 'rgba(255,255,255,.70)';
    ctx.font = '600 13px ui-sans-serif, system-ui';
    ctx.fillText(`${total} items`, cx, cy + 14);
  }, [data]);

  return (
    <div style={{ height: 220 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 220 }}
        width={440}
        height={440}
        aria-hidden
      />
    </div>
  );
}

DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export { COLORS };
