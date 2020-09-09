google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawChart1);
    

function drawChart1() {
        var n = Number(document.getElementById("n_confint").value);
        var sample_means = samplePopCI(n);        
        
        var data = new google.visualization.DataTable();
            data.addColumn('number', 'Sample number');
            data.addColumn('number', 'Sample means');
            data.addColumn({id:'ptstyle', type:'string', role:'style'});
            data.addColumn({id:'ll', type:'number', role:'interval'});
            data.addColumn({id:'ul', type:'number', role:'interval'});
            data.addRows(sample_means);
        
        data.addRows([
        [0,3389,'line {opacity: 1}, point {size: 0}', null, null],
        [100,3389, 'line {color: #0000FF}, point {size: 0}', null, null]    
        ]);
        
            
            
        var options = {
            title: "Means and 95% confidence intervals for random samples from the population",
            vAxis: {title: "Birth weight (g)", viewWindowMode: "explicit", viewWindow: {min: 2000, max: 5000}},
            hAxis: {viewWindowMode: "explicit", viewWindow: {min: -1, max: 101}},
            legend: "none",
            pointSize: 1,
            intervals: { style: 'sticks', 'barWidth':1, 'lineWidth':0, 'pointSize':0},
            explorer: {axis: 'vertical'}
        };
        

        var chart = new google.visualization.LineChart(document.getElementById('chart_div1'));
        
        chart.draw(data, options);
        

      }


function samplePopCI(n) {
    var data_point = 0;
    var t_crit = jStat.studentt.inv(0.975, n - 1);
    var data_ar = [];
    for (var i = 1; i < 101; i++){
        var the_sample = [];
        for (var j = 0; j < n; j++){
            data_point = jStat.normal.sample(3389, 466);
            the_sample.push(data_point);
        }
        var mean_tmp = jStat.mean(the_sample);
        var stderr_tmp = jStat.stdev(the_sample, true)/Math.sqrt(n);
        var ll = mean_tmp - t_crit * stderr_tmp;
        var ul = mean_tmp + t_crit * stderr_tmp;
        
        if (ll >= 3389 || ul <= 3389) {
            
            data_ar.push([i, mean_tmp, 'line {opacity: 1}, point {size: 5; fill-color: #FF0000}', ll, ul]);
            
        } else {
            
            data_ar.push([i, mean_tmp, 'line {opacity: 1}, point {size: 3; fill-color: #000000}', ll, ul]);
        
        }

    }
    return data_ar;
}

