import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { get } from "ol/proj";
import shp from 'shpjs';
import { styles } from './style';
import Select from 'ol/interaction/Select';
import { singleClick }from 'ol/events/condition';
import { transformExtent } from 'ol/proj';
import PopupFeature from 'ol-ext/overlay/PopupFeature';

export const handleUpload = (map, setExtent) => {
    // Select  interaction
    var select = new Select({
        hitTolerance: 5,
        multi: true,
        condition: singleClick
    });
    map.addInteraction(select);
    const visualizer = json => {
        var geojson = new GeoJSON({ featureProjection: get("EPSG:3857") }).readFeatures(json);
        var vector = new VectorLayer({
            source: new VectorSource({
                features: geojson,
            }),
            style: feature => styles[feature.getGeometry().getType()]
        });
        map.addLayer(vector);
        map.getView().fit(vector.getSource().getExtent());
        setExtent(transformExtent(vector.getSource().getExtent(), 'EPSG:3857', 'EPSG:4326'));
        var popup = new PopupFeature({
            popupClass: 'default anim',
            select: select,
            canFix: true,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            },
            template: {
                title: {'name': 'name'},
                attribute: {},
            }
        });
        map.addOverlay(popup);
    }

    var inputNode = document.createElement('input');
    inputNode.setAttribute('type', 'file');
    inputNode.setAttribute('accept', '.geojson,.gpx,.csv,.kml,.wkt,.zip');
    inputNode.addEventListener("change", e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        var parts = file.name.split('.');
        var ext = parts[parts.length - 1];

        if (ext.toLowerCase() === "zip") {
            file.arrayBuffer().then(function (arrayBufferData) {
                shp(arrayBufferData).then(function (data) {
                    visualizer(data);
                });
            });
        } else {
            reader.onload = function (e) {
                var json = JSON.parse(e.target.result);
                visualizer(json);
            };
        }
        reader.readAsText(file);
    });
    inputNode.click();
}