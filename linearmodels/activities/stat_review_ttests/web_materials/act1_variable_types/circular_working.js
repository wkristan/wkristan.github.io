google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
    var data = makeCirc();
//    var stats = doCirc(data);
    var options = {
            title: "Analysis of circular variables",
            legend: "none",
            hAxis: {title: "x-component", viewWindowMode: "explicit", viewWindow: {min: -1.1, max: 1.1}},
            vAxis: {title: "y-component", viewWindowMode: "explicit", viewWindow: {min: -1.1, max: 1.1}},
            intervals: {'color':'series-color'},
            interval: {
                'i0': { 'color':'black', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':10, 'fillOpacity':1},
               // 'i1': { 'color':'black', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':10, 'fillOpacity':1}
            }
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
        circdat.push([xcomp_circ, ycomp_circ,null,null,null,null]);
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
        circdat.push([xcomp, ycomp, 'line {opacity: 0}', ycomp, null, String(angle)]);
        angle_sum = angle_sum + angle;
    }
    
    var data = new google.visualization.DataTable();
        data.addColumn('number', 'X-component');
        data.addColumn('number', 'Y-component');
        data.addColumn({id:'linestyle', type:'string', role:'style'});
        data.addColumn({id:'i0', type:'number', role:'interval'});
        data.addColumn({type:'string', id: 'annostyle', role:'style'});
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
            mean_dir = 360*atan_means/(2*Math.PI);
        } else if (ycomp_mean < 0) {
            mean_dir = 180+360*atan_means/(2*Math.PI);
        } else {
            mean_dir = 360 + 360*atan_means/(2*Math.PI);
        }
        
        data.addRows([[xcomp_angle,ycomp_angle,'line {opacity: 1}', null, 'point {textStyle: {color: "red"}}', 'Mean angle']]);
        data.addRows([[xcomp_mean, ycomp_mean, 'line {opacity: 1}', null, 'point {size: 14; fill-color: "red"}', 'Mean direction']]); 

        

       
       return data;
    }

