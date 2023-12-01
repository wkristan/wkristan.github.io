google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
    
    // Need to pull these out of the drawChart function to allow updating.
    var chart = "";
    var options = {
          title: 'Random samples of from a population of trees with no correlation between diameter and height',
          hAxis: {title: 'Diameter', minValue: 4, maxValue: 14},
          vAxis: {title: 'Height', minValue: 70, maxValue: 130},
          legend: 'none'
        };

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Diameter', 'Height'],
            [12.09,120.84],
[11.94,103.55],
[10.79,99.21],
[7.49,84.61],
[12.68,103.74],
[10.57,104.78],
[9.35,104.94],
[12.25,111.64],
[10.85,101.16],
[9.69,107.19],
[9.28,99.04],
[12.17,116.3],
[9.99,96.89],
[11.02,96.19],
[9.49,103.55],
[8.84,92.65],
[10.77,98.5],
[11.56,101.39],
[7.26,84.03],
[10.07,96.33],
[12.2,99.82],
[7.64,76.93],
[10.21,92.27],
[10.46,100.44],
[10.91,107.22],
[9.8,100.94],
[12.28,95.56],
[12.98,112.6],
[5.8,79.93],
[5.77,84.52],
[7.66,88.72],
[11.05,111.17],
[10.32,110.55],
[9.98,106.23],
[9.26,95.92],
[9.41,93.97],
[8.52,93.95],
[11.29,101.72],
[13.26,109.81],
[9.78,101.5],
[7.76,95.18],
[9.72,102.92],
[9.28,85.04],
[11.25,104.97],
[9.44,105.1],
[9.43,91.18],
[11.06,99.26],
[8.74,104.91],
[9.39,105.84],
[8.52,106.78],
[6.12,86.98],
[9.75,91.57],
[10.81,106.8],
[7.93,106.12],
[11.43,106.04],
[9.08,102.88],
[12.24,99.84],
[11.3,118.38],
[8.95,97.55],
[8.39,104.23],
[11.24,97.89],
[9.02,100.09],
[11.11,93.02],
[7.23,95.46],
[11.46,111.66],
[9.82,97.56],
[11.35,107.12],
[9.48,94.85],
[10.57,102.69],
[8.68,104.42],
[8.75,91.67],
[10.51,103.13],
[6.46,84.79],
[6.93,83.25],
[10.06,98.24],
[10.04,102.51],
[11.27,103.45],
[9.95,99.4],
[11.78,106.57],
[8.7,93.81],
[5.45,85.83],
[10.84,100.5],
[8.15,99.58],
[11.34,103.54],
[11.39,107.01],
[9.64,107.62],
[9.42,92.52],
[8.88,110.39],
[9.71,103.08],
[10.16,103.67],
[12.59,118.84],
[7.73,81.95],
[10.28,101.54],
[12.69,109.24],
[8.97,95.57],
[8.43,94],
[9.18,91.58],
[12.05,107.91],
[11.6,94.84],
[13.18,110.87],
        ]);

        chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

        chart.draw(data, options);
        document.getElementById("correl").innerHTML = "r = 0.694";
      }
      
function randn_bm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
      
function randData(){
       var dat = [];
       var j = 0;
       var k = 0;
       for(var i=0; i<100; i++){
            j = randn_bm()*2+9.9;
            k = randn_bm()*10+100;
            dat.push([j , k]);
       }
       return dat;
    }
    
function corrDat(dat) {
    var scp = 0;
    var sx = 0;
    var sy = 0;
    var sx2 = 0;
    var sy2 = 0;
    for(var i = 0;i<100;i++){
        scp = scp + dat[i][0] * dat[i][1];
        sx = sx + dat[i][0];
        sy = sy + dat[i][1];
        sx2 = sx2 + dat[i][0]*dat[i][0];
        sy2 = sy2 + dat[i][1]*dat[i][1];
    }
    var corr = (100*scp-(sx*sy))/(Math.sqrt(100*sx2-(sx*sx))*Math.sqrt(100*sy2-(sy*sy)));
    return corr;
}
              
              
function updateChart() {
var dataArray = randData();
var corrData = corrDat(dataArray);
var data = google.visualization.arrayToDataTable(dataArray, true);
chart.draw(data, options);
document.getElementById("correl").innerHTML = "r = " + corrData.toFixed(4);
};
