import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol/index';
import { GeoJSON } from 'ol/format';
import { get } from "ol/proj";

export const downloadFeature = map => {
    if (map) {
        const layers = [...map.getLayers().getArray()];
        var geom = [];
        layers.forEach((layer, index) => {
            if (index !== 0) {
                // var f = []
                // layer.getSource().forEachFeature(v => {f.push(v.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326'))});
                // console.log(f);
                geom.push(new Feature(layer.getSource().getFeatures()))
            }
        });
        var downloadGeometry = new VectorLayer({
            source: new VectorSource({
                features: geom,
            }),
        });
        var json = new GeoJSON().writeFeatures(downloadGeometry.getSource().getFeatures());
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'download.geojson';
        a.click();
    }
}