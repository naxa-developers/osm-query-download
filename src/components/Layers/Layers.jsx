/* eslint-disable react/forbid-prop-types */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const Layers = ({ children }) => {
  return <div>{children}</div>;
};

Layers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layers;
