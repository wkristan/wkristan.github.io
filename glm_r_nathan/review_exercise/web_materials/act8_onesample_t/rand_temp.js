google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
    
    // Need to pull these out of the drawChart function to allow updating.
    var chart = "";
    var options = {
          title: 'Figure 1. Random samples of body temperature from 20 people, \n\u03BC = 98.6',
          hAxis: {title: 'Body temperature', minValue: 98, maxValue: 100.1},
          vAxis: {minValue: 0, maxValue: 1, textPosition: 'none'},
          legend: 'none'
        };

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Body temp', 'y'],
            [ 98.5, 0.5],
            [ 98.9, 0.5],
            [ 98.5, 0.5],
            [ 99.5, 0.5],
            [ 97.9, 0.5],
            [ 98.0, 0.5],
            [ 98.7, 0.5],
            [ 99.0, 0.5],
            [ 99.3, 0.5],
            [ 99.0, 0.5],
            [ 98.9, 0.5],
            [ 98.1, 0.5],
            [ 99.8, 0.5],
            [ 99.8, 0.5],
            [ 97.7, 0.5],
            [ 98.7, 0.5],
            [ 99.2, 0.5],
            [ 99.7, 0.5],
            [ 99.1, 0.5],
            [ 98.5, 0.5],
        ]);

        chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

        chart.draw(data, options);
        document.getElementById("mean").innerHTML = "Sample mean = 98.84";
      }
      
function randn_bm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
      
function randData(){
       var dat = [];
       var j = 0;
       for(var i=0; i<20; i++){
            j = randn_bm()*1.2+98.6;
            dat.push([j , 0.5]);
       }
       return dat;
    }
    
function meanDat(dat) {
    var tot = 0;
    for(var i = 0;i<20;i++){
        tot = tot + dat[i][0];
    }
    var mean = tot/20;
    return mean;
}
              
              
function updateChart() {
var dataArray = randData();
var meanData = meanDat(dataArray);

var data = google.visualization.arrayToDataTable(dataArray, true);
chart.draw(data, options);
document.getElementById("mean").innerHTML = "Sample mean = " + meanData.toFixed(2);
};
