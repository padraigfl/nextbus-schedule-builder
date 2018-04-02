/* This operation can be requires:
  - apiCalls to be called for Route Paths
  - apiCalls and buildStopData for Stop Points  */

function buildStopPoint(stop) {
  return {
    type: 'Feature',
    properties: {
      title: stop.title,
      tag: stop.tag,
      stopId: stop.stopId,
    },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(stop.lon), parseFloat(stop.lat)],
    }
  };
}

function buildStopPoints(stopData, geoObj) {
  if (!geoObj) {
    geoObj = { type: 'FeatureCollection', features: [] };
  }

  Object.keys(stopData).forEach(function(id) {
    geoObj.features.push(buildStopPoint(stopData[id]));
  });

  return geoObj;
}

function getLineStrings(routePath) {
  return routePath.map(function (points) {
    var geoPath = points.point.map(function (point) {
      return [parseFloat(point.lon), parseFloat(point.lat)];
    });
    return geoPath;
  });
}

function buildRoute(route) {
  return {
    type: 'Feature',
    properties: {
      title: route.route.title,
      tag: route.route.tag,
      color: route.route.color,
    },
    geometry: {
      type: 'MultiLineString',
      coordinates: getLineStrings(route.route.path),
    }
  };
}

module.exports = {
  buildStopPoint: buildStopPoint,
  buildStopPoints: buildStopPoints,
  buildRoute: buildRoute,
};
