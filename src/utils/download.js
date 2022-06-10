import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol/index';
import { GeoJSON } from 'ol/format';
import shpwrite from 'shp-write'

export const downloadFeature = (map, osmvalue, format) => {
    var options = {
        folder: osmvalue,
        types: {
            point: osmvalue + '_points',
            polygon: osmvalue + '_polygons',
            line: osmvalue + '_lines'
        }
    }
    if (map) {
        const layers = [...map.getLayers().getArray()];
        var geom = [];
        layers.forEach((layer, index) => {
            if (index !== 0) {
                geom.push(new Feature(layer.getSource().getFeatures()[0].getGeometry().transform('EPSG:3857', 'EPSG:4326')))
            }
        });
        var downloadGeometry = new VectorLayer({
            source: new VectorSource({
                features: geom,
            }),
        });
        var json = new GeoJSON().writeFeatures(downloadGeometry.getSource().getFeatures());
        if (format === 'geojson') {
            var blob = new Blob([json], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'download.geojson';
            a.click();
        } else {
            shpwrite.download(JSON.parse(json), options);
        }
    }
}