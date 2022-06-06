import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MapContext from '../MapContext';
import CustomControl from './CustomControl';

const DrawControl = ({ label }) => {
  const { map } = useContext(MapContext);
  const controlRef = useRef(null);

  useEffect(() => {
    if (!map) return () => {};

    const drawControl = new CustomControl({ ref: controlRef });
    map.controls.push(drawControl);

    return () => map.controls.remove(drawControl);
  }, [map]);

  return (
    <div ref={controlRef} className="draw-control ol-unselectable ol-control">
      {label}
    </div>
  );
};

DrawControl.propTypes = {
  label: PropTypes.string.isRequired,
};

export default DrawControl;
