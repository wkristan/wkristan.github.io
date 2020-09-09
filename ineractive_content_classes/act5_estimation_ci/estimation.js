google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart1);
    

function drawChart() {
        var n = Number(document.getElementById("n").value);
        var data_ar = curves(n);
        var data = google.visualization.arrayToDataTable(data_ar);
        var options = {
            title: "Student's t-distributions at various degrees of freedom",
            hAxis: {title: "t", baselineColor: "transparent"},
            vAxis: {title: "Probability density"},
            legend: "none",
            series: {
                0: {areaOpacity: 0, color: "blue"},
                1: {areaOpacity: 0.5, color: "blue", linewidth: 0},
                2: {areaOpacity: 0, color: "red"},
                3: {areaOpacity: 0.5, color: "red", linewidth: 0}
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);

      }
      
      
function curves(ss) {
       var dat = [["t","z", "zfill","tdist","tdistfill"]];
       var t_crit = jStat.studentt.inv(0.975, ss-1);
       var j = -6;
       var k = 0;
       var l = 0;
       var m = 0;
       var n = 0;
       for(var i=0; i<501; i++) {
            j = j + 12/500;
            k = jStat.normal.pdf(j,0,1);
            if (j <= -1.96 || j >= 1.96) {
                l = null;
            } else {
                l = k;
            }
            m = jStat.studentt.pdf(j,ss-1);
            if (j <= -t_crit || j >= t_crit) {
                n = null;
            } else {
                n = m;
            }
            dat.push([j , k, l, m, n]);
       }
       document.getElementById("critval").innerHTML = "Critical t-value: " + t_crit.toFixed(3);


       return dat;
    };

function drawChart1() {
        var pop_dists = google.visualization.arrayToDataTable(makePop());
        var n = Number(document.getElementById("n_clt").value);
        var sample_means = samplePop(n, pop_dists);
        var mean_means = meanMeans(sample_means);
        
        var mean_data = new google.visualization.DataTable();
            mean_data.addColumn('number', 'Sample means');            
            mean_data.addRows(sample_means);
            
            
        var options_pop = {
            title: "Population - distribution of reaction times, with a population mean \u03bc = 333.33 ms",
            hAxis: {title: "Reaction time (ms)"},
            vAxis: {title: "Probability density"},
            legend: "none",
        };
        
        var options_hist = {
            title: "Sampling distribution: distribution of 1000 sample means",
            hAxis: {title: "Reaction time (ms)", viewWindowMode: "explicit", viewWindow: {min: 0, max: 1200}, ticks: [200, 400, 600, 800, 1000, 1200]},
            vAxis: {title: "Count"},
            bar: {gap: 0},
            histogram: {
                bucketSize: 20,
                maxNumBuckets: 60,
                minValue: 0,
                maxValue: 1200
                },
        legend: "none",
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div1'));
        pdf_view = new google.visualization.DataView(pop_dists);
        pdf_view.hideColumns([2]);
        chart.draw(pdf_view, options_pop);
        
        var chart_hist = new google.visualization.Histogram(document.getElementById('chart_div2'));
        chart_hist.draw(mean_data, options_hist);
        
      }

function makePop() {
    var pop = [["Reaction time","Probability density", "cdf"]];
    var x = 0;
    var cdf = 0;
    var min_cdf = (2*jStat.normal.cdf(0, 200, 30)/3 + jStat.normal.cdf(0, 600, 200)/3);
    var max_cdf = (2*jStat.normal.cdf(1200,200,30)/3 + jStat.normal.cdf(1200,600,200)/3);
    var pdf = 0;
    for (var i = 0; i < 1201; i++) {
        x = i;
        cdf = (-min_cdf + (2*jStat.normal.cdf(i, 200, 30)/3 + jStat.normal.cdf(i, 600, 200)/3))/max_cdf;
        pdf = 2*jStat.normal.pdf(i,200,30)/3 + jStat.normal.pdf(i, 600, 200)/3;
        pop.push([x,pdf,cdf]);
    }
    return pop;
}

function samplePop(n, pop_dists) {
    var rand_p = 0;
    var data_point = 0;
    var means = [];
    for (var i = 0; i < 1000; i++){
        var the_sample = [];
        for (var j = 0; j < n; j++){
            rand_p = Math.random();
            data_point = getRT(rand_p, pop_dists);
            the_sample.push(data_point);
        }
        means.push([jStat.mean(the_sample)]);

    }
    return means;
}

function getRT(rand_p, pop) {
    var the_pt = 0;
    var diff = 1;
    for (var i = 0; i < 1201; i++) {
        var diff_tmp = Math.abs(rand_p - pop.getValue(i,2));
        if (diff_tmp < diff) {
            the_pt = pop.getValue(i,0);
            diff = diff_tmp;
        }
    }
    
    return the_pt;
}

function meanMeans(means) {
    var sum = 0;
    for (var i = 0; i < 1000; i++) {
        sum = sum + Number(means[i,0]);
    }

    return sum/1000;
}
