/**
 * Created with IntelliJ IDEA.
 * User: Test
 * Date: 11.02.13
 * Time: 1:29
 * To change this template use File | Settings | File Templates.
 */

ymaps.ready(init);
var myMap;
var searchRadius = 1000;
var flats = [
    [50.52195, 30.497535],
    [50.50879, 30.485804],
    [50.502888, 30.492011],
    [50.50568, 30.512799],
];

var COORDS_TO_METER = 0.0000133097477812;
/*
 0,0016300518396665 * X ~~ 120 m    X =  73617,2906160772
 0,0082836997772734 * X ~~ 920 m    X = 111061,4851740583
 0,0133097477812316 * X == 1000 m   X =  75132,90382633128
 */

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

    var radius = COORDS_TO_METER * searchRadius;  // приводим метры к координатным величинам

    for (var i = 0; i < flats.length; i++) {
        var j = 0;
        for (; j < metroStations.length; j++) {
            if (i == 1 && j == 2) {
                var t = 9;
            }
            if (isInsideOfCircle(flats[i], metroStations[j], radius)) {
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
    var x = point[0] - center[0];
    var y = point[1] - center[1];

    if (x * x + y * y < radius * radius) {
        return true;
    }
    return false
}

