google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);

    
        
function drawChart1() {
    var data = makeData();
    var options = {
        title: 'Standard curve - absorbance as a function of protein concentration',
        hAxis: {title: 'Concentration (mg/l)', viewWindowMode: "explicit", viewWindow: {min: -5, max: 45}},
        vAxis: {title: 'Absorbance (AU)', viewWindowMode: "explicit", viewWindow: {min: 0, max: 0.6}},
        series: {
            1: {color:"magenta"}
        },
        intervals: {'color':'series-color'},
        interval: {
                'i0': { 'color':'red', 'style':'bars', 'barWidth':0,'lineWidth':2, 'pointSize':0, 'fillOpacity':1},
                'i1': { 'color':'black', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':10, 'fillOpacity':1}
                
            },
        };


        chart = new google.visualization.LineChart(document.getElementById('chart_div1'));
        
        nobest_view = new google.visualization.DataView(data);
        nobest_view.hideColumns([2]);
        chart.draw(nobest_view, options);
        
        document.getElementById("cur_slope").innerHTML = document.getElementById("slope").value;
        document.getElementById("cur_int").innerHTML = document.getElementById("int").value;
        
        var revealBest = document.getElementById("reveal");
        revealBest.onclick = function () {
            document.getElementById("best_eqn").innerHTML = "Absorbance = 0.0107 * Concentration + 0.0883";
            chart.draw(data, options);

        }
        
        var resetGraph = document.getElementById("reset_slope_int");
        resetGraph.onclick = function () {
            document.getElementById("slope").value = 0;
            document.getElementById("int").value = 0.3;
            drawChart1();
            document.getElementById("best_eqn").innerHTML = "";
        }
        
      }
      
function makeData() {
    var data_ar = [
        [0, null, 0.0883427939126024, null, 0.0860536330370221],
        [0, null, 0.0883427939126024, null, 0.0650629678967899],
        [0, null, 0.0883427939126024, null, 0.0940565832145691],
        [0, null, 0.0883427939126024, null, 0.0716560419411107],
        [0, null, 0.0883427939126024, null, 0.141577332831667],
        [10, null, 0.195653690348347, null, 0.254999124254404],
        [10, null, 0.195653690348347, null, 0.171129368958751],
        [10, null, 0.195653690348347, null, 0.202494763916948],
        [10, null, 0.195653690348347, null, 0.156905163918212],
        [10, null, 0.195653690348347, null, 0.162058855257296],
        [20, null, 0.302964586784091, null, 0.305111803905716],
        [20, null, 0.302964586784091, null, 0.296705008385342],
        [20, null, 0.302964586784091, null, 0.311845649566919],
        [20, null, 0.302964586784091, null, 0.346194201034744],
        [20, null, 0.302964586784091, null, 0.293383803339786],
        [30, null, 0.410275483219836, null, 0.424437211502753],
        [30, null, 0.410275483219836, null, 0.397856211032328],
        [30, null, 0.410275483219836, null, 0.369702353599414],
        [30, null, 0.410275483219836, null, 0.377975530995722],
        [30, null, 0.410275483219836, null, 0.429844213220639],
        [40, null, 0.51758637965558, null, 0.562000639067126],
        [40, null, 0.51758637965558, null, 0.547985605919053],
        [40, null, 0.51758637965558, null, 0.459753084004407],
        [40, null, 0.51758637965558, null, 0.495593254892186],
        [40, null, 0.51758637965558, null, 0.549732263909375]
    ];
    
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Concentration');
    data.addColumn('number', 'Your line');
    data.addColumn('number', 'Best line');
    data.addColumn({id:'i0', type:'number', role:'interval'});
    data.addColumn({id:'i1', type:'number', role:'interval'});
    data.addRows(data_ar);
        
    var slope = Number(document.getElementById("slope").value);
    var int = Number(document.getElementById("int").value);
    for (var i = 0; i<25; i++) {
        var x = data.getValue(i,0);
        var y = x * slope + int;
        data.setCell(i,1,y);
        data.setCell(i,3,y);
    }
    return data;
}




function drawChart2() {
    var data = makeRand();
    var options = {
        title: 'Randomly generated absorbance data',
        hAxis: {title: 'Concentration (mg/l)', viewWindowMode: "explicit", viewWindow: {min: -5, max: 45}},
        vAxis: {title: 'Absorbance (AU)', viewWindowMode: "explicit", viewWindow: {min: 0, max: 0.6}},
        legend: 'none',
        intervals: {'color':'series-color'},
        interval: {
                'data': { 'color':'red', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':5, 'fillOpacity':1}
                
            },
        };


        chart = new google.visualization.LineChart(document.getElementById('chart_div2'));

        chart.draw(data, options);
        
        
      }
      
function makeRand() {
    var data_ar = [
        [0, null, null],
        [0, null, null],
        [0, null, null],
        [0, null, null],
        [0, null, null],
        [10, null, null],
        [10, null, null],
        [10, null, null],
        [10, null, null],
        [10, null, null],
        [20, null, null],
        [20, null, null],
        [20, null, null],
        [20, null, null],
        [20, null, null],
        [30, null, null],
        [30, null, null],
        [30, null, null],
        [30, null, null],
        [30, null, null],
        [40, null, null],
        [40, null, null],
        [40, null, null],
        [40, null, null],
        [40, null, null]
    ];
    
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Concentration');
    data.addColumn('number', 'Predicted');
    data.addColumn({id:'data', type:'number', role:'interval'});
    data.addRows(data_ar);
    
    var ydat = [];
    var xdat = [];

    for (var i = 0; i<25; i++) {
        var x = data.getValue(i,0);
        var y = jStat.normal.sample(0.303, 0.158);
        data.setCell(i,2,y);
        ydat.push(y);
        xdat.push(x);
    }
    
    var corrxy = jStat.corrcoeff(xdat, ydat);
    var ysd = jStat.stdev(ydat,true);
    var ymean = jStat.mean(ydat);
    var slope = corrxy*ysd/14.43;
    var int = ymean - slope * 20;
    
    for (var i = 0; i < 25; i++){
        var x = data.getValue(i,0);
        var pred = slope * x + int;
        data.setCell(i,1,pred);
    }
    document.getElementById("rand_eqn").innerHTML = "Absorbance = " + slope.toFixed(3) + " Concentration + " + int.toFixed(3);
    return data;
}
