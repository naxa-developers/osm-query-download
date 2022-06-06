import * as olExtent from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';

export function getOverallLayerExtent(map) {
  const extent = olExtent.createEmpty();
  const layers = map.getLayers();
  layers.forEach(layer => {
    if (layer instanceof VectorLayer) {
      olExtent.extend(extent, layer.getSource().getExtent());
    }
  });
  return extent;
}

export function nothing() {}
