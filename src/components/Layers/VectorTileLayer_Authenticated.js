

import { useContext, useEffect } from "react";
import VectorTileLayer from "ol/layer/VectorTile";
import MVT from "ol/format/MVT";
import GeoJSON from "ol/format/GeoJSON";
import TopoJSON from "ol/format/TopoJSON";
import VectorTileSource from "ol/source/VectorTile";
import MapContext from "../MapContext";

const VectorTileLyr = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    const requestHeader = new Headers();
    // JWT Authentication
    // requestHeader.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MTMwNjA2LCJqdGkiOiIyYTlmNGU3NTkxNmU0NTgyYjcyODNhNmY5NTJiZTM0MiIsInVzZXJfaWQiOjM0fQ.uomkPZSNY-xZDHIcQHeWusjLlNCyf0_5DYZicztuOkA');
    // Token Authentication
    requestHeader.append('Authorization', 'Token a2f346531b37729338682c9b0b2474c15c545687'); 

    const vectorLyr = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        maxZoom: 19,
        url:"https://changu-stag.naxa.com.np/api/v1/metric_addressing/layer_vectortile/{z}/{x}/{y}/?layer_id=1102&search_key=",
        transition: 0,
        tileLoadFunction: (tile, vtUrl) => {
          tile.setLoader((extent, resolution, projection) => {
            fetch(vtUrl, {
              headers: requestHeader,
            }).then((response) => {
              response.arrayBuffer().then((data) => {
                const format = tile.getFormat();
                const features = format.readFeatures(data, {
                  extent,
                  featureProjection: projection,
                });
                tile.setFeatures(features);
              });
            });
          });
        },

        preload: 2 ,
      })
    });

    console.log(vectorLyr, "This is the vectorlayer")



    map.addLayer(vectorLyr);
    map.on('click', function vectorTileSelect(event) {
      map.forEachFeatureAtPixel(
        event.pixel,
        function eachFeatures(feature) {
          console.log({ feature });
        },
        {
          hitTolerance: 2,
        },
      );
    }
 
  
    )

    map.on('click', function(evt){
      console.info(evt.pixel);
      // console.info(map.getPixelFromCoordinate(evt.coordinate),"cooooooords");
      console.log(evt.coordinate,"evt.coordinate")
      // console.info(ol.proj.toLonLat(evt.coordinate));
      // var coords = ol.proj.toLonLat(evt.coordinate);
      // var lat = coords[1];
      // var lon = coords[0];
      // var locTxt = "Latitude: " + lat + " Longitude: " + lon;
      // // coords is a div in HTML below the map to display
      // document.getElementById('coords').innerHTML = locTxt;
  })

  }, [map]);
  return null;
};

export default VectorTileLyr;