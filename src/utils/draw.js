import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { transformExtent } from 'ol/proj';
import DrawRegular from 'ol-ext/interaction/DrawRegular';

export const drawTool = (map, setExtent) => {
        // New vector layer
        var drawVector = new VectorLayer({
            name: 'Vecteur',
            source: new VectorSource()
        });
        map.addLayer(drawVector);

        var drawInteraction = new DrawRegular({
            source: drawVector.getSource(),
            sides: 4,
        });
        map.addInteraction(drawInteraction);
        drawInteraction.on('drawend', e => { 
            setExtent(transformExtent(e.feature.getGeometry().getExtent(), 'EPSG:3857', 'EPSG:4326')) 
            map.removeInteraction(drawInteraction);
        });
}