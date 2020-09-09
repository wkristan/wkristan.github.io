google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawChart3);
google.charts.setOnLoadCallback(drawChart4);


function drawChart1() {

    var options = {
            title: "Comparison of observed to expected frequencies",
            hAxis: {title: "Sport"},
            vAxis: {title: "Frequency", viewWindowMode: "explicit", viewWindow: {min: 0, max: 80000}},
            legend: "top"
        };
        

        var data = google.visualization.arrayToDataTable([
            ["Sport","Concussions","Expected concussions"],
            ["Basketball",9572,23525],
            ["Football", 62353, 32209],
            ["Lacrosse", 3508, 4140],
            ["Soccer", 22955, 27766],
            ["Baseball", 2579, 13328]]);

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);

      }
      
function updateChart1() {
    tot_n = 100967;
    var data = randFreqs(tot_n);    
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    var options = {
            title: "Comparison of observed to expected frequencies",
            hAxis: {title: "Sport"},
            vAxis: {title: "Frequency", viewWindowMode: "explicit", viewWindow: {min: 0, max: 0.792338090663286*tot_n}},
            legend: "top"
        };    
    chart.draw(data, options);

    
}
      
      
    
function drawChart2() {

    var options = {
            title: "Comparison of observed to expected frequencies",
            hAxis: {title: "Sport"},
            vAxis: {title: "Frequency", viewWindowMode: "explicit", viewWindow: {min: 0, max: 80000}},
            legend: "top"
        };
        

        var data = randFreqs(100967);
        var chitest_results = chiTest(data);
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
        document.getElementById("chisq_results").innerHTML = "Chi-square = " + chitest_results[0].toFixed(2) + ", p = " + chitest_results[1].toFixed(4);

      }
      
function updateChart2() {
    var tot_n = Number(document.getElementById("tot_concussions").value);
    var data = randFreqs(tot_n);
    var chitest_results = chiTest(data);  
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    var options = {
            title: "Comparison of observed to expected frequencies",
            hAxis: {title: "Sport"},
            vAxis: {title: "Frequency", viewWindowMode: "explicit", viewWindow: {min: 0, max: 0.792338090663286*tot_n}},
            legend: "top"
        };    
    chart.draw(data, options);
            document.getElementById("chisq_results").innerHTML = "Chi-square = " + chitest_results[0].toFixed(2) + ", p = " + chitest_results[1].toFixed(4);


    
}

function drawChart3() {
        var df = Number(document.getElementById("chisq_df").value);
        var data_ar = chisqCurve(df);
        var data = google.visualization.arrayToDataTable(data_ar);
        var options = {
            title: "Chi-square distribution",
            hAxis: {title: "Chi-square"},
            vAxis: {title: "Probability density"},
            legend: "none",
            series: {
                0: {areaOpacity: 0, color: "blue"},
                1: {areaOpacity: 1, lineWidth: 0, color: "red"}
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div3'));
        chart.draw(data, options);
        document.getElementById("chi_crit").innerHTML = jStat.chisquare.inv(0.95, df).toFixed(3);
    
}

function drawChart4() {
        var p_binom = Number(document.getElementById("boy_prob").value);
        var k_binom = Number(document.getElementById("fam_size").value);
        var data_ar = binomDist(p_binom, k_binom);
        var data = google.visualization.arrayToDataTable(data_ar);
        var options = {
            title: "Binomial distribution",
            hAxis: {title: "Number of boys"},
            vAxis: {title: "Probability"},
            legend: "none",

        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div4'));
        chart.draw(data, options);    
    
}

function randFreqs(n_total) {
       var cum_prob = [0.233, 0.552, 0.593, 0.868, 1];
       var exp_con = [0.233*n_total, 0.319*n_total, 0.041*n_total, 0.275*n_total, 0.132*n_total];
       var bb = 0;
       var fb = 0;
       var lac = 0;
       var soc = 0;
       var base = 0;
       for(var i=0; i<n_total; i++) {
            rand = Math.random();
            if (rand <= cum_prob[0]) {
                bb = bb + 1;
            } else if (rand <= cum_prob[1]) {
                fb = fb + 1;
            } else if (rand <= cum_prob[2]) {
                lac = lac + 1;
            } else if (rand <= cum_prob[3]) {
                soc = soc + 1;
            } else {
                base = base + 1;
            }
       }
       var data = new google.visualization.DataTable();
       data.addColumn('string','Sport');
       data.addColumn('number','Concussions');
       data.addColumn('number', 'Expected concussions');
       data.addRows([
         ['Basketball', bb, exp_con[0]],
         ['Football', fb, exp_con[1]],
         ['Lacrosse', lac, exp_con[2]],
         ['Soccer', soc, exp_con[3]],
         ['Baseball', base, exp_con[4]]
         ]);

       return data;
    };


function chiTest(data) {
    var chisq_obs = 0;
    var pval = 0;
    for (var i = 0;i < 5;i++) {
        var diff = data.getValue(i,1)-data.getValue(i,2);
        chisq_obs = chisq_obs + (diff*diff)/data.getValue(i,2);
    }
    pval = 1-jStat.chisquare.cdf(chisq_obs, 4);
    var test_result = [chisq_obs, pval];
    return test_result;
    
};

function chisqCurve(df) {
       var dat = [["Chi-square","Probability density", "fill.p"]];
       var j = 0;
       var k = 0;
       var l = 0;
       var chi_crit = jStat.chisquare.inv(0.95, df);
       for(var i=0; i<301; i++) {
            k = jStat.chisquare.pdf(j,df);
            if (j <= chi_crit) {
                l = null;
            } else {
                l = k;
            }
            dat.push([j , k, l]);
            j = j + (chi_crit+df)/300;

       }
       return dat;
    };
    
function binomDist(p, n) {
    var dat = [["Number males", "Probability"]];
    var prob = 0;
    for (var i = 0; i < n+1; i++) {
        prob = jStat.binomial.pdf(i, n, p);
        dat.push([i.toString(),prob]);
    }
    return dat;
};
