/* eslint-disable consistent-return */
import { useRef, useState, useEffect } from 'react';
import Map from 'ol/Map';
import { View } from 'ol';
import * as olExtent from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import { ScaleLine, defaults as defaultControls } from 'ol/control';

function scaleControl() {
  const control = new ScaleLine({
    units: 'metric',
    bar: true,
    steps: 4,
    text: true,
    minWidth: 140,
  });
  return control;
}

const useOLMap = ({ scaleBar = false }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [renderComplete, setRenderComplete] = useState(null);

  useEffect(() => {
    const options = {
      layers: [],
      controls: [],
      overlays: [],
      view: new View({
        center: [9508595.54043558, 3212952.3094566735 ], //V
        zoom: 14, //14
      }),
      target: mapRef.current,
    };
    const mapInstance = new Map(options);
    setMap(mapInstance);

    mapInstance.addControl(scaleControl());

    return () => mapInstance.setTarget(undefined);
  }, [scaleBar]);

  useEffect(() => {
    if (!map) return;

    function onRenderComplete() {
      const extent = olExtent.createEmpty();
      const layers = map.getLayers();
      layers.forEach(layer => {
        if (layer instanceof VectorLayer) {
          olExtent.extend(extent, layer.getSource().getExtent());
        }
      });
      if (extent[0] !== Infinity) {
        setTimeout(() => {
          setRenderComplete(true);
        }, 500);
        map.un('rendercomplete', onRenderComplete);
      }
    }
    map.on('rendercomplete', onRenderComplete);

    return () => map && map.un('rendercomplete', onRenderComplete);
  }, [map]);

  return { mapRef, map, renderComplete };
};

export default useOLMap;
