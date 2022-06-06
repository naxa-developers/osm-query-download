import { useContext, useEffect } from 'react';
import { Graticule } from 'ol';
import { Stroke } from 'ol/style';
import MapContext from '../MapContext';

const Grid = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return () => {};

    const graticule = new Graticule({
      strokeStyle: new Stroke({
        color: 'black',
        width: 0.5,
      }),
      showLabels: true,
      wrapX: false,
    });

    map.addLayer(graticule);
    graticule.setZIndex(20);

    return () => {
      if (map) {
        map.removeLayer(graticule);
      }
    };
  }, [map]);

  return null;
};

export default Grid;
