google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
    var data = makeCirc();
//    var stats = doCirc(data);
    var options = {
            title: "Randomly generated directions, with an average of 0 degrees",
            legend: "none",
            hAxis: {viewWindowMode: "explicit", viewWindow: {min: -1.1, max: 1.1}, gridlines: {color: "transparent"}, ticks: "none"},
            vAxis: {viewWindowMode: "explicit", viewWindow: {min: -1.1, max: 1.1}, gridlines: {color: "transparent"}, ticks: "none"},
            pointSize: 1

    }
        
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);


}
      
  
      
function makeCirc() {
//first make the circle
    
    var circdat = [];
    var circ_angle = 0;
    var xcomp_circ = 0;
    var ycomp_circ = 0;
    
    for (var i = 0; i < 101; i++) {
        circ_angle = (i/100)*2*Math.PI;
        xcomp_circ = Math.sin(circ_angle);
        ycomp_circ = Math.cos(circ_angle);
        circdat.push([xcomp_circ, ycomp_circ,'point {size: 0}',null]);
    }



// Now make the random points, and add them as interval data to the data set
    
    var xcomp = 0;
    var ycomp = 0;
    var angle_sum = 0;
    var xcomp_sum = 0;
    var ycomp_sum = 0;
    
    for (var i = 0; i<10; i++) {
        angle_deg = jStat.normal.sample(0,30).toFixed(0);
        if (angle_deg < 0) {
            angle = Number(angle_deg)+360;
        } else {
            angle = Number(angle_deg);
        }
        xcomp = Math.sin(2*Math.PI*angle_deg/360);
        xcomp_sum = xcomp_sum + xcomp;
        ycomp = Math.cos(2*Math.PI*angle_deg/360);
        ycomp_sum = ycomp_sum + ycomp;
        circdat.push([xcomp, ycomp, 'line {opacity: 0}, point {size: 3}', String(angle)]);
        angle_sum = angle_sum + angle;
    }
    
    var data = new google.visualization.DataTable();
        data.addColumn('number', 'X-component');
        data.addColumn('number', 'Y-component');
        data.addColumn({id:'linestyle', type:'string', role:'style'});
        data.addColumn({type:'string', id: 'Angle', role: 'annotation'});
        data.addRows(circdat);
    
    // Calculate some stats, add lines for the correct and incorrect means
        var angle_mean = angle_sum/10;
        var xcomp_angle = Math.sin(2*Math.PI * angle_mean/360);
        var ycomp_angle = Math.cos(2*Math.PI * angle_mean/360);
        var xcomp_mean = xcomp_sum/10;
        var ycomp_mean = ycomp_sum/10;
        var atan_means = Math.atan(xcomp_mean/ycomp_mean);
        var mean_dir = 0;
        if (xcomp_mean >= 0 && ycomp_mean >= 0) {
            mean_dir = atan_means;
        } else if (ycomp_mean < 0) {
            mean_dir = Math.PI+atan_means;
        } else {
            mean_dir = 2*Math.PI + atan_means;
        }
        var mean_dir_x = Math.sin(mean_dir);
        var mean_dir_y = Math.cos(mean_dir);

        data.addRows([[0, 1, 'line {opacity: 1}, point {size: 0; fill-color: #000000}', '360/0']]);
        data.addRows([[1, 0, 'line {opacity: 1}, point {size: 0; fill-color: #000000}', '90']]);
        data.addRows([[0,-1, 'line {opacity: 1}, point {size: 0; fill-color: #000000}', '180']]);
        data.addRows([[-1,0, 'line {opacity: 1}, point {size: 0; fill-color: #000000}', '270']]);
        data.addRows([[0,0,'line {opacity: 1}, point {size: 0;}', null]]);        
        data.addRows([[xcomp_angle,ycomp_angle,'line {color: #FF5733}, point {size: 6; fill-color: #FF5733}', 'Mean angle']]);
        data.addRows([[0, 0, 'line {opacity: 1}, point {size: 0}', null]]);
        data.addRows([[mean_dir_x, mean_dir_y, 'line {color: #00FF00}, point {size: 6; fill-color: #00FF00}', 'Mean direction']]);


        

       
       return data;
    }

