google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawChart3);
    

function drawChart1() {
        var data_ar = twoDists();
        var data = google.visualization.arrayToDataTable(data_ar);
        data.addColumn('number', 'Means');
        var group_means = [];
        for (var i = 0; i<2; i++) {
            var gsum = 0;
            var gmean = 0;
            for (var j = 0; j < 10; j++){
                gsum = gsum + data.getValue(j+i*10,1);
            }
            gmean = gsum/10;
            data.setCell(i+9*i,2,gmean);
        }
        var diff = data.getValue(0,2) - data.getValue(10,2);
        document.getElementById("difference").innerHTML = "Difference between means: " + diff.toFixed(2);

        var options = {
            title: "Random samples of two groups from the same population",
            hAxis: {title: "Treatment group", ticks: [{v:1, f:"GABA"},{v:2, f:"Control"}], viewWindowMode: "explicit", viewWindow: {min: 0.5, max: 2.5}},
            vAxis: {title: "Heart rate (BPM)", viewWindowMode: "explicit", viewWindow: {min: 5, max: 30}},
            legend: "none",
            series: {
                0: {pointShape: {type: "circle"}, color: "gray"},
                1: {pointShape: {type: "star", sides: 4, dent:0.2}, pointSize: 25}
            }

        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div1'));
        chart.draw(data, options);
}
      
      
function twoDists() {
       var dat = [["Group","Heart rate"]];
       var k = 0;
       for (var i = 0; i < 2; i++) {
        for (var j=0; j<10; j++) {
            k = jStat.normal.sample(18.7, 2.7);
            dat.push([i+1, k]);
            }
       }
       return dat;
    };

function drawChart2() {
        var num_df = Number(document.getElementById("num_df").value);
        var denom_df = Number(document.getElementById("denom_df").value);
        var data_ar = FCurve(num_df,denom_df);
        var data = google.visualization.arrayToDataTable(data_ar);
        var options = {
            title: "F distribution",
            hAxis: {title: "F ratio"},
            vAxis: {title: "Probability density"},
            legend: "none",
            series: {
                0: {areaOpacity: 0, color: "blue"},
                1: {areaOpacity: 1, lineWidth: 0, color: "red"}
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
        document.getElementById("fcrit").innerHTML = jStat.centralF.inv(0.95, num_df, denom_df).toFixed(3);
    
}

function FCurve(num_df, denom_df) {
       var dat = [["F","Probability density", "fill.p"]];
       var j = 0;
       var k = 0;
       var l = 0;
       var f_crit = jStat.centralF.inv(0.95, num_df, denom_df);
       for(var i=0; i<101; i++) {
            k = jStat.centralF.pdf(j,num_df, denom_df);
            if (j <= f_crit) {
                l = null;
            } else {
                l = k;
            }
            dat.push([j , k, l]);
            j = j + (f_crit+5)/100;

       }
       return dat;
    };
    
function drawChart3() {
        var diff = Number(document.getElementById("diff_means").value);
        var std_dev = Number(document.getElementById("std_dev").value);
        var n = Number(document.getElementById("n_t_comp").value);
        var t_val = diff/Math.sqrt(2*(std_dev*std_dev)/n);
        var t_crit = jStat.studentt.inv(0.975, 2*n-2);
        var data_ar = tdistsMeanSE(diff, std_dev, n);
        var data = google.visualization.arrayToDataTable(data_ar);
        var options = {
            title: "Effects of differences between means and size of standard error on t observed",
            hAxis: {title: "Heart rate (BPM)"},
            vAxis: {title: "Probability density"},
            series: {
                0: {areaOpacity: 0, color: "blue"},
                1: {areaOpacity: 0.5, color: "blue", linewidth: 0, visibleInLegend: false},
                2: {areaOpacity: 0, color: "red"},
                3: {areaOpacity: 0.5, color: "red", linewidth: 0, visibleInLegend: false}
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div3'));
        chart.draw(data, options);
        document.getElementById("t_obs_se_diff").innerHTML = t_val.toFixed(2);
        var p_val = 2*(1-jStat.studentt.cdf(t_val, 2*n-2));
        if (p_val < 0.0001) {
         document.getElementById("p_obs_se_diff").innerHTML = "< 0.0001";   
        } else {
        document.getElementById("p_obs_se_diff").innerHTML = p_val.toFixed(4);
        }
        if (t_val > t_crit) {
            document.getElementById("t_obs_se_diff").style.color = "red";
        } else {
            document.getElementById("t_obs_se_diff").style.color = "black";
        }

      }
      
// Make two distributions, using the standard error and difference between means specified. Plot the curves, indicate the location of the means.      
function tdistsMeanSE(diff, std_dev, n) {
       var dat = [["BP", "GABA","g_fill", "Control","c_fill"]];
       var df = 2*n-2;
       var t_crit = jStat.studentt.inv(0.975, df);
       var bp = 10;
       var gaba = 0;
       var g_fill = 0;
       var control = 0;
       var c_fill = 0;
       for(var i=0; i<201; i++) {
            bp = bp + 15/200;
            j = (bp - 21.3+diff)/(std_dev/Math.sqrt(n));
            gaba = jStat.studentt.pdf(j,df);
            if (j <= -t_crit || j >= t_crit) {
                g_fill = null;
            } else {
                g_fill = gaba;
            }
            j = (bp - 21.3)/(std_dev/Math.sqrt(n));
            control = jStat.studentt.pdf(j,df);
            if (j <= -t_crit || j >= t_crit) {
                c_fill = null;
            } else {
                c_fill = control;
            }
            dat.push([bp , gaba, g_fill, control, c_fill]);
       }


       return dat;
    };

function resetToObs() {
    document.getElementById("std_dev").value = 2.7;
    document.getElementById("diff_means").value = 5.2;
    document.getElementById("n_t_comp").value = 10;
    drawChart3();
}
