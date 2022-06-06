/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import OLVectorLayer from "ol/layer/Vector";
import { defaultStyles, getStyles } from "../helpers/layerStyleUtils";

import MapContext from "../MapContext";
import { vector } from "../Source";

export const VectorLayer = ({ geojson, style, zIndex, title, zoomToLayer }) => {
  const { map } = useContext(MapContext);
  const [vectorLayer, setVectorLayer] = useState(null);

  useEffect(() => {
    return () => map && vectorLayer && map.removeLayer(vectorLayer);
  }, [map, vectorLayer]);

  useEffect(() => {
    if (!map) return;

    const vectorLyr = new OLVectorLayer({
      source: vector({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: get("EPSG:3857")
        })
      })
      // title,
    });

    setVectorLayer(vectorLyr);
  }, [map, geojson, title]);

  useEffect(() => {
    if (!map || !vectorLayer) return;
    if (style.visibleOnMap) {
      map.addLayer(vectorLayer);
    } else {
      map.removeLayer(vectorLayer);
    }
  }, [map, vectorLayer, style.visibleOnMap]);

  useEffect(() => {
    if (!vectorLayer || !style.visibleOnMap) return;
    vectorLayer.setStyle((feature, resolution) =>
      getStyles({ style, feature, resolution })
    );
  }, [vectorLayer, style]);

  useEffect(() => {
    if (!vectorLayer) return;
    vectorLayer.setZIndex(zIndex);
  }, [vectorLayer, zIndex]);

  useEffect(() => {
    if (!map || !vectorLayer || !zoomToLayer) return;
    map.getView().fit(vectorLayer.getSource().getExtent(), {
      padding: [50, 50, 50, 50],
      duration: 900,
      constrainResolution: true
    });
  }, [map, vectorLayer, zoomToLayer]);

  return null;
};

VectorLayer.defaultProps = {
  zIndex: 0,
  style: { ...defaultStyles },
  title: "Vector Layer",
  zoomToLayer: false
};

VectorLayer.propTypes = {
  geojson: PropTypes.object.isRequired,
  style: PropTypes.object,
  zIndex: PropTypes.number,
  title: PropTypes.string,
  zoomToLayer: PropTypes.bool
  // Context: PropTypes.object.isRequired,
};

export default VectorLayer;
