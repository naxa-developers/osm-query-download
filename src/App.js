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
import Draw from 'ol/interaction/Draw';
import "./styles/styles.scss";
import "ol/ol.css";
import Select from 'react-select';
import { OSM } from './osm_const';
import OverpassFrontend from 'overpass-frontend';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import { transformExtent } from "ol/proj"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import StorageIcon from '@mui/icons-material/Storage';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logo from './assets/images/logo_n.png';
import Grid from '@mui/material/Grid';
import { downloadFeature } from "./utils/download";
import { handleUpload } from "./utils/upload";
import SettingModal from './components/Modal/setting';
import { DataGrid } from '@mui/x-data-grid';
import SidePanel from "./components/ui/sidepanel";
import { styles } from './utils/style';


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
  const [extent, setExtent] = useState(null);

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
    if (osmkey && osmvalue) {
      var extent = transformExtent(map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326')
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
              style: feature => styles[feature.getGeometry().getType()]
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
    } else { console.log('no query') }
  }

  const clearMap = () => {
    const layers = [...map.getLayers().getArray()];
    layers.forEach((layer, index) => { if (index !== 0) { map.removeLayer(layer) } });
  }

  let draw; // global so we can remove it later
  const addInteraction = () => {
    const vector = new VectorLayer({
      source: new VectorSource({ wrapX: false }),
    });
    map.addLayer(vector);
    draw = new Draw({
      source: new VectorSource({ wrapX: false }),
      type: "Polygon",
    });
    map.addInteraction(draw);
  }

  const removeInteraction = () => {
    map.removeInteraction(draw);
  }

  const handleDraw = () => {
    if (draw) {
      removeInteraction();
    }
    else {
      addInteraction();
    }
  }

  return (
    <div className="App">
      <Grid container spacing={2} className="top-bar">
        <Grid item xs={1}>
          <img src={Logo} className="App-logo" alt="logo" height={40} />
        </Grid>
        <Grid item xs={2}>
          <Select options={keyOptions} onChange={e => onChange(e.value)} />
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <Select options={valueOptions} onChange={e => setOsmvalue(e.value)} />
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Advance Options">
                <IconButton onClick={handleOpen}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Tooltip title="Draw">
            <Button variant="fill" startIcon={<HighlightAltIcon />} onClick={handleDraw}>
              Draw
            </Button>
          </Tooltip>
          <Tooltip title="Upload">
            <Button variant="fill" startIcon={<CloudUploadIcon />} onClick={() => handleUpload(map)}>
              Upload
            </Button>
          </Tooltip>
          <Button variant="outlined" startIcon={<SearchIcon />} onClick={OSMQuery}>
            Query
          </Button>
          <Button variant="fill" startIcon={<StorageIcon />} onClick={() => {}}>
            Data
          </Button>
          <Tooltip title="Clear">
            <Button variant="fill" startIcon={<DeleteIcon />} onClick={clearMap}>
              Clear
            </Button>
          </Tooltip>
          <Tooltip title="Download">
            <Button variant="fill" startIcon={<CloudDownloadIcon />} onClick={() => downloadFeature(map)}>
              Download
            </Button>
          </Tooltip>
          <Tooltip title="Setting">
            <Button variant="fill" startIcon={<SettingsIcon />} onClick={handleOpen}>
              Settings
            </Button>
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
      {/* <SidePanel /> */}
      </MapContextWrapper>
      <SettingModal open={open} handleClose={handleClose} />
    </div >
  );
}
