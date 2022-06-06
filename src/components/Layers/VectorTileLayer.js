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

    const vectorLyr = new VectorTileLayer({
      source: new VectorTileSource({
        // attributions:
        //   '&copy; OpenStreetMap contributors, Who’s On First, ' +
        //   'Natural Earth, and openstreetmapdata.com',
        format: new MVT(),
        // format: new GeoJSON({
        // layerName: 'file_data',
        // layers: ['water', 'roads', 'buildings'],
        // }),
        maxZoom: 19,
        // url:"https://pccmis.karnali.gov.np/api/v1/layer_vectortile/{z}/{x}/{y}/?layer=district&pro_code=",
        // url:"http://0.0.0.0:8000/api/maps/layer_vectortile/{z}/{x}/{y}/?layer=197&sub_layer=44",
        // url:"https://pgis.naxa.com.np/api/maps/layer_vectortile/{z}/{x}/{y}/?layer=76&sub_layer=",
        // url:"https://changu-stag.naxa.com.np/api/v1/maps/layer_vectortile/{z}/{x}/{y}/?layer_id=1116",
        url:"https://vectortile.naxa.com.np/federal/district.mvt/?tile=5/23/13&province_id=3",



        preload: 2 ,
        // url : "http://naxa.kobo.local/api-core/features/postgis/tile/{z}/{x}/{y}"
        // url : "http://naxa.kobo.local/api-core/layer-tile/576/{z}/{x}/{y}/",
        // renderMode: "vector",
        
// url: 'http://naxa.kobo.local/api-core/layer-tile-query/576/{z}/{x}/{y}/?expression=[{"field": "HRRP_DNAME" , "operator": 1 , "value":"Myagdi"}]',
        // url: "https://naxamapper.com/api-core/layer-tile/110/{z}/{x}/{y}",
        // url: "https://naxamapper.com/api-core/layer-tile/88/tile/{z}/{x}/{y}"
        // url: `https://tile.nextzen.org/tilezen/vector/v1/all/{z}/{x}/{y}.topojson`,
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
  }, [map]);

  return null;
};

export default VectorTileLyr;




