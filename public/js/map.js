async function getStores() {
  const res = await fetch("/api/v1/stores");
  const dataJson = await res.json();
  // console.log(dataJson);

  const stores = dataJson.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1],
        ],
      },
      properties: {
        storeId: store.storeId,
      },
    };
  });
  // console.log(stores);

  const features = [];

  for (let i = 0; i < stores.length; i++) {
    let store = stores[i];
    // console.log(store);
    // console.log(store.geometry.coordinates[0],store.geometry.coordinates[1]);

    features.push(
      new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([
            store.geometry.coordinates[0],
            store.geometry.coordinates[1],
          ])
        ),
      })
    );
  }

  // console.log(features.length);

  const vectorSource = new ol.source.Vector({
    features,
  });
  // console.log(vectorSource, vectorSource.length);

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 2,
        fill: new ol.style.Fill({ color: "purple" }),
      }),
    }),
  });
  // console.log(vectorLayer, vectorLayer.length);

  const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      vectorLayer,
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
  });
}

getStores();
