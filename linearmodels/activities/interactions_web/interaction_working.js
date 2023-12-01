google.charts.load('current', {'packages':['corechart', 'table']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawTable);

var current = 0;

var table_nointer = [
            ["Source","DF","SS","MS","F","p"],
            ["Sex",1,3781, 3781, 2.59, {v: 0.1460, f: "0.1460"}],
            ["Fat",1,61204,61204,41.97, {v: 0.0002, f: "0.0002"}],
            ["Sex x Fat", 1, 919, 919, 0.63, {v: 0.4503, f: "0.4503"}],
            ["Residuals",8,11667,1458, null,null]
        ];
var table_inter = [
            ["Source","DF","SS","MS","F","p"],
            ["Sex",1,3781, 3781, 2.59, {v: 0.1460, f: "0.1460"}],
            ["Fat",1,919,919,0.63, {v: 0.0002, f: "0.4503"}],
            ["Sex x Fat", 1, 61204, 61204, 41.97, {v: 0.4503, f: "0.0002"}],
            ["Residuals",8,11667,1458, null,null]
        ];
        
var no_inter_data_ar = [
    ["Sex","Fresh","Rancid"],
    ["F",642.7, 517.3],
    ["M",695.7, 535.3]
    ];
    
var inter_data_ar = [
    ["Sex","Fresh","Rancid"],
    ["F",642.7, 517.3],
    ["M",535.3, 695.7]
    ];
    
var titles = ["No interaction between fat type and sex","Interaction between fat type and sex"];
    
var options = {
            vAxis: {title: "Consumption"},
            hAxis: {title: "Sex"},
            width: 520,
            height: 200,
            chartArea: {width: 350, height: 120},
        };
        
function drawTable() {
    var table = new google.visualization.Table(document.getElementById('table_div'));

    var table_data = [];

    table_data[0] = google.visualization.arrayToDataTable(table_nointer);
    table_data[1] = google.visualization.arrayToDataTable(table_inter);


    table.draw(table_data[current], {showRowNumber: false, sort: "disable"});
    
};
        
function drawChart() {

var chart_data = [];
chart_data[0] = google.visualization.arrayToDataTable(no_inter_data_ar);
chart_data[1] = google.visualization.arrayToDataTable(inter_data_ar);
        
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        
        options["title"] = titles[current];
        
        chart.draw(chart_data[current], options);
        
        document.getElementById("toggle_graph").innerHTML = "Switch to " + (current ? "No Interaction" : "Interaction");        

      }


function switchChart() {
      current = 1 - current;
      drawTable();
      drawChart();
    }
