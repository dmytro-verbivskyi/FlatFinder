/**
 * Created with IntelliJ IDEA.
 * User: Test
 * Date: 11.02.13
 * Time: 1:29
 * To change this template use File | Settings | File Templates.
 */

ymaps.ready(init);
var myMap;
var searchRadius = 750;
var flats = [
    [50.52195, 30.497535],
    [50.50879, 30.485804],
    [50.502888, 30.492011],
    [50.50568, 30.512799]
];

function init() {
    myMap = new ymaps.Map("map", {
        center: [50.502232, 30.497643],
        zoom: 14
    });
    myMap.controls.add(new ymaps.control.ZoomControl());
    myMap.controls.add(new ymaps.control.ScaleLine());
    myMap.controls.add(new ymaps.control.MapTools());

    for (var i = 0; i < metroStations.length; i++) {
        var circle = new ymaps.Circle([metroStations[i], searchRadius], {}, {
            fillColor: "#6666CC", fillOpacity: 0.1, strokeOpacity: 0.5, strokeWidth: 0.5
        });
        myMap.geoObjects.add(circle);
    }

    //var radius = searchRadius;  // приводим метры к координатным величинам

    for (var i = 0; i < flats.length; i++) {
        var j = 0;
        for (; j < metroStations.length; j++) {
            if (isInsideOfCircle(flats[i], metroStations[j], searchRadius)) {
                addFlatMark(myMap, flats[i], "Good" + i);
                break;
            }
        }
        if (j == metroStations.length) {
            addFlatMark(myMap, flats[i], "Bad" + i);
        }
    }
}

function addFlatMark(myMap, point, text) {
    var myPlacemark = new ymaps.Placemark(point, { iconContent: text }, {
        preset: 'twirl#blueStretchyIcon'
    });
    myMap.geoObjects.add(myPlacemark);
}


function isInsideOfCircle(point, center, radius) {
    var distance = ymaps.coordSystem.geo.getDistance(point, center);
    if (distance <= radius){
        return true
    }

    return false
}

