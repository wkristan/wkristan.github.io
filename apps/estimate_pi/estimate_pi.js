google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawChart);
var pivals = [["pi"]];

function drawChart() {
    var circ_data = makeCirc();
    var circ_options = {
            title: "Estimating \u03C0",
            legend: "none",
            hAxis: {title: "x", viewWindowMode: "explicit", viewWindow: {min: 0, max: 2}},
            vAxis: {title: "y", viewWindowMode: "explicit", viewWindow: {min: 0, max: 2}},
            series: {
                0: {lineWidth: 1, color: "gray"},
                1: {lineWidth: 0, pointShape: 'circle', pointSize: 5, color: "red"},
                2: {lineWidth: 0, pointShape: 'circle', pointSize: 5, color: "blue"}
        }
    }
    
    var hist_options = {
        title: 'Histogram of multiple estimates of \u03C0',
        legend: "none",
        chartArea: {width: 300},
        histogram: { bucketSize: 0.1 },
        hAxis: {title: "Estimated values of \u03C0", ticks: [0,1.0,2.0,3.14,4.0], viewWindow: {min:0,max:4.5}} 
    }

    var hist_data = google.visualization.arrayToDataTable(pivals);
        
    var circ_chart = new google.visualization.LineChart(document.getElementById('circ_div'));
    circ_chart.draw(circ_data, circ_options);
    var hist_chart = new google.visualization.Histogram(document.getElementById("hist_div"));
    hist_chart.draw(hist_data, hist_options);
    
    var sum = 0;
    for(var i = 1; i < pivals.length; i++){
		    sum += pivals[i][0];
    }
    document.getElementById("n_ests").innerHTML = pivals.length - 1;
    var pi_mean = sum/(pivals.length - 1);
    document.getElementById("pi_mean").innerHTML = pi_mean.toFixed(4);

}
      
  
      
function makeCirc() {
//first make the circle
    
    var circdat = [];
    var circ_angle = 0;
    var xcomp_circ = 0;
    var ycomp_circ = 0;
    
    for (var i = 0; i < 101; i++) {
        circ_angle = (i/100)*2*Math.PI;
        xcomp_circ = Math.sin(circ_angle)+1;
        ycomp_circ = Math.cos(circ_angle)+1;
        circdat.push([xcomp_circ, ycomp_circ,null,null]);
    }

// Now make the random points, and add them as a new series of points to the data set
// Test if they are in or out of the circle - a different series for in and out
    
    var xcoord = 0;
    var ycoord = 0;
    var n = Number(document.getElementById("n").value);
    var incirc = 0;
    for (var i = 0; i<n; i++) {
        xcoord = 2*Math.random();
        ycoord = 2*Math.random();
        if(Math.sqrt(Math.pow(xcoord - 1,2) + Math.pow(ycoord - 1,2)) < 1) {
            circdat.push([xcoord,null,ycoord,null]);
            incirc = incirc + 1;
        } else {
            circdat.push([xcoord,null,null,ycoord]);
        }
    }
    var pival = 4*incirc/n;
    pivals.push([pival]);

    document.getElementById("n_circ").innerHTML = incirc;
    document.getElementById("n_rect").innerHTML = n;
    document.getElementById("est_pi").innerHTML = pival.toFixed(4);
    
//    document.getElementById("debug_msg").innerHTML = pivals;
    
    var data = new google.visualization.DataTable();
        data.addColumn('number', 'X-coordinate');
        data.addColumn('number', 'Y-circ');
        data.addColumn('number', 'Y-in');
        data.addColumn('number', 'Y-out');
        data.addRows(circdat);

       return data;
    }
    
function drawChartReset() {
	reset();
	drawChart();
}

function reset() {
	pivals = [["pi"]];
}

function makeLotsOfCircs() {

	 var xcoord = 0;
    var ycoord = 0;
    var n = Number(document.getElementById("n").value);
    var incirc = 0;
    for (var j = 0; j<999; j++) {
    	incirc = 0;
    	for (var i = 0; i<n; i++) {
        xcoord = 2*Math.random();
        ycoord = 2*Math.random();
        if(Math.sqrt(Math.pow(xcoord - 1,2) + Math.pow(ycoord - 1,2)) < 1) {
            incirc = incirc + 1;
        }
    	}
    var pival = 4*incirc/n;
    pivals.push([pival]);

 	}
 
 drawChart();

}