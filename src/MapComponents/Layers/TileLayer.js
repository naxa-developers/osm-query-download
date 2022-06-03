/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import OLTileLayer from 'ol/layer/Tile';

import MapContext from '../MapContext';

export const TileLayer = ({ source, zIndex, type, title, visible }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return () => {};

    const tileLayer = new OLTileLayer({
      source,
      type,
      zIndex,
      title,
      visible,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
    // }, [map, source, title, type, visible, zIndex]);
  }, [map]);

  return null;
};

TileLayer.defaultProps = {
  type: 'layer',
  title: '',
  visible: true,
  zIndex: 0,
};

TileLayer.propTypes = {
  source: PropTypes.object.isRequired,
  zIndex: PropTypes.number,
  type: PropTypes.string,
  title: PropTypes.string,
  // Context: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};

export default TileLayer;
