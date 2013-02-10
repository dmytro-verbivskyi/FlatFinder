/**
 * Created with IntelliJ IDEA.
 * User: Test
 * Date: 11.02.13
 * Time: 1:29
 * To change this template use File | Settings | File Templates.
 */

ymaps.ready(init);
var myMap;
var array = [];

function init() {
    myMap = new ymaps.Map("map", {
        center: [50.502232, 30.497643],
        zoom: 14
    });

    for (var i = 0; i < metroStations.length; i++) {
        array[i] = new ymaps.Circle([metroStations[i], 750], {}, {
            fillColor: "#6666CC", fillOpacity: 0.1, strokeOpacity: 0.5, strokeWidth: 0.5
        });
    }

    for (var i = 0; i < array.length; i++) {
        myMap.geoObjects.add(array[i]);
    }

    myMap.controls.add(new ymaps.control.ZoomControl());
    myMap.controls.add(new ymaps.control.ScaleLine());
    myMap.controls.add(new ymaps.control.MapTools());
}

function isInsideOfCircle(point, center, radius) {
    var x = point[0] - center[0];
    var y = point[1] - center[1];

    if (x * x + y * y < radius * radius) {
        return true;
    }
    return false
}