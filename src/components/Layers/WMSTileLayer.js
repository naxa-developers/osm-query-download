/* eslint-disable consistent-return */
import { useContext, useEffect } from 'react';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import MapContext from '../MapContext';
// import { GEOSERVER_LAYER, GEOSERVER_URL } from '../../../../constants';

const GEOSERVER_URL = 'https://apps.naxa.com.np/Naxa/wms';
const GEOSERVER_LAYER = 'Naxa:lamkichuwa';
// const GEOSERVER_URL = 'https://changuportal.naxa.com.np/geoserver/wms';
// const GEOSERVER_LAYER = 'changu-agisoft';
const WMSTileLayer = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const tileLayer = new TileLayer({
      source: new TileWMS({
        crossOrigin: 'anonymous',
        url: GEOSERVER_URL,
        params: { LAYERS: GEOSERVER_LAYER, TILED: true },
        serverType: 'geoserver',
        transition: 0,
      }),
    });
    map.addLayer(tileLayer);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  return null;
};

export default WMSTileLayer;
