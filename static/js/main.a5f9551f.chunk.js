(this["webpackJsonpop-vt"]=this["webpackJsonpop-vt"]||[]).push([[0],{228:function(e,a,r){},263:function(e,a){},265:function(e,a){},419:function(e,a,r){"use strict";r.r(a);var t=r(1),n=r(97),i=r.n(n),o=r(27),s=r(54),c=r(4),l=r(423),u=r(425),p=(r(199),r(427),r(86)),d=r(130),m=Object(t.createContext)(),b=r(31),_=["mapRef","children"],y=function(e){var a=e.mapRef,r=e.children,t=Object(d.a)(e,_);return Object(b.jsx)("div",Object(p.a)(Object(p.a)({ref:a,id:"ol-map",className:"ol-map"},t),{},{children:r}))},f=["providerValue","children"],g=function(e){var a=e.providerValue,r=e.children,t=Object(d.a)(e,f);return Object(b.jsx)(m.Provider,{value:a,children:Object(b.jsx)(y,Object(p.a)(Object(p.a)({},t),{},{children:r}))})};g.defaultProps={providerValue:{}};var h=g,w=r(90),v=r.n(w),j=r(204),k=function(e){var a=e.source,r=e.zIndex,n=e.type,i=e.title,o=e.visible,s=Object(t.useContext)(m).map;return Object(t.useEffect)((function(){if(!s)return function(){};var e=new j.a({source:a,type:n,zIndex:r,title:i,visible:o});return s.addLayer(e),e.setZIndex(r),function(){s&&s.removeLayer(e)}}),[s]),null};k.defaultProps={type:"layer",title:"",visible:!0,zIndex:0},k.propTypes={source:v.a.object.isRequired,zIndex:v.a.number,type:v.a.string,title:v.a.string,visible:v.a.bool};var O=k,x=r(202),E=r(205),L=r(0),S=r(203),z=r(154);var C=function(e){var a=e.scaleBar,r=void 0!==a&&a,n=Object(t.useRef)(),i=Object(t.useState)(null),o=Object(s.a)(i,2),c=o[0],l=o[1],u=Object(t.useState)(null),p=Object(s.a)(u,2),d=p[0],m=p[1];return Object(t.useEffect)((function(){var e={layers:[],controls:[],overlays:[],view:new E.a({center:[9508595.54043558,3212952.3094566735],zoom:7}),target:n.current},a=new x.a(e);return l(a),a.addControl(new z.a({units:"metric",bar:!0,steps:4,text:!0,minWidth:140})),function(){return a.setTarget(void 0)}}),[r]),Object(t.useEffect)((function(){if(c)return c.on("rendercomplete",e),function(){return c&&c.un("rendercomplete",e)};function e(){var a=L.j();c.getLayers().forEach((function(e){e instanceof S.a&&L.q(a,e.getSource().getExtent())})),a[0]!==1/0&&(setTimeout((function(){m(!0)}),500),c.un("rendercomplete",e))}}),[c]),{mapRef:n,map:c,renderComplete:d}},R=r(149),q=r(152),B=r(132),I=r(102),P=r(201),A=(r(228),r(229),r(151)),V={aeroway:["aerodrome","apron","control_tower","control_center","gate","hangar","helipad","heliport","navigationaid","beacon","runway","taxilane","taxiway","terminal","windsock","highway_strip"],admin_level:["1","2","3","4","5","7","8","9","10","11"],amenity:["animal_boarding","animal_shelter","arts_centre","atm","bank","bar","bench","bbq","bicycle_parking","bicycle_rental","biergarten","bus_station","cafe","casino","car_rental","car_sharing","car_wash","clinic","clock","cinema","college","community_centre","coworking_space","crematorium","dentist","doctors","drinking_water","embassy","fast_food","fire_station","fountain","fuel","gambling","grave_yard","hospital","kindergarten","library","marketplace","nightclub","parking","pharmacy","place_of_worship","planetarium","police","post_box","post_office","prison","pub","recycling","restaurant","school","shelter","shower","social_facility","social_centre","swingerclub","taxi","theatre","toilets","townhall","university","vending_machine","veterinary"],boundary:["administrative","maritime","national_park","religious_administration","protected_area"],building:["apartments","commercial","farm","hotel","house","industrial","retail","yes"],crop:["bananas","barley","berry_plants","corn","dairy","dry_farming","feed_lot","field_cropland","flowers","grape","grass","hay","native_pasture","no","orchid","potatoes","poultry","rape","rice","strawberry","yes","wheat"],cuisine:["bagel","barbecue","bougatsa","burger","cake","casserole","chicken","coffee_shop","crepe","couscous","curry","dessert","donut","doughnut","empanada","fish","fish_and_chips","fried_food","friture","gyro","ice_cream","kebab","mediterranean","noodle","pancake","pasta","pie","pizza","regional","sandwich","sausage","savory_pancakes","seafood","steak_house","sub","sushi","tapas","vegan","vegetarian","wings"],craft:["agricultural_engines","basket_maker","beekeeper","blacksmith","brewery","boatbuilder","carpenter","caterer","confectionery","dressmaker","electrician","gardener","glaziery","handicraft","hvac","insulation","jeweller","key_cutter","optician","painter","photographer","plumber","roofer","tailor","watchmaker","winery"],emergency:["ambulance_station","assembly_point","defibrillator","fire_extinguisher","fire_hydrant","phone","siren","water_tank"],evacuation_center:["yes"],highway:["motorway","trunk","primary","secondary","tertiary","unclassified","residential","living_street","service","track","road","footway","pedestrian","cycleway","steps","path","construction","bus_stop","crossing","mini_roundabout","speed_camera","stop","street_lamp","traffic_signals","turning_circle"],cycleway:["lane","opposite","opposite_lane","track","opposite_track","share_busway","shared_lane"],junction:["roundabout","jughandle","filter","yes"],historic:["archaeological_site","aircraft","battlefield","boundary_stone","building","castle","cannon","city_gate","citywalls","farm","fort","manor","memorial","monument","ruins","rune_stone","ship","wayside_cross","wayside_shrine","yes"],landuse:["allotments","basin","brownfield","cemetery","commercial","construction","farm","farmland","farmyard","forest","garages","grass","greenfield","industrial","landfill","meadow","military","orchard","plant_nursery","quarry","railway","reservoir","residential","retail","vineyard"],leisure:["fishing","garden","golf_course","hackerspace","marina","miniature_golf","nature_reserve","park","pitch","playground","sports_centre","stadium","swimming_pool","track","water_park"],man_made:["chimney","cross","lighthouse","monitoring_station","pier","pipeline","surveillance","survey_point","tower","water_tower","works","yes"],natural:["bay","beach","cave_entrance","cliff","crater","coastline","fell","fumarole","glacier","grassland","heath","mud","peak","saddle","sand","scree","scrub","spring","stone","tree","tree_row","volcano","water","wetland","wood"],office:["accountant","administrative","architect","association","company","educational_institution","employment_agency","estate_agent","forestry","foundation","government","guide","insurance","it","lawyer","newspaper","ngo","notary","political_party","quango","register","religion","research","tax","telecommunication","travel_agent","water_utility"],place:["allotments","archipelago","city","continent","county","country","district","farm","hamlet","island","islet","isolated_dwelling","locality","municipality","neighbourhood","province","state","suburb","region","town","village"],power:["cable","plant","generator","line","minor_line","pole","substation","switch","tower","transformer"],produce:["berries","cassava","cereal","christmas_trees","cork","crocodile","dry_farming","fire_wood","fish","flowers","forage","hay","herbs","hide","hop","latex","lavender","live_animal","maize","maple_syrup","meat","mussels","nut","oil","olive","oysters","prawns","rape","rice","seaweed","shrimp","spice","sugarcane","sunflower","tea","timber","turf","vegetable"],public_transport:["stop_position","platform","station","stop_area"],shop:["alcohol","antiques","art","baby_goods","bakery","bag","bathroom_furnishing","beauty","bed","beverages","bicycle","books","boutique","butcher","car","car_repair","car_parts","carpet","charity","cheese","chemist","chocolate","clothes","coffee","computer","confectionery","convenience","copyshop","cosmetics","craft","curtain","deli","department_store","dairy","dry_cleaning","doityourself","electronics","erotic","fabric","farm","fashion","fishing","florist","frame","funeral_directors","furniture","general","gift","hairdresser","hardware","hearing_aids","herbalist","hifi","hunting","interior_decoration","jewelry","kiosk","kitchen","greengrocer","grocery","leather","laundry","mall","massage","medical_supply","mobile_phone","money_lender","motorcycle","music","musical_instrument","newsagent","optician","organic","outdoor","pasta","pet","photo","scuba_diving","seafood","second_hand","shoes","sports","stationery","supermarket","tailor","tattoo","tea","ticket","tobacco","toys","travel_agency","tyres","vacant","variety_store","video","video_games","water_sports","weapons","wine"],sport:["9pin","10pin","american_football","archery","athletics","australian_football","base","badminton","baseball","beachvolleyball","billiards","bmx","boules","bowls","boxing","canoe","chess","climbing","climbing_adventure","cycling","equestrian","free_flying","golf","handball","horse_racing","karting","kitesurfing","model_aerodrome","motocross","motor","multi","roller_skating","rugby_league","rugby_union","running","sailing","shooting","skateboard","skiing","soccer","swimming","tennis","volleyball"],railway:["abandoned","buffer_stop","construction","crossing","disused","funicular","halt","level_crossing","miniature","narrow_gauge","preserved","rail","station","subway","subway_entrance","switch","tram","tram_stop"],route:["bicycle","bus","ferry","hiking","mtb","pipeline","piste","power","railway","road","ski","train","tram"],tourism:["alpine_hut","apartement","attraction","artwork","camp_site","caravan_site","chalet","gallery","guest_house","hostel","hotel","information","motel","museum","picnic_site","theme_park","viewpoint","zoo","yes"],trees:["almond_trees","apple_trees","apricot_trees","avocado_trees","banana_plants","bayberry","blackberry","blueberry","cacao_plants","cherry_trees","chestnut_trees","coconut_palms","coffea_plants","cranberry","custard_apple","date_palms","durian_trees","ginkgo_trees","governor's_plum","guava_trees","hazel_plants","lemon_trees","lychee_trees","macadamia_trees","mandarin_trees","mango_trees","mulberrie_trees","olive_trees","orange_trees","papaya_trees","peach_trees","pear_trees","pecan_trees","persimmon_trees","pineapple_plants","pistachio_trees","plum_trees","pomegranate_trees","rambutan_trees","raspberry","sand_pear","tea_plants","walnut_trees"],waterway:["canal","ditch","dam","dock","drain","river","riverbank","stream","weir"]},F=r(150),G=r.n(F),M=r(67),T=r(52),U=r(74),J=r(424),N=new G.a("//overpass-api.de/api/interpreter"),Q=function(e){return e.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))};function D(){var e=C({scaleBar:!1}),a=e.mapRef,r=e.map,n=Object(t.useState)(null),i=Object(s.a)(n,2),p=i[0],d=i[1],m=Object(t.useState)(null),_=Object(s.a)(m,2),y=_[0],f=_[1],g=Object(t.useState)([]),w=Object(s.a)(g,2),v=w[0],j=w[1],k=[];Object.keys(V).forEach((function(e){k.push({value:e,label:Q(e).replace("_"," ")})}));return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(A.a,{options:k,onChange:function(e){return function(e){var a=[];V[e].forEach((function(e){return a.push({value:e,label:Q(e).replace("_"," ")})})),j(a),d(e)}(e.value)}}),Object(b.jsx)(A.a,{options:v,onChange:function(e){return f(e.value)}}),Object(b.jsx)("button",{onClick:function(){var e=Object(c.o)(r.getView().calculateExtent(),"EPSG:3857","EPSG:4326");N.BBoxQuery("nwr[".concat(p,"=").concat(y,"]"),{minlat:e[1],maxlat:e[3],minlon:e[0],maxlon:e[2]},{properties:G.a.ALL},(function(e,a){if("node"===a.data.type){var t=new M.a(Object(c.d)([a.geometry.lon,a.geometry.lat])),n=new S.a({source:new u.a({features:[new P.a(t)]}),style:new R.b({image:new q.a({radius:5,fill:new B.a({color:"red"})})})});r.addLayer(n)}else if("way"===a.data.type){if(["highway","cycleway","railway","route","waterway"].includes(p)){var i=[];a.geometry.forEach((function(e){i.push(Object(c.d)([e.lon,e.lat]))}));var o=new U.a(i),s=new P.a(o),l=new S.a({source:new u.a({features:[s]}),style:new R.b({stroke:new I.a({color:"blue",width:3})})});r.addLayer(l)}else{console.log(a);var d=[];a.geometry.forEach((function(e){d.push(Object(c.d)([e.lon,e.lat]))}));var m=new T.a([d]),b=new P.a(m),_=new S.a({source:new u.a({features:[b]}),style:new R.b({stroke:new I.a({color:"yellow",width:2}),fill:new B.a({color:"rgba(0, 255, 0, 0.5)"})})});r.addLayer(_)}}else console.log("relation",a)}),(function(e){e&&console.log(e)}))},children:"Query"}),Object(b.jsx)("button",{onClick:function(){Object(o.a)(r.getLayers().getArray()).forEach((function(e,a){0!==a&&r.removeLayer(e)}))},children:"Clear"}),Object(b.jsx)("button",{onClick:function(){var e=Object(o.a)(r.getLayers().getArray()),a=[];e.forEach((function(e,r){0!==r&&a.push(new P.a(e.getSource().getFeatures()))}));var t=new S.a({source:new u.a({features:a})}),n=(new J.a).writeFeatures(t.getSource().getFeatures(),{featureProjection:"EPSG:4326"}),i=new Blob([n],{type:"application/json"}),s=URL.createObjectURL(i),c=document.createElement("a");c.href=s,c.download="download.geojson",c.click()},children:"Download"}),Object(b.jsx)(h,{mapRef:a,providerValue:{map:r},zoom:12,center:Object(c.d)([84.5,28.3]),style:{width:"100vw",height:"100vh"},children:Object(b.jsx)(O,{source:new l.a,zIndex:0,type:"base",title:"OSM Base Map"})})]})}var W=document.getElementById("root");i.a.render(Object(b.jsx)(t.StrictMode,{children:Object(b.jsx)(D,{})}),W)}},[[419,1,2]]]);
//# sourceMappingURL=main.a5f9551f.chunk.js.map