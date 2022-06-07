import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol/index';
import { GeoJSON } from 'ol/format';
import shpwrite from 'shp-write'

export const downloadFeature = map => {
    var options = {
        folder: 'myshapes',
        types: {
            point: 'mypoints',
            polygon: 'mypolygons',
            line: 'mylines'
        }
    }
    if (map) {
        const layers = [...map.getLayers().getArray()];
        var geom = [];
        layers.forEach((layer, index) => {
            if (index !== 0) {
                geom.push(new Feature(layer.getSource().getFeatures()))
            }
        });
        var downloadGeometry = new VectorLayer({
            source: new VectorSource({
                features: geom,
            }),
        });
        var json = new GeoJSON().writeFeatures(downloadGeometry.getSource().getFeatures(), {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:4326'});
        console.log(json)
        // shpwrite.download({
        //     type: 'FeatureCollection',
        //     features: [
        //         {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [0, 0]
        //             },
        //             properties: {
        //                 name: 'Foo'
        //             }
        //         },
        //         {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [0, 10]
        //             },
        //             properties: {
        //                 name: 'Bar'
        //             }
        //         }
        //     ]
        // }, options);
        // var blob = new Blob([json], { type: 'application/json' });
        // var url = URL.createObjectURL(blob);
        // var a = document.createElement('a');
        // a.href = url;
        // a.download = 'download.geojson';
        // a.click();
    }
}