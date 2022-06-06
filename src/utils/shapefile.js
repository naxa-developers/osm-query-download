import { useContext, useEffect } from "react";
import shp from 'shpjs';
import MapContext from "../components/MapContext";

function Shapefile({ zipUrl }) {
    const { map } = useContext(MapContext);
  
    useEffect(() => {
    //   const geo = L.geoJson(
    //     { features: [] },
    //     {
    //       onEachFeature: function popUp(f, l) {
    //         var out = [];
    //         if (f.properties) {
    //           for (var key in f.properties) {
    //             out.push(key + ": " + f.properties[key]);
    //           }
    //           l.bindPopup(out.join("<br />"));
    //         }
    //       }
    //     }
    //   ).addTo(map);
  
      shp('shp.zip').then(function (data) {
        console.log(data);
        // geo.addData(data);
      });
    }, []);
  
    return null;
  }

  export default Shapefile;