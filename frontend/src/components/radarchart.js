import React from 'react';

export const AXES = [
  { key: 'precedentMastery', label: 'Precedent\nMastery' },
  { key: 'logicalCoherence', label: 'Logical\nCoherence' },
  { key: 'evidenceIntegration', label: 'Evidence\nIntegration' },
  { key: 'counterArgumentHandling', label: 'Counter‑Argument\nHandling' },
  { key: 'responsivenessToJudges', label: 'Responsiveness\nTo Judges' },
  { key: 'adaptability', label: 'Adaptability' },
  { key: 'clarityAndRhetoricalForce', label: 'Clarity &\nRhetorical' },
  { key: 'civilityProfessionalism', label: 'Civility &\nProfessionalism' }
];

/**
 * RadarChart component
 *
 * @param {Object} props
 * @param {Object} props.scores – Map of axis keys to values between 0 and 1
 * @param {number} [props.size=250] – Overall width and height of the chart in pixels
 * @param {boolean} [props.showLabels=false] – Whether to render axis labels around the chart
 */
export default function RadarChart({ scores, size = 250, showLabels = false }) {
  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const totalAxes = AXES.length;
  const angleIncrement = (Math.PI * 2) / totalAxes;

  // Create background grid (5 concentric polygons)
  const gridLevels = 5;
  const gridPolygons = [];
  for (let level = 1; level <= gridLevels; level++) {
    const levelRadius = (radius * level) / gridLevels;
    const points = AXES.map((_, i) => {
      const angle = i * angleIncrement - Math.PI / 2;
      const x = center + levelRadius * Math.cos(angle);
      const y = center + levelRadius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    gridPolygons.push(
      <polygon
        key={`grid-${level}`}
        points={points}
        fill="none"
        stroke="#e2e2e2"
        strokeWidth="1"
      />
    );
  }

  // Axis lines
  const axisLines = AXES.map((_, i) => {
    const angle = i * angleIncrement - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return (
      <line
        key={`axis-${i}`}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke="#cccccc"
        strokeWidth="1"
      />
    );
  });

  // Data polygon
  const points = AXES.map((axis, i) => {
    const value = (scores && scores[axis.key]) || 0;
    const r = radius * value;
    const angle = i * angleIncrement - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Compute positions for labels if requested
  const labels = showLabels
    ? AXES.map((axis, i) => {
        const angle = i * angleIncrement - Math.PI / 2;
        // place labels slightly beyond the radius
        const labelRadius = radius + 20;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        // Align text depending on quadrant
        let textAnchor = 'middle';
        if (angle > Math.PI / 2 && angle < (3 * Math.PI) / 2) {
          textAnchor = 'end';
        } else if (angle < -Math.PI / 2 || angle > (3 * Math.PI) / 2) {
          textAnchor = 'start';
        }
        return (
          <text
            key={`label-${axis.key}`}
            x={x}
            y={y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fill="#555"
            fontSize="10"
            style={{ whiteSpace: 'pre-line' }}
          >
            {axis.label}
          </text>
        );
      })
    : null;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}> 
      {gridPolygons}
      {axisLines}
      <polygon
        points={points}
        fill="rgba(52, 152, 219, 0.3)"
        stroke="#3498db"
        strokeWidth="2"
      />
      {labels}
    </svg>
  );
}