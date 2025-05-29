// Simulate distance sampling - there are 9600 points in this 1200 x 1600 m region, or 50 per hectare.

var markers = [];
var mymap = L.map('map_div', {crs: L.CRS.Simple, minZoom: -1});
var bounds = [[0,0],[1200,1600]];
mymap.fitBounds(bounds);
var image = L.imageOverlay('env.png', [[-10,-10],[1210,1610]]).addTo(mymap);

var in_out = [];
var fw = [];
var stats = {trans_length: 0, dist_visible: 0, n_dist: 0, dist_density: 0, n_fw: 0, fw_density: 0, effective_width: 0};;

for (var i = 0; i < points.length; i++){
	in_out.push(0);
	fw.push(0)
}

for (var i = 0; i < points.length; i++) {
		marker = new L.circleMarker([points[i][0],points[i][1]],{radius:4,fillColor: "red", stroke: false, fillOpacity: 0})
			.addTo(mymap);
		markers.push(marker);
}

var line_coords = [[500,400],[500, 600]];
var transect = L.polyline(line_coords, {color: "yellow", opacity: 0}).addTo(mymap);

function runSim() {
	var trans_length = Number(document.getElementById("trans_length").value);
	var dist_visible = Number(document.getElementById("dist_visible").value);
    stats.trans_length = trans_length;
    stats.dist_visible = dist_visible;
	// Set the standard deviation of distances to 1/3 of the distance visible
	var s = dist_visible/3;
    var distances = [];
	// Make the transect - set its coordinates and make it visible.
	makeTransect(trans_length, dist_visible);
	transect.setLatLngs(line_coords).setStyle({opacity: 1});
	
	// Values used repeatedly in formulas below - coordinates for the transect start and end points
	var start_x = line_coords[0][1];
	var end_x = line_coords[1][1];
	var start_y = line_coords[0][0];
	var end_y = line_coords[1][0];
	
	// Run through the points
	
	var n_dist = 0;
	var n_fw = 0;
	var distSS = 0;
	
	for (var i = 0; i < points.length; i++){
	// Get the x and y coordinates - used repeatedly below
		var point_x = points[i][1];
		var point_y = points[i][0];
	//first, is each in range, using in_out array
		in_out[i] = Number(inRange(point_x, point_y, start_x, start_y, end_x, end_y, trans_length));
	// then, what is the distance, given the point, the transect endpoints, and the detection function standard deviation
		if (in_out[i] == 1){
			var dist = distPoint(point_x, point_y, start_x, start_y, end_x, end_y, trans_length);
			if (dist <= 5) {
				n_fw = n_fw + 1;
				fw[i] = 1;
			} else {
				fw[i] = 0;
			}
			if (wasDetected(dist, s) == 1) {
				distances.push(dist);
				distSS = distSS + dist*dist;
			} else {
				in_out[i] = 0;
			}
		} else {
			in_out[i] = 0;
		}
		
	}
		
	n_dist = distances.length;
    var sd = Math.sqrt(distSS/(n_dist-1));

	setPointStyles();
	calcStats(n_dist, sd, n_fw, trans_length);
    reportStats(stats);
    
    var normCurve = makeNormCurve(sd, n_dist, dist_visible);
        
    var dist_data = {
        x: distances,
        type: 'histogram'
    }
    
    var curve_data = {
        x: normCurve.x,
        y: normCurve.y,
        type: 'line',
        yaxis: 'y2'
    }
    
    var data = [dist_data, curve_data];
    
    var dist_layout = {
        title: {
            text: "<b>Distribution of distances</b><br>(effective width = " + stats.effective_width.toFixed(2) + ")"
        },
        showlegend: false,
        xaxis: {
            title: {
                text: "Distance",
            },
                range: [0, 1.2*dist_visible]
        },
        yaxis: {
            title: {
                text: "Count"
            },
        },
        yaxis2: {
            overlaying: 'y',
            side: 'left',
            range: [0,1.1/stats.effective_width],
            showticklabels: false
        }

    }
    
    
    Plotly.newPlot('graph', data, dist_layout);
    
}


function makeTransect(trans_length, dist_visible) {
		var endpoint_dist = Math.sqrt(trans_length*trans_length + dist_visible*dist_visible);
		var x_rect = 800-endpoint_dist;
		var y_rect = 600-endpoint_dist;
		var trans_start_x = 800;
		var trans_start_y = 600;
		if (endpoint_dist < 800){
			trans_start_x = 800 + Math.round(Math.random()*2-1)*Math.random()*x_rect;
		}
		if (endpoint_dist < 600) {
			trans_start_y = 600 + Math.round(Math.random()*2-1)*Math.random()*y_rect;
		}	
		var angle_end = 2*Math.PI*Math.random();
		var trans_end_x = trans_length*Math.sin(angle_end) + trans_start_x;
		var trans_end_y = trans_length*Math.cos(angle_end) + trans_start_y;		
		
		var coords = [[trans_start_y,trans_start_x],[trans_end_y,trans_end_x]];
		line_coords = coords;
}
	
function inRange(point_x, point_y, start_x, start_y, end_x, end_y, trans_length) {
	var dist_start = Math.sqrt(Math.pow(start_x - point_x, 2) + Math.pow(start_y-point_y,2));
	var dist_end = Math.sqrt(Math.pow(end_x - point_x, 2) + Math.pow(end_y-point_y, 2));
	var B = Math.acos((trans_length*trans_length + dist_end*dist_end - dist_start*dist_start)/(2*dist_end*trans_length));
	var C = Math.acos((trans_length*trans_length + dist_start*dist_start - dist_end*dist_end)/(2*trans_length*dist_start));
	var inrange = (B <= Math.PI/2 && C <= Math.PI/2);
	return inrange;
}

function distPoint(point_x, point_y, start_x, start_y, end_x, end_y, trans_length) {
	var dist = Math.abs((end_x - start_x)*(start_y - point_y) - (start_x - point_x)*(end_y-start_y))/trans_length;
	return dist;
}

function wasDetected(dist, s) {
	var norm_0 = jStat.normal.pdf(0,0,s);
	var p_detect = jStat.normal.pdf(dist, 0, s)/norm_0;
	var detected = Math.random() < p_detect;
	return Number(detected);
}

// Change the color of the detected points

function setPointStyles() {
	for (var i = 0; i < points.length; i++){
			markers[i].setStyle({fillColor: "red", fillOpacity: in_out[i]});
			if (fw[i] == 1) {
				markers[i].setStyle({fillColor: "lime"});			
			}
		}
}

// Calculate densities based on distance sampling and fixed width transect

function calcStats(n_dist, sd, n_fw, trans_length) {
	var distDensity = jStat.normal.pdf(0,0,sd)*n_dist/trans_length;
	var fwDensity = n_fw/(trans_length*10);
    var effective_width = 1/jStat.normal.pdf(0,0,sd);
    stats.n_dist = n_dist;
    stats.dist_density = distDensity;
    stats.n_fw = n_fw;
    stats.fw_density = fwDensity;
    stats.effective_width = effective_width;
    
}

function reportStats(stats) {
    document.getElementById("dist_n").innerHTML = stats.n_dist;
	document.getElementById("fw_n").innerHTML = stats.n_fw;
	document.getElementById("dist_density").innerHTML = (10000*stats.dist_density).toFixed(2);
	document.getElementById("fw_density").innerHTML = (10000*stats.fw_density).toFixed(2);
}

function makeNormCurve(sd, n_dist, dist_visible) {
    var normCurve = {x: [], y: []};
    var dist = 0;
    for (var i = 0; i < 100; i++) {
        normCurve.x.push(dist);
        normCurve.y.push(jStat.normal.pdf(dist,0,sd));
        dist = dist + 1.2*dist_visible/100;
    }
    return(normCurve);
}

function copyEsts() {
  /* Get the text field */
    var spreadsheet_text = stats.trans_length + "\t" + stats.dist_visible + "\t" + stats.n_dist + "\t" + stats.dist_density*10000 + "\t" + stats.effective_width + "\t" + stats.n_fw + "\t" + stats.fw_density*10000;

   /* Copy the text inside the text field */
    navigator.clipboard.writeText(spreadsheet_text);

}
