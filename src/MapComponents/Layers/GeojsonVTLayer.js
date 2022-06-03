/* eslint-disable prefer-destructuring */
import { useContext, useEffect } from "react";
import geojsonvt from "geojson-vt";
import GeoJSON from "ol/format/GeoJSON";
import Projection from "ol/proj/Projection";
import VectorTileSource from "ol/source/VectorTile";
import { VectorTile as VectorTileLayer } from "ol/layer";
import MapContext from "../MapContext";
import { transformExtent } from "ol/proj";
import bbox from "@turf/bbox";

// Converts geojson-vt data to GeoJSON
var replacer = function (key, value) {
  if (value.geometry) {
    var type;
    var rawType = value.type;
    var geometry = value.geometry;

    if (rawType === 1) {
      type = "MultiPoint";
      if (geometry.length === 1) {
        type = "Point";
        geometry = geometry[0];
      }
    } else if (rawType === 2) {
      type = "MultiLineString";
      if (geometry.length === 1) {
        type = "LineString";
        geometry = geometry[0];
      }
    } else if (rawType === 3) {
      type = "Polygon";
      if (geometry.length > 1) {
        type = "MultiPolygon";
        geometry = [geometry];
      }
    }

    return {
      type: "Feature",
      geometry: {
        type: type,
        coordinates: geometry
      },
      properties: value.tags
    };
  } else {
    return value;
  }
};

const GeojsonVTLayer = ({ geojson }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const tileIndex = geojsonvt(geojson, {
      extent: 4096,
      debug: 0
    });

    const format = new GeoJSON({
      // Data returned from geojson-vt is in tile pixel units

      dataProjection: new Projection({
        code: "TILE_PIXELS",
        units: "tile-pixels",
        extent: [0, 0, 4096, 4096]
      })
    });
    const vectorSource = new VectorTileSource({
      tileUrlFunction: (tileCoord) => {
        // Use the tile coordinate as a pseudo URL for caching purposes
        return JSON.stringify(tileCoord);
      },
      tileLoadFunction: (tile, url) => {
        const tileCoord = JSON.parse(url);
        const data = tileIndex.getTile(
          tileCoord[0],
          tileCoord[1],
          tileCoord[2]
        );
        const geojsonObj = JSON.stringify(
          {
            type: "FeatureCollection",
            features: data ? data.features : []
          },
          replacer
        );
        const features = format.readFeatures(geojsonObj, {
          extent: vectorSource.getTileGrid().getTileCoordExtent(tileCoord),
          featureProjection: map.getView().getProjection()
        });
        tile.setFeatures(features);
      }
    });
    const vectorLayer = new VectorTileLayer({
      source: vectorSource,
      renderMode: "vector"
    });
    map.addLayer(vectorLayer);
  }, [map, geojson]);

  useEffect(() => {
    if (!map) return;

    const extent = transformExtent(bbox(geojson), "EPSG:4326", "EPSG:3857");
    // map.getView().fit(extent);

    // const extent = transformExtent(
    //   new Vector({
    //     features: new GeoJSON().readFeatures(geojson)
    //   }).getExtent(),
    //   "EPSG:4326",
    //   "EPSG:3857"
    // );
    // map.getView().fit(extent);
  }, [map, geojson]);

  return null;
};

export default GeojsonVTLayer;
