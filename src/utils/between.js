function between(minWidth, maxWidth, minValue, maxValue) {
  const slope = (minValue - maxValue) / (minWidth - maxWidth);
  const base = minValue - slope * minWidth;
  return `calc(${base}px + ${100 * slope}vw)`;
}

export default function (property, minWidth, maxWidth, minValue, maxValue) {
  return `
    ${property}: ${minValue}px;
    @media (min-width: ${minWidth}px) {
      ${property}: ${between(minWidth, maxWidth, minValue, maxValue)};
    }
    @media (min-width: ${maxWidth}px) {
      ${property}: ${maxValue}px;
    }
  `;
}

// WEBPACK FOOTER //
// ./src/utils/between.js
