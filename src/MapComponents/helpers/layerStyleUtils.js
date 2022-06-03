import { Fill, Stroke, Style, Text } from 'ol/style';
import {
  createTextStyle,
  createCircleMarker,
  createIconMarker,
} from './styleUtils';

export function getPropertiesField(geojson) {
  return Object.keys(geojson.features[0].properties);
}

export function getGeometryType(geojson) {
  return geojson.features[0]?.geometry?.type;
}

export const defaultStyles = {
  lineColor: '#704D00',
  lineOpacity: 100,
  fillColor: '#005580',
  fillOpacity: 10,
  lineThickness: 1,
  circleRadius: 10,
  dashline: 0,
  showLabel: false,
  labelField: '',
  labelFont: 'Calibri',
  labelFontSize: 14,
  labelColor: '#000000',
  labelOpacity: 100,
  labelOutlineWidth: 3,
  labelOutlineColor: '#ffffff',
  labelOffsetX: 0,
  labelOffsetY: 0,
  labelText: 'normal',
  labelMaxResolution: 1200,
  labelAlign: 'center',
  labelBaseline: 'middle',
  labelRotationDegree: 0,
  labelFontWeight: 'normal',
  labelPlacement: 'point',
  labelMaxAngleDegree: 0.7853981633974483,
  labelOverflow: false,
  labelLineHeight: 1,
  visibleOnMap: true,
  icon: {},
};

export function hexToRgba(hex, opacity = 100) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const a = opacity * 0.01;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function generateLayerStylePoint(style, feature, resolution) {
  const { icon } = style;
  return new Style({
    image: icon?.url ? createIconMarker(style) : createCircleMarker(style),
    text: createTextStyle(style, feature, resolution),
  });
}

export function generateLayerStylePolygon(style, feature, resolution) {
  const {
    lineColor,
    lineOpacity,
    fillColor,
    fillOpacity,
    lineThickness,
    dashline,
  } = style;
  return new Style({
    stroke: new Stroke({
      color: hexToRgba(lineColor, lineOpacity),
      width: lineThickness,
      lineDash: [dashline],
    }),
    fill: new Fill({
      color: hexToRgba(fillColor, fillOpacity),
    }),
    text: createTextStyle(style, feature, resolution),
  });
}

export function generateLayerStyleLine(style, feature, resolution) {
  return new Style({
    stroke: new Stroke({
      color: hexToRgba(style.lineColor, style.lineOpacity),
      width: style.lineThickness,
    }),
    fill: new Fill({
      color: hexToRgba(style.fillColor, style.fillOpacity),
    }),
    text: createTextStyle(style, feature, resolution),
  });
}

export function getStyles({ style, feature, resolution }) {
  switch (style.type) {
    case 'Point':
      return generateLayerStylePoint(style, feature, resolution);
    case 'Polygon':
      return generateLayerStylePolygon(style, feature, resolution);
    case 'LineString':
      return generateLayerStyleLine(style, feature, resolution);

    default:
      return generateLayerStylePolygon(style, feature, resolution);
  }
}
