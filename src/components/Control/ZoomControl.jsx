import { useContext, useEffect } from 'react';
import { Zoom } from 'ol/control';

import MapContext from '../MapContext';

const ZoomControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return () => {};

    const zoomControl = new Zoom({});

    map.controls.push(zoomControl);

    return () => map.controls.remove(zoomControl);
  }, [map]);

  return null;
};

export default ZoomControl;
