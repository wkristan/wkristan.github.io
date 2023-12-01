google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

var counter = 0;
var exceeds = 0;

function drawTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Survival time (days)');
            data.addColumn('string', 'Cancer type');
            data.addRows(data_ar);
        
       calcMeans();
        
        var table = new google.visualization.Table(document.getElementById('table_div'));
            
        table.draw(data, {showRowNumber: false, width: '300px', height: '100%', sort: true, allowHTML: true});

      }
      
function calcMeans() {
    var small = [];
    var large = [];
    for (var i = 0; i < 75; i++) {
        if (data_ar[i][1] == "Large cell") {
            large.push(data_ar[i][0]);
        } else {
            small.push(data_ar[i][0]);
        }
    }
    var large_mean = jStat.mean(large);
    var small_mean = jStat.mean(small);
    var diff = large_mean - small_mean;
    document.getElementById("large_mean").innerHTML = large_mean.toFixed(3);
    document.getElementById("small_mean").innerHTML = small_mean.toFixed(3);
    document.getElementById("diff").innerHTML = diff.toFixed(3);
    if (Math.abs(diff) >= 94.44) {
        document.getElementById("diff").style.color = "#ff0000";
        exceeds = exceeds + 1;
    } else {
        document.getElementById("diff").style.color = "#000000";
    }
    counter = counter + 1;
    var pval = exceeds / counter;
    document.getElementById("shuffles").innerHTML = counter;
    document.getElementById("exceeds").innerHTML = exceeds;
    document.getElementById("pval").innerHTML = pval.toFixed(5);
    
}


function randSort() {
    var cellTypes = [];
    for (var i = 0; i < 75; i++) {
        cellTypes.push(data_ar[i][1]);
    }
    cellTypes.sort(function(a, b){return 0.5 - Math.random()});
    for (var i = 0; i < 75; i++){
        data_ar[i][1] = cellTypes[i];
    }
    drawTable();
}

function resetTable() {
    
    data_ar = [
[177,'Large cell'],
[162,'Large cell'],
[216,'Large cell'],
[553,'Large cell'],
[278,'Large cell'],
[12,'Large cell'],
[260,'Large cell'],
[200,'Large cell'],
[156,'Large cell'],
[182,'Large cell'],
[143,'Large cell'],
[105,'Large cell'],
[103,'Large cell'],
[250,'Large cell'],
[100,'Large cell'],
[52,'Large cell'],
[164,'Large cell'],
[19,'Large cell'],
[53,'Large cell'],
[15,'Large cell'],
[43,'Large cell'],
[340,'Large cell'],
[133,'Large cell'],
[111,'Large cell'],
[231,'Large cell'],
[378,'Large cell'],
[49,'Large cell'],
[30,'Small cell'],
[384,'Small cell'],
[4,'Small cell'],
[54,'Small cell'],
[13,'Small cell'],
[123,'Small cell'],
[97,'Small cell'],
[153,'Small cell'],
[59,'Small cell'],
[117,'Small cell'],
[16,'Small cell'],
[151,'Small cell'],
[22,'Small cell'],
[56,'Small cell'],
[21,'Small cell'],
[18,'Small cell'],
[139,'Small cell'],
[20,'Small cell'],
[31,'Small cell'],
[52,'Small cell'],
[287,'Small cell'],
[18,'Small cell'],
[51,'Small cell'],
[122,'Small cell'],
[27,'Small cell'],
[54,'Small cell'],
[7,'Small cell'],
[63,'Small cell'],
[392,'Small cell'],
[10,'Small cell'],
[25,'Small cell'],
[103,'Small cell'],
[21,'Small cell'],
[13,'Small cell'],
[87,'Small cell'],
[2,'Small cell'],
[20,'Small cell'],
[7,'Small cell'],
[24,'Small cell'],
[99,'Small cell'],
[8,'Small cell'],
[99,'Small cell'],
[61,'Small cell'],
[25,'Small cell'],
[95,'Small cell'],
[80,'Small cell'],
[51,'Small cell'],
[29,'Small cell']

]
counter = 0;
exceeds = 0;

drawTable();
}

var data_ar = [
[177,'Large cell'],
[162,'Large cell'],
[216,'Large cell'],
[553,'Large cell'],
[278,'Large cell'],
[12,'Large cell'],
[260,'Large cell'],
[200,'Large cell'],
[156,'Large cell'],
[182,'Large cell'],
[143,'Large cell'],
[105,'Large cell'],
[103,'Large cell'],
[250,'Large cell'],
[100,'Large cell'],
[52,'Large cell'],
[164,'Large cell'],
[19,'Large cell'],
[53,'Large cell'],
[15,'Large cell'],
[43,'Large cell'],
[340,'Large cell'],
[133,'Large cell'],
[111,'Large cell'],
[231,'Large cell'],
[378,'Large cell'],
[49,'Large cell'],
[30,'Small cell'],
[384,'Small cell'],
[4,'Small cell'],
[54,'Small cell'],
[13,'Small cell'],
[123,'Small cell'],
[97,'Small cell'],
[153,'Small cell'],
[59,'Small cell'],
[117,'Small cell'],
[16,'Small cell'],
[151,'Small cell'],
[22,'Small cell'],
[56,'Small cell'],
[21,'Small cell'],
[18,'Small cell'],
[139,'Small cell'],
[20,'Small cell'],
[31,'Small cell'],
[52,'Small cell'],
[287,'Small cell'],
[18,'Small cell'],
[51,'Small cell'],
[122,'Small cell'],
[27,'Small cell'],
[54,'Small cell'],
[7,'Small cell'],
[63,'Small cell'],
[392,'Small cell'],
[10,'Small cell'],
[25,'Small cell'],
[103,'Small cell'],
[21,'Small cell'],
[13,'Small cell'],
[87,'Small cell'],
[2,'Small cell'],
[20,'Small cell'],
[7,'Small cell'],
[24,'Small cell'],
[99,'Small cell'],
[8,'Small cell'],
[99,'Small cell'],
[61,'Small cell'],
[25,'Small cell'],
[95,'Small cell'],
[80,'Small cell'],
[51,'Small cell'],
[29,'Small cell']

]
