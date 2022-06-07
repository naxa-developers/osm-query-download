import { Circle, Fill, Style, Stroke } from 'ol/style';

export const styles =  {
    'Point': [new Style({
        image: new Circle({
            fill: new Fill({ color: [255,255,255,1] }),
            stroke: new Stroke({ color: [0,0,0,1] }),
            radius: 5
        })
    })],
    'LineString': [new Style({
        stroke: new Stroke({
            color: localStorage.getItem('lineColor') || 'green',
            width: 1
        })
    })],
    'Polygon': [new Style({
        stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    })],
    'MultiLineString': [new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1
        })
    })],
    'MultiPoint': [new Style({
        image: new Circle({
            fill: new Fill({ color: [255,255,255,1] }),
            stroke: new Stroke({ color: [0,0,0,1] }),
            radius: 5
        })
    })],
    'MultiPolygon': [new Style({
        stroke: new Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    })],
    'GeometryCollection': [new Style({
        stroke: new Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new Fill({
            color: 'magenta'
        }),
        image: new Circle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta'
            })
        })
    })],
    'Circle': [new Style({
        stroke: new Stroke({
            color: 'red',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })]
};
