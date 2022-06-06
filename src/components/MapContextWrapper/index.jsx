/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MapContext from '../MapContext';
import MapContainer from '../MapContainer';

const MapContextWrapper = ({ providerValue, children, ...rest }) => {
  return (
    <MapContext.Provider value={providerValue}>
      <MapContainer {...rest}>{children}</MapContainer>
    </MapContext.Provider>
  );
};

MapContextWrapper.defaultProps = {
  providerValue: {},
};

MapContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  providerValue: PropTypes.object,
};

export default MapContextWrapper;
