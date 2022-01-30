google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
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
