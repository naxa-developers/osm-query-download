import { useCallback, useContext, useEffect, useState } from 'react';
import * as olExtent from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import MapContext from '../MapContext';

const ZoomToExtent = ({ active = true }) => {
  const { map } = useContext(MapContext);
  const [mapRendered, setMapRendered] = useState(false);

  const zoomToOverallExtent = useCallback(() => {
    const extent = olExtent.createEmpty();
    const layers = map.getLayers();
    layers.forEach(layer => {
      if (layer instanceof VectorLayer) {
        olExtent.extend(extent, layer.getSource().getExtent());
      }
    });
    if (extent[0] !== Infinity) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 500,
        constrainResolution: true,
      });
      setMapRendered(true);
      map.un('rendercomplete', zoomToOverallExtent);
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.on('rendercomplete', zoomToOverallExtent);
  }, [map, zoomToOverallExtent]);

  useEffect(() => {
    if (!map || !mapRendered) return;
    const extent = olExtent.createEmpty();
    const layers = map.getLayers();
    layers.forEach(layer => {
      if (layer instanceof VectorLayer) {
        olExtent.extend(extent, layer.getSource().getExtent());
      }
    });
    if (extent[0] !== Infinity) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 500,
        constrainResolution: true,
      });
    }
  }, [map, active, mapRendered]);

  return null;
};

export default ZoomToExtent;
