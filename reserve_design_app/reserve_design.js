// Note: to make this work, export a layer from QGIS as a geojson file.
// Use geographic coordinates, not a projected data set.
// Open the geojson file in a text editor, and add a var name_of_javascript_variable = [ to the beginning, and ]; to the end
// Change the extension to js, and then in the HTML file load the file like any local javascript document
// The "bh" reference is the name of the javascript variable created when the geojson file loads.

var vegtypes = [{vegtype:'Riparian', color: '#3EFF00', selected: [], totarea: 0},
{vegtype:'Beach', color: '#E81A02', selected: [], totarea: 0},
{vegtype:'Chaparral', color: '#4FA533', selected: [], totarea: 0},
{vegtype:'Oak woodland', color: '#5BD4B8', selected: [], totarea: 0},
{vegtype:'Coastal sage scrub', color: '#DD6C19', selected: [], totarea: 0},
{vegtype:'Montane meadows', color: '#4D4D4D', selected: [], totarea: 0},
{vegtype:'Wetland', color: '#1262F9', selected: [], totarea: 0},
{vegtype:'Grassland', color: '#DADA05', selected: [], totarea: 0},
{vegtype:'Mixed coniferous', color: '#E907FB', selected: [], totarea: 0}];

var total_selected = 0;


function makeVegTable(){
    var tab = document.getElementById("veg_color_table");
    for (i = 0; i < vegtypes.length; i++) {
        tab.rows[i+1].cells[0].innerHTML = vegtypes[i].vegtype;
        tab.rows[i+1].cells[1].style.background = vegtypes[i].color;
        tab.rows[i+1].cells[2].innerHTML = vegtypes[i].totarea;
        tab.rows[i+1].cells[3].innerHTML = vegtypes[i].selected.length;
    }
}

var mymap = L.map('map_div');
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
// mymap.scrollWheelZoom.disable();


function highlightFeature(poly) {

    poly.setStyle({
        weight: 1,
        color: '#000',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        poly.bringToFront();
    }
}

function resetHighlight(poly) {
    geojson_bh.resetStyle(poly);
}

function onEachFeature(feature, layer) {
    layer.on({
        click: toggleSelect
    });
}


var geojson_bh = L.geoJSON(bh, {style: function (feature) {
		return {fillColor: setColor(feature.properties.veg), fillOpacity: "1", color: "#C0C0C0", weight: "0.5", opacity: "1"};
}, onEachFeature: onEachFeature}).addTo(mymap);

mymap.fitBounds(geojson_bh.getBounds());


function drawMap() {
geojson_bh.setStyle(function (feature) {
		return {fillColor: setColor(feature.properties.veg), fillOpacity: "1", color: "#C0C0C0", weight: "0.5", opacity: "1"};
});
}

function setColor(vegType) {
    color = "#FF0000"
    for (i = 0; i < vegtypes.length; i++) {
        if (vegType == vegtypes[i].vegtype) {
            color = vegtypes[i].color;
        }
    }
    
    return color;
}

function toggleSelect(e) {
    var poly = e.target;
    if (poly.options.color == "#C0C0C0") {
        highlightFeature(poly);
        tableSelected(poly);
    } else {
        resetHighlight(poly);
        tableUnSelected(poly);
    }
}

function tableSelected(poly) {
    var vegtype = poly.feature.properties.veg;
    var id = poly.feature.properties.OBJECTID;
    var index = vegtypes.findIndex(x => x.vegtype === vegtype);
    var area = poly.feature.properties.hectares;
    vegtypes[index].totarea = vegtypes[index].totarea + area;
    total_selected = total_selected + area;
    var vegtable = document.getElementById("veg_color_table");
    vegtable.rows[index+1].cells[0].style.color = "red";
    vegtable.rows[index+1].cells[0].style.fontWeight = "bold";
    vegtable.rows[index+1].cells[2].innerHTML = vegtypes[index].totarea;
    vegtypes[index].selected.push(id);
    vegtable.rows[index+1].cells[3].innerHTML = vegtypes[index].selected.length;
    document.getElementById("tot_selected").innerHTML = total_selected;
    var pct_ws = 100*total_selected/89572;
    document.getElementById("pct_ws").innerHTML = pct_ws.toFixed(2);
}

function tableUnSelected(poly) {
    var vegtype = poly.feature.properties.veg;
    var id = poly.feature.properties.OBJECTID;
    var area = poly.feature.properties.hectares;
    var vegtype_index = vegtypes.findIndex(x => x.vegtype === vegtype);
    var id_index = vegtypes[vegtype_index].selected.indexOf(id);
    var vegtable = document.getElementById("veg_color_table");
    vegtypes[vegtype_index].selected.splice(id_index,1);
    vegtypes[vegtype_index].totarea = vegtypes[vegtype_index].totarea - area;
    total_selected = total_selected - area;
    vegtable.rows[vegtype_index+1].cells[2].innerHTML = vegtypes[vegtype_index].totarea;
    vegtable.rows[vegtype_index+1].cells[3].innerHTML = vegtypes[vegtype_index].selected.length;
    if (vegtypes[vegtype_index].selected.length === 0) {
        var vegtable = document.getElementById("veg_color_table");
        vegtable.rows[vegtype_index+1].cells[0].style.color = "black";
        vegtable.rows[vegtype_index+1].cells[0].style.fontWeight = "normal";
    }
    document.getElementById("tot_selected").innerHTML = total_selected;
    var pct_ws = 100*total_selected/89572;
    document.getElementById("pct_ws").innerHTML = pct_ws.toFixed(2);

}

function startApp() {
    makeVegTable();
}

function clearSelected() {
    drawMap();
    var vegtable = document.getElementById("veg_color_table");
    for (i = 0; i < vegtypes.length; i++) {
        vegtypes[i].selected = [];
        vegtypes[i].totarea = 0;
        vegtable.rows[i+1].cells[0].style.color = "black";
        vegtable.rows[i+1].cells[0].style.fontWeight = "normal";
        vegtable.rows[i+1].cells[2].innerHTML = 0;
        vegtable.rows[i+1].cells[3].innerHTML = vegtypes[i].selected.length;
    }
    total_selected = 0;
    document.getElementById("tot_selected").innerHTML = total_selected;
    document.getElementById("pct_ws").innerHTML = 0;
}

function reCenter() {
    mymap.fitBounds(geojson_bh.getBounds());
}
