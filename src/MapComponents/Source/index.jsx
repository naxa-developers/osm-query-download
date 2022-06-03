import { BingMaps, OSM, Vector as VectorSource, XYZ } from 'ol/source';

export const osm = () => {
  return new OSM();
};

export const vector = ({ features }) => {
  return new VectorSource({
    features,
  });
};

export const xyz = ({ url, attributions, maxZoom, layer }) => {
  return new XYZ({ url, attributions, maxZoom, layer });
};

export const bingMaps = ({ key, imagerySet, maxZoom }) => {
  return new BingMaps({ key, imagerySet, maxZoom });
};
