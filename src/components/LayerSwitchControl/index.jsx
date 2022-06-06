import { useContext, useEffect } from 'react';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import MapContext from '../MapContext';

const layerSwitcher = new LayerSwitcher();

const LayerSwitchControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (map) {
      map.addControl(layerSwitcher);
    }
  }, [map]);

  return null;
};

export default LayerSwitchControl;
