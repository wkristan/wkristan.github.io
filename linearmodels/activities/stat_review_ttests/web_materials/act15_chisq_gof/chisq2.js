google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart2() {

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

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart.draw(data, options);

      }
      
function updateChart2() {
    var tot_n = Number(document.getElementById(tot_concussions).value);
    var data = randFreqs(tot_n);    
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    var options = {
            title: "Comparison of observed to expected frequencies",
            hAxis: {title: "Sport"},
            vAxis: {title: "Frequency", viewWindowMode: "explicit", viewWindow: {min: 0, max: 0.792338090663286*tot_n}},
            legend: "top"
        };    
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
    
    
};
    
// Calculate a Chi-square GOF from the obs and expected
