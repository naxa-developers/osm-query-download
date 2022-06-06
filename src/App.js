import { useState } from "react";
import { fromLonLat } from "ol/proj";
import { osm } from "./components/Source";
import MapContextWrapper from "./components/MapContextWrapper";
import TileLayer from "./components/Layers/TileLayer";
import useOLMap from "./components/useOLMap";
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle, Fill, Style, Stroke } from 'ol/style';
import { Feature } from 'ol/index';
import "./styles/styles.scss";
import "ol/ol.css";
import Select from 'react-select';
import { OSM } from './osm_const';
import OverpassFrontend from 'overpass-frontend';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import { GeoJSON } from 'ol/format';
import { transformExtent } from "ol/proj"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logo from './assets/images/logo_n.png';
import Grid from '@mui/material/Grid';
import { get } from "ol/proj";
import { downloadFeature } from "./utils/download";
import SettingModal from './components/Modal/setting';
import Shapefile from "./utils/shapefile";
import zipUrl from './assets/shp.zip';

const overpassFrontend = new OverpassFrontend('//overpass-api.de/api/interpreter')

const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export default function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mapRef, map } = useOLMap({ scaleBar: false });
  const [osmkey, setOsmkey] = useState(null);
  const [osmvalue, setOsmvalue] = useState(null);
  const [valueOptions, setValueOptions] = useState([]);

  var keyOptions = []

  Object.keys(OSM).forEach(key => {
    keyOptions.push({ value: key, label: toTitleCase(key).replace('_', " ") })
  });

  const onChange = e => {
    var a = []
    OSM[e].forEach(value => a.push({ value: value, label: toTitleCase(value).replace('_', " ") }))
    setValueOptions(a);
    setOsmkey(e);
  }

  const OSMQuery = () => {
    const extent = transformExtent(map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326')
    overpassFrontend.BBoxQuery(
      `nwr[${osmkey}=${osmvalue}]`,
      { minlat: extent[1], maxlat: extent[3], minlon: extent[0], maxlon: extent[2] },
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
            style: new Style({
              image: new Circle({
                radius: 5,
                fill: new Fill({ color: 'red' }),
              }),
            }),
            //   eventListeners:{
            //     'featureselected':function(evt){
            //         var feature = evt.feature;
            //         var popup = new Popup.FramedCloud("popup",
            //             OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
            //             null,
            //             feature.attributes.message+"<br>"+feature.attributes.location,
            //             null,
            //             true,
            //             null
            //         );
            //         popup.autoSize = true;
            //         popup.maxSize = new OpenLayers.Size(400,800);
            //         popup.fixedRelativePosition = true;
            //         feature.popup = popup;
            //         map.addPopup(popup);
            //     },
            //     'featureunselected':function(evt){
            //         var feature = evt.feature;
            //         map.removePopup(feature.popup);
            //         feature.popup.destroy();
            //         feature.popup = null;
            //     }
            // }
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
              style: new Style({
                stroke: new Stroke({
                  color: 'blue',
                  width: 3,
                }),
              }),
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
              style: new Style({
                stroke: new Stroke({
                  color: 'yellow',
                  width: 2,
                }),
                fill: new Fill({
                  color: 'rgba(0, 255, 0, 0.5)',
                }),
              }),
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
  }

  const clearMap = () => {
    const layers = [...map.getLayers().getArray()];
    layers.forEach((layer, index) => { if (index !== 0) { map.removeLayer(layer) } });
  }

  // const downloadFeature = () => {
  //   const layers = [...map.getLayers().getArray()];
  //   var geom = [];
  //   layers.forEach((layer, index) => {
  //     if (index !== 0) {
  //       geom.push(new Feature(layer.getSource().getFeatures()))
  //     }
  //   });
  //   var downloadGeometry = new VectorLayer({
  //     source: new VectorSource({
  //       features: geom,
  //     }),
  //   });
  //   var json = new GeoJSON().writeFeatures(downloadGeometry.getSource().getFeatures(), {
  //     featureProjection: 'EPSG:4326'
  //   });
  //   var blob = new Blob([json], { type: 'application/json' });
  //   var url = URL.createObjectURL(blob);
  //   var a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'download.geojson';
  //   a.click();
  // }

  // Add Vector Layers
  // function vectorData(){
  //   var inputNode = document.createElement('input');
  // 			inputNode.setAttribute('type','file');
  //       inputNode.setAttribute('id','leaflet-draw-shapefile-selector');
  // 			inputNode.setAttribute('accept','.geojson,.gpx,.csv,.kml,.wkt');

  // 			inputNode.addEventListener("change", function(e){
  // 				var files = inputNode.files;
  //         var file = files[0];
  //         var parts = file.name.split('.');
  //         var ext = parts[parts.length - 1];

  //         if(ext.toLowerCase() == "geojson"){
  //           geoJsonData(file);
  //         } else if(ext.toLowerCase() == "gpx"){
  //           gpxData(file);
  //         }else if(ext.toLowerCase() == "csv"){
  //           csvData(file);
  //         }else if(ext.toLowerCase() == "kml"){
  //           kmlData(file);
  //         }else if(ext.toLowerCase() == "wkt"){
  //           wktData(file);
  //         }
  //       });


  const handleUpload = e => {
    var inputNode = document.createElement('input');
    inputNode.setAttribute('type', 'file');
    inputNode.setAttribute('id', 'leaflet-draw-shapefile-selector');
    inputNode.setAttribute('accept', '.geojson,.gpx,.csv,.kml,.wkt');
    inputNode.addEventListener("change", function (e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var json = JSON.parse(e.target.result);
        var geojson = new GeoJSON({ featureProjection: get("EPSG:3857") }).readFeatures(json);
        var vector = new VectorLayer({
          source: new VectorSource({
            features: geojson,
          }),
          style: new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 3,
            }),
          }),
        });
        map.addLayer(vector);
        map.getView().fit(vector.getSource().getExtent());
      };
      reader.readAsText(file);
    });
    inputNode.click();
  }

  return (
    <div className="App">
      <Grid container spacing={2} className="top-bar">
        <Grid item xs={1}>
          <img src={Logo} className="App-logo" alt="logo" height={40} />
        </Grid>
        <Grid item xs={3}>
          <Select options={keyOptions} onChange={e => onChange(e.value)} />
        </Grid>
        <Grid item xs={3}>
          <Select options={valueOptions} onChange={e => setOsmvalue(e.value)} />
        </Grid>
        <Grid item xs={5} spacing={2}>
          <Tooltip title="Upload">
            <Button variant="outlined" startIcon={<CloudUploadIcon />} onClick={e => handleUpload(e)}>
              Upload
            </Button>
          </Tooltip>
          <Button variant="contained" startIcon={<SearchIcon />} onClick={OSMQuery}>
            Query
          </Button>
          <Tooltip title="Clear">
            <Button variant="fill" startIcon={<DeleteIcon />} onClick={clearMap}>
              Clear
            </Button>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton onClick={() => downloadFeature(map)}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Setting">
            <IconButton onClick={handleOpen}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <MapContextWrapper
        mapRef={mapRef}
        providerValue={{ map }}
        zoom={12}
        center={fromLonLat([84.5, 28.3])}
        className="map"
      >
        <TileLayer source={osm()} zIndex={0} type="base" title="OSM Base Map" />
        {/* <Shapefile zipUrl={zipUrl} /> */}
      </MapContextWrapper>
      <SettingModal open={open} handleClose={handleClose} />
    </div>
  );
}
