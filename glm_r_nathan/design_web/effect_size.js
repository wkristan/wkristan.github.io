google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart2);



function drawChart2() {
        var mean_diff = document.getElementById("diff_btwn_means").value;
        var stdev = document.getElementById("sd").value;
        var eff_size = mean_diff / stdev;
        var data = makeData(mean_diff, stdev);
        var options = {
            title: "Effect size: " + eff_size.toFixed(2),
            hAxis: {title: null, ticks: [{v:5, f:"Group 1"},{v:18, f:"Group 2"}]},
            vAxis: {title: "Response variable"},
            intervals: {'color':'series-color'},
            interval: {
                'i0': { 'color':'red', 'style':'bars', 'barWidth':0,'lineWidth':4, 'pointSize':0, 'fillOpacity':1},
                'i1': { 'color':'black', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':10, 'fillOpacity':1}
                
            },
            legend: "none",


        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
}
      
      
function makeData(mean_diff, stdev) {
        var dat_ar = [
[1,100,100,0],
[2,100,100,0],
[3,100,100,0],
[4,100,100,0],
[5,100,100,0],
[6,100,100,0],
[7,100,100,0],
[8,100,100,0],
[9,100,100,0],
[10,100,100,0],
[11,null,null,null],
[12,null,null,null],
[13,null,null,null],
[14,100,100,0],
[15,100,100,0],
[16,100,100,0],
[17,100,100,0],
[18,100,100,0],
[19,100,100,0],
[20,100,100,0],
[21,100,100,0],
[22,100,100,0],
[23,100,100,0]
];
        var settings_ar = [
[1,100,-2,0.152242631790109],
[2,100,-2,-0.97020743149108],
[3,100,-2,0.251650410030293],
[4,100,-2,-1.90949676044108],
[5,100,-2,0.751823004917234],
[6,100,-2,1.06491944790056],
[7,100,-2,1.22146766939223],
[8,100,-2,-0.97020743149108],
[9,100,-2,-0.0309181025410933],
[10,100,-2,0.438726561933904],
[11,null,null,null],
[12,null,null,null],
[13,null,null,null],
[14,100,2,0.835188327898563],
[15,100,2,0.636333964113191],
[16,100,2,-0.95450094616979],
[17,100,2,-0.556792218599043],
[18,100,2,1.03404269168393],
[19,100,2,-1.35220967374053],
[20,100,2,0.636333964113191],
[21,100,2,-1.35220967374053],
[22,100,2,-0.159083491028299],
[23,100,2,1.23289705546931]
];
        var diff_mult = mean_diff/4

        
    for (var i = 0; i<23; i++) {
        if (typeof(dat_ar[i][1]) !== "undefined" && dat_ar[i][1]) {
            dat_ar[i][1] = settings_ar[i][1] + settings_ar[i][2]*diff_mult;
            dat_ar[i][2] = dat_ar[i][1];
            dat_ar[i][3] = dat_ar[i][1] + settings_ar[i][3] * stdev;
        }
    }
    var data = new google.visualization.DataTable();
        data.addColumn('number', 'x');
        data.addColumn('number', 'Group mean');
        data.addColumn({id:'i0', type:'number', role:'interval'});
        data.addColumn({id:'i1', type:'number', role:'interval'});
        data.addRows(dat_ar);
    
    return data;
}


