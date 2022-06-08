import { useState } from "react";
import { fromLonLat } from "ol/proj";
import { osm } from "./components/Source";
import MapContextWrapper from "./components/MapContextWrapper";
import TileLayer from "./components/Layers/TileLayer";
import useOLMap from "./components/useOLMap";
import SettingModal from './components/Modal/setting';
import TopBar from "./components/ui/topBar";

export default function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { mapRef, map } = useOLMap({ scaleBar: false });
  
  return (
    <div className="App">
      <TopBar map={map} setOpen={setOpen}/>
      <MapContextWrapper
        mapRef={mapRef}
        providerValue={{ map }}
        zoom={12}
        center={fromLonLat([84.5, 28.3])}
        className="map"
      >
        <TileLayer source={osm()} zIndex={0} type="base" title="OSM Base Map" />
      </MapContextWrapper>
      <SettingModal open={open} handleClose={handleClose} />
    </div >
  );
}
