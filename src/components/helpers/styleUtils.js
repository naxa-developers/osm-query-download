import { Fill, Stroke, Text, Circle, Icon } from 'ol/style';

function hexToRgba(hex, opacity = 100) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const a = opacity * 0.01;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function createIconMarker(style) {
  const {
    icon: { url },
  } = style;
  // fetch(url)
  //   .then(res => res.blob())
  //   .then(res => convertToBase64(res).then(resx => console.log(resx, 'resx')));
  return new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    scale: 0.05,
    crossOrigin: 'anonymous',
    // size: [50, 50],
    src: url,
  });
}

export function createCircleMarker(style) {
  const {
    lineColor,
    lineOpacity,
    fillColor,
    fillOpacity,
    lineThickness,
    circleRadius,
  } = style;
  return new Circle({
    radius: circleRadius,
    stroke: new Stroke({
      color: hexToRgba(lineColor, lineOpacity),
      width: lineThickness,
    }),
    fill: new Fill({
      color: hexToRgba(fillColor, fillOpacity),
    }),
  });
}

function stringDivider(str, width, spaceReplacer) {
  if (str.length > width) {
    let p = width;
    while (p > 0 && str[p] !== ' ' && str[p] !== '-') {
      p -= 1;
    }
    if (p > 0) {
      let left;
      if (str.substring(p, p + 1) === '-') {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      const right = str.substring(p + 1);
      return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
    }
  }
  return str;
}

function truncString(str, n) {
  return str.length > n ? `${str.substr(0, n - 1)}...` : str.substr(0);
}

function getText(style, feature, resolution) {
  const type = style.labelText;
  const maxResolution = style.labelMaxResolution;
  let text = style.showLabel ? feature.get(style.labelField)?.toString() : '';

  if (resolution > maxResolution) {
    text = '';
  } else if (type === 'hide') {
    text = '';
  } else if (type === 'shorten') {
    text = truncString(text, 12);
  } else if (
    type === 'wrap' &&
    (!style.labelPlacement || style.labelPlacement !== 'line')
  ) {
    text = stringDivider(text, 16, '\n');
  }

  return text;
}

export function createTextStyle(style, feature, resolution) {
  const {
    labelFont,
    labelFontSize,
    labelColor,
    labelOpacity,
    labelOutlineWidth,
    labelOutlineColor,
    labelOffsetX,
    labelOffsetY,
    labelAlign,
    labelBaseline,
    labelFontWeight,
    labelLineHeight,
    labelPlacement,
    labelMaxAngleDegree,
    labelRotationDegree,
  } = style;
  const font = labelFont
    ? `${labelFontWeight} ${labelFontSize}px/${
        labelLineHeight || 1
      } ${labelFont}`
    : '14px Calibri';
  return new Text({
    text: getText(style, feature, resolution),
    font,
    overflow: true,
    fill: new Fill({
      color: hexToRgba(labelColor, labelOpacity),
    }),
    stroke: new Stroke({
      color: hexToRgba(labelOutlineColor, labelOpacity),
      width: parseInt(labelOutlineWidth, 10),
    }),
    offsetX: labelOffsetX,
    offsetY: labelOffsetY,
    textAlign: labelAlign || undefined,
    textBaseline: labelBaseline,
    placement: labelPlacement,
    maxAngle: labelMaxAngleDegree,
    rotation: parseFloat(labelRotationDegree) || 0,
  });
}
