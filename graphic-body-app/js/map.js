/**
 * Created by Amanda on 2016-02-15.
 */

var allTheRegions = [];

var fs = require('fs');
var anterior = JSON.parse(fs.readFileSync('views/anterior.json', 'utf8'));

function createMap(data, viewId){

    var mapContainer = document.getElementById(viewId);
    document.write(mapContainer);

    var map = new Raphael(mapContainer, 500, 700);
    map.setViewBox(0, 0, 900, 1900 );


    var style = {
        fill: "#D3AF8E",
        stroke: "white",
        "stroke-width": 1,
        "stroke-linejoin": "round",
        cursor: "pointer",
    };

    var animationSpeed = 500;
    var hoverStyle = {
        fill: "#27b7c0"
    }

    var regions = {};

   for(var i=0; i < data.length; i++){
       regions[i] = map.path(data[i]['path']);
   }

    //add event listeners and atributes to the svg regions
    for(var regionName in regions) {
        regions[regionName].attr(style);
        (function (region) {
            region.attr(style);

            region[0].addEventListener("mouseenter", function() {
                region.animate(hoverStyle, animationSpeed);


                allTheRegions.push( region['id'] );

                region['sympt-pain'] = 0;
                region['sympt-numbness'] = 0;
                region['sympt-tingling'] = 0;
                region['sympt-weakness'] = 0;

                console.log(region);

            }, true);

            region[0].addEventListener("mouseout", function() {
                region.animate(style, animationSpeed);
            }, true);

        })(regions[regionName]);
    }

    return addEventListeners(viewId);

}


createMap(anterior['regions'], 'anterior-map');


function addEventListeners (viewId){
    var map = document.getElementById(viewId);
    var mousedownID = -1;  //Global ID of mouse down interval
    function mousedown(event) {
        if(mousedownID==-1)  //Prevent multimple loops!
            mousedownID = setInterval(whilemousedown, 100 /*execute every 100ms*/);
        console.log('mouse has been clicked');

    }
    function mouseup(event) {
        if(mousedownID!=-1) {  //Only stop if exists
            clearInterval(mousedownID);
            mousedownID=-1;
        }
    }
    function whilemousedown() {
        console.log('mouse is currently down');
    }
    //Assign events
    map.addEventListener("mousedown", mousedown);
    map.addEventListener("mouseup", mouseup);
    //Also clear the interval when user leaves the window with mouse

    map.addEventListener('click', function(){
        allTheRegions = [];
    })

}