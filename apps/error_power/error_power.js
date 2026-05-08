google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart4);

var current = 0;
var data = [];
    
function drawChart4() {
        var diff = Number(document.getElementById("diff_means").value);
        var alpha = Number(document.getElementById("alpha").value);
        var n = Number(document.getElementById("n_t_comp").value);
        var se = Math.sqrt(7.3*2/n);
        var t_crit = jStat.studentt.inv(1-alpha/2, 2*n-2);
        dataDists(diff, n, se, t_crit);
        
        var options_nulltrue_t = {
                hAxis: {title: "t"},
                vAxis: {title: "Probability density"},
                series: {
                    0: {areaOpacity: 0.5, color: "none", linewidth: 0, visibleInLegend: false},
                    1: {areaOpacity: 0.5, color: "none", linewidth: 0, visibleInLegend: false},
                    2: {areaOpacity: 0, color: "none"},
                    3: {areaOpacity: 0.5, color: "blue", linewidth: 0, visibleInLegend: false},
                    4: {areaOpacity: 0, color: "blue"}
                },
                legend: {position: "top"}
            }
        
         var options_nullfalse_t = {
            hAxis: {title: "t"},
            vAxis: {title: "Probability density"},
            series: {
                0: {areaOpacity: 1, color: "yellow", linewidth: 0, visibleInLegend: false},
                1: {areaOpacity: 0.5, color: "red", linewidth: 0, visibleInLegend: false},
                2: {areaOpacity: 0, color: "red"},
                3: {areaOpacity: 0.5, color: "blue", linewidth: 0, visibleInLegend: false},
                4: {areaOpacity: 0, color: "blue"}
            },
            legend: {position: "top"}
        }
        
        var options_nulltrue_bpm = {
                hAxis: {title: "Difference in BPM"},
                vAxis: {title: "Probability density"},
                series: {
                    0: {areaOpacity: 0.5, color: "none", linewidth: 0, visibleInLegend: false},
                    1: {areaOpacity: 0.5, color: "none", linewidth: 0, visibleInLegend: false},
                    2: {areaOpacity: 0, color: "none"},
                    3: {areaOpacity: 0.5, color: "blue", linewidth: 0, visibleInLegend: false},
                    4: {areaOpacity: 0, color: "blue"}
                },
                legend: {position: "top"}
            }
        
         var options_nullfalse_bpm = {
            hAxis: {title: "Difference in BPM"},
            vAxis: {title: "Probability density"},
            series: {
                0: {areaOpacity: 1, color: "yellow", linewidth: 0, visibleInLegend: false},
                1: {areaOpacity: 0.5, color: "red", linewidth: 0, visibleInLegend: false},
                2: {areaOpacity: 0, color: "red"},
                3: {areaOpacity: 0.5, color: "blue", linewidth: 0, visibleInLegend: false},
                4: {areaOpacity: 0, color: "blue"}
            },
            legend: {position: "top"}
        }

        
        var options = [
            [options_nulltrue_t, options_nullfalse_t],
            [options_nulltrue_bpm, options_nullfalse_bpm]
        ]
        

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div4'));
            
        if(diff == 0){
            if(current == 0) {
                    chart.draw(data[0], options[0][0]);
                } else {
                    chart.draw(data[1], options[1][0]);
                }
            } else {
                if(current == 0) {
                    chart.draw(data[0], options[0][1]);
                } else {
                    chart.draw(data[1], options[1][1]);
                }
            }
        
        var power = 1-jStat.studentt.cdf(t_crit-diff/se,2*n-2);
        var beta = 1-power;
        if(diff == 0) {
            document.getElementById("beta_power").style.display = "none";
            document.getElementById("alpha_error").style.display = "inline";
            document.getElementById("alpha_level").innerHTML = alpha;
        } else {
            document.getElementById("alpha_error").style.display = "none";
            document.getElementById("beta_power").style.display = "inline";
            document.getElementById("beta_error").innerHTML = beta.toFixed(4);
            document.getElementById("power").innerHTML = power.toFixed(4);
        }
        

      }
      
// Make two t-distributions, using the difference between means, alpha level, and sample size specified. Plot the curves, indicate the location of the means.      
function dataDists(diff, n, se, t_crit) {
       var dat_t = [["t", "b_fill", "p_fill", "Alternative", "n_fill", "Null"]];
       var dat_bpm = [["BPM", "b_fill","p_fill","Alternative","n_fill","Null"]];
       var df = 2*n-2;
       var t_val = -4;
       var diff_se = diff/se;
       var null_line = 0;
       var alt_line = 0;
       var n_fill = 0;
       var p_fill = 0;
       var b_fill = 0;
       for(var i=0; i<201; i++) {
            t_val = t_val + 16/200;
            null_line = jStat.studentt.pdf(t_val,df);
            if (t_val <= -t_crit || t_val >= t_crit) {
                n_fill = null_line;
            } else {
                n_fill = null;
            }
            alt_line = jStat.studentt.pdf(t_val-diff_se,df);
            if (t_val <= t_crit) {
                b_fill = alt_line;
            } else {
                b_fill = null;
            }
            if (t_val >= t_crit) {
                p_fill = alt_line;
            } else {
                p_fill = null;
            }
            dat_t.push([t_val, b_fill, p_fill, alt_line, n_fill, null_line]);
       }
       
        var bpm = -4;
        for(var i = 0; i<201; i++){
             bpm = bpm + 16/200;
             t_val = bpm/se;
             null_line = jStat.studentt.pdf(t_val,df);
             if (t_val <= -t_crit || t_val >= t_crit) {
                n_fill = null_line;
            } else {
                n_fill = null;
            }
            alt_line = jStat.studentt.pdf(t_val-diff_se,df);
            if (t_val <= t_crit) {
                b_fill = alt_line;
            } else {
                b_fill = null;
            }
            if (t_val >= t_crit) {
                p_fill = alt_line;
            } else {
                p_fill = null;
            }
            
            dat_bpm.push([bpm, b_fill, p_fill, alt_line, n_fill, null_line]);
        }


       data[0] = google.visualization.arrayToDataTable(dat_t);
       data[1] = google.visualization.arrayToDataTable(dat_bpm);
    };

function resetToObs() {
    document.getElementById("alpha").value = 0.05;
    document.getElementById("diff_means").value = 2.7;
    document.getElementById("n_t_comp").value = 10;
    drawChart4();
}

function switchChart() {
    current = 1-current;
    if(current == 0){
        document.getElementById("ct").innerHTML = "BPM";
    } else {
        document.getElementById("ct").innerHTML = "t";
    }
    drawChart4();
}
