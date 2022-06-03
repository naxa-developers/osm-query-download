import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { legendItemsSelector } from '@src/selectors/mapData';
import './legend.scss';
import { isEmpty } from '@src/utils/commonUtils';
import LegendItem from '../../../MapPage/MidSection/LegendItem';

const MapLegend = () => {
  const legendItems = useSelector(legendItemsSelector);
  const layerStyles = useSelector(state => state.mapData.layerStyles);

  const getLayerStyle = useCallback(id => layerStyles[id], [layerStyles]);

  if (isEmpty(legendItems)) return <></>;

  return (
    <div className="map-legend" id="map-legend">
      <h5>Legend</h5>
      <div className="legend-container">
        {legendItems.map(({ id, name }) => (
          <div key={id} className="legend-item">
            <LegendItem styles={getLayerStyle(id)} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
