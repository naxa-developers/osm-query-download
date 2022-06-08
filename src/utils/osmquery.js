import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import { transformExtent } from "ol/proj"
import { styles } from './style';
import { Feature } from 'ol/index';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import OverpassFrontend from 'overpass-frontend';
import { fromLonLat } from "ol/proj";

const overpassFrontend = new OverpassFrontend('//overpass-api.de/api/interpreter')

export const OSMQuery = (map, osmkey, osmvalue, setSnackbarOpen, extent) => {
    if (osmkey && osmvalue) {
      var mapextent = transformExtent(map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326')
      if(extent) {mapextent = extent}
      overpassFrontend.BBoxQuery(
        `nwr[${osmkey}=${osmvalue}]`,
        { minlat: mapextent[1], maxlat: mapextent[3], minlon: mapextent[0], maxlon: mapextent[2] },
        {
          properties: OverpassFrontend.ALL
        },
        function (err, result) {
          if (result.data.type === 'node') {
            var marker = new Point(fromLonLat([result.geometry.lon, result.geometry.lat]));
            var point = new VectorLayer({
              source: new VectorSource({
                features: [new Feature(marker)],
              }),
              style: feature => styles[feature.getGeometry().getType()]
            });
            map.addLayer(point);
          }
          else if (result.data.type === 'way') {
            var linekeys = ['highway', 'cycleway', 'railway', 'route', 'waterway']
            if (linekeys.includes(osmkey)) {
              var linearray = [];
              result.geometry.forEach(point => {
                linearray.push(fromLonLat([point.lon, point.lat]))
              })
              var line = new LineString(linearray);
              var feature = new Feature(line);
              var linelayer = new VectorLayer({
                source: new VectorSource({
                  features: [feature],
                }),
                style: feature => styles[feature.getGeometry().getType()]
              });
              map.addLayer(linelayer);
            }
            else {
              var polyarray = [];
              result.geometry.forEach(point => {
                polyarray.push(fromLonLat([point.lon, point.lat]))
              })
              var polygon = new Polygon([polyarray]);
              var polygonFeature = new Feature(polygon);
              var polygonLayer = new VectorLayer({
                source: new VectorSource({
                  features: [polygonFeature],
                }),
                style: feature => styles[feature.getGeometry().getType()]
              });
              map.addLayer(polygonLayer);
            }
          }
          else { console.log('relation', result) }
        },
        function (err) {
          if (err) { console.log(err) }
        }
      );
    } else { setSnackbarOpen(true) }
  }