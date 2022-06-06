/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const MapContainer = ({ mapRef, children, ...rest }) => {
  return (
    <div ref={mapRef} id="ol-map" className="ol-map" {...rest}  >
      {children}
    </div>
  );
};

MapContainer.propTypes = {
  children: PropTypes.node.isRequired,
  mapRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

export default MapContainer;
