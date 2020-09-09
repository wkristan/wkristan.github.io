google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
    var n = Number(document.getElementById("tot_tosses").value);
    var data = randFreqs(n);
    var chisq_results = doChisq(data);
    var options = {
            title: "Frequencies of outcomes of two simultaneous coin tosses",
            hAxis: {title: "Coin 2"},
            vAxis: {title: "Frequency", viewWindowMode: "explicit", viewWindow: {min: 0, max: Math.round(n/2)}},
            legend: "right",
                    intervals: {'color':'series-color'},
        interval: {
                'coin1heads_interval1': { 'color':'yellow', 'style':'bars', 'barWidth':0,'lineWidth':2, 'pointSize':0, 'fillOpacity':1},
                'coin1heads_interval2': { 'color':'black', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':10, 'fillOpacity':1},
                'coin1heads_interval1': { 'color':'yellow', 'style':'bars', 'barWidth':0,'lineWidth':2, 'pointSize':0, 'fillOpacity':1},
                'coin1tails_interval2': { 'color':'black', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':10, 'fillOpacity':1}
                
            },
        };
        
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    document.getElementById("chisq_stat").innerHTML = chisq_results[0].toFixed(4);
    document.getElementById("p_value").innerHTML = chisq_results[1].toFixed(4);
    if (chisq_results[1] < 0.05) {
        document.getElementById("p_value").style.color = "red";
    } else {
        document.getElementById("p_value").style.color = "black";
    }

    var table_data = new google.visualization.DataTable();
        table_data.addColumn('string', 'Coin 2');
        table_data.addColumn('string', 'Coin 1 Heads');
        table_data.addColumn('string', 'Coin 1 Tails');
        table_data.addColumn('string', 'Totals for Coin 2');
        table_data.addRows([
            ['Heads', chisq_results[2][0][0].toString() + " (" + chisq_results[3][0][0].toFixed(1).toString() + ")", chisq_results[2][0][1].toString() + " (" + chisq_results[3][0][1].toFixed(2).toString() + ")", (chisq_results[2][0][0] + chisq_results[2][0][1]).toString()],
            ['Tails', chisq_results[2][1][0].toString() + " (" + chisq_results[3][1][0].toFixed(1).toString() + ")", chisq_results[2][1][1].toString() + " (" + chisq_results[3][1][1].toFixed(2).toString() + ")", (chisq_results[2][1][0] + chisq_results[2][1][1]).toString()],
            ['Totals for Coin 1', (chisq_results[2][0][0] + chisq_results[2][1][0]).toString(), (chisq_results[2][0][1] + chisq_results[2][1][1]).toString(),n.toString()]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(table_data, {showRowNumber: false, width: 'auto', height: '100%', sort: false, allowHTML: true});

}
      
  
      
function randFreqs(n) {
    var c1_h_c2_h = 0;
    var c1_t_c2_h = 0;
    var c1_h_c2_t = 0;
    var c1_t_c2_t = 0;
    var rand1, rand2 = 0;
    for(var i=0; i<n; i++) {
            rand1 = Math.random();
            rand2 = Math.random();
            if (rand1 <= 0.5 && rand2 <= 0.5) {
                c1_h_c2_h = c1_h_c2_h + 1;
            } else if (rand1 <= 0.5 && rand2 > 0.5) {
                c1_h_c2_t = c1_h_c2_t + 1;
            } else if (rand1 > 0.5 && rand2 <= 0.5) {
                c1_t_c2_h = c1_t_c2_h + 1;
            } else {
                c1_t_c2_t = c1_t_c2_t + 1;
            }
       }
       
       var c1h = c1_h_c2_h + c1_h_c2_t;
       var c1t = c1_t_c2_h + c1_t_c2_t;
       var c2h = c1_h_c2_h + c1_t_c2_h;
       var c2t = c1_h_c2_t + c1_t_c2_t;
       var tot = c1h + c1t;
       
       var data = new google.visualization.DataTable();
       data.addColumn('string','Coin 2');
       data.addColumn('number','Coin 1 Heads');
       data.addColumn({id:'coin1heads_interval1', type:'number', role:'interval'});
       data.addColumn({id:'coin1heads_interval2', type:'number', role:'interval'});
       data.addColumn('number', 'Coin 1 Tails');
       data.addColumn({id:'coin1tails_interval1', type:'number', role:'interval'});
       data.addColumn({id:'coin1tails_interval2', type:'number', role:'interval'});
       data.addRows([
         ['Heads', c1_h_c2_h, c1_h_c2_h, c1h*c2h/tot, c1_t_c2_h, c1_t_c2_h, c1t*c2h/tot],
         ['Tails', c1_h_c2_t, c1_h_c2_t, c1h*c2t/tot, c1_t_c2_t, c1_t_c2_t, c1t*c2t/tot],
         ]);
       
       return data;
    }

function doChisq(data) {
    var obs = [[0,0],[0,0]];
    var exp = [[0,0],[0,0]];
    var chisq = 0;

    for (i = 0; i<2; i++) {
        for (j = 0; j<2; j++) {
        obs[i][j] = data.getValue(i,3*j+1);
        }
    }
    
    for (i = 0; i<2; i++) {
        for (j = 0; j<2; j++) {
            exp[i][j] = data.getValue(i, 3*j + 3);
        }
    }

    for (i = 0; i< 2; i++) {
        for (j = 0; j < 2; j++) {
            chisq = chisq + (obs[i][j] - exp[i][j])*(obs[i][j] - exp[i][j])/exp[i][j];
        }
    }
    
    var pval = 1-jStat.chisquare.cdf(chisq,1);
    var results = [chisq, pval, obs, exp];

    return results;
}
