
function drawCharts() {
    drawChart1();
    drawChart2();
    drawChart3();
}    

function drawChart1() {

    var data = twoDists();
    var means = calcMeans(data);
    var diff = means.hr1 - means.hr2;
    
    document.getElementById("difference").innerHTML = "Difference between means: " + diff.toFixed(2);
    
    var grp1 = {
        x: data[0].x,
        y: data[0].hr,
        type: 'scatter',
        mode: 'markers'
    }
    
    var grp2 = {
        x: data[1].x,
        y: data[1].hr,
        type: 'scatter',
        mode: 'markers'
    }
    
    var themeans = {
        x: ['GABA','Control'],
        y: [means.hr1,means.hr2],
        type: 'scatter',
        mode: 'markers',
        marker: {
            size: 10,
            color: 'red'
        }
    }
    
    var layout = {
        title: 'Heart rates of two groups of lobsters',
        showlegend: false,
        yaxis: {
            range: [10,25],
            title: 'Heart rate'
        },
        xaxis: {
            range: [-1,2]
        }
    }
    
    Plotly.newPlot("chart_div1", [grp1, grp2, themeans], layout);


}
      
      
function twoDists() {
    var hr1 = {hr: [], x: []};
    var hr2 = {hr: [], x: []};
    var k = 0;
    for (var i=0; i<10; i++) {
        k = jStat.normal.sample(18.7, 2.7);
        hr1.x.push("GABA");
        hr1.hr.push(k);
    }
    for (var i=0; i<10; i++) {
        k = jStat.normal.sample(18.7, 2.7);
        hr2.x.push("Control");
        hr2.hr.push(k);
    }    
    
    return [hr1,hr2];
};
    
function calcMeans(data) {
    var means = {hr1: 0, hr2: 0};
    
    means.hr1 = jStat(data[0].hr).mean();
    means.hr2 = jStat(data[1].hr).mean();
    
    return means;
}

function drawChart2() {
    var num_df = Number(document.getElementById("num_df").value);
    var denom_df = Number(document.getElementById("denom_df").value);
    var data_object = FCurve(num_df,denom_df);
    
    var fcurve = {
        x: data_object.F,
        y: data_object.p,
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'black',
            width: 2
        },
        showlegend: false
    }

    var ffill = {
        x: data_object.F,
        y: data_object.fill_p,
        type: 'scatter',
        fill: 'tozeroy',
        fillcolor: 'red',
        showlegend: false
    }



    var layout = {
            title: "F distribution",
            xaxis: {title: "F ratio"},
            yaxis: {title: "Probability density"},
        };

    Plotly.newPlot("chart_div2", [ffill, fcurve], layout);

        
    document.getElementById("fcrit").innerHTML = jStat.centralF.inv(0.95, num_df, denom_df).toFixed(3);
    
}

function FCurve(num_df, denom_df) {
       var dat = {F: [],p: [], fill_p: []};
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
            dat.F.push(j);
            dat.p.push(k);
            dat.fill_p.push(l);
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
        var data_object = tdistsMeanSE(diff, std_dev, n);
        
        var gaba_curve = {
            x: data_object.BP,
            y: data_object.GABA,
            type: 'scatter',
            mode: 'lines',
            name: 'GABA',
            line: {
                color: 'red',
                width: 2
            }
        }
        
        var control_curve = {
            x: data_object.BP,
            y: data_object.control,
            type: 'scatter',
            mode: 'lines',
            name: 'Control',
            line: {
                color: 'blue',
                width: 2
            }
        }
        
        var gaba_fill = {
            x: data_object.BP,
            y: data_object.g_fill,
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(255,0,0,0.5)',
            showlegend: false
        }
        
        var control_fill = {
            x: data_object.BP,
            y: data_object.c_fill,
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(0,0,255,0.5)',
            showlegend: false
        }
        
        var layout = {
            title: 'Effects of differences between means and size of standard error<br>on t observed',
            xaxis: {
                title: 'Heart rate (BPM)'
            },
            yaxis: {
                title: 'Probability density'
            }
        }

        var options = {
            hAxis: {title: "Heart rate (BPM)"},
            vAxis: {title: "Probability density"},
            series: {
                0: {areaOpacity: 0, color: "blue"},
                1: {areaOpacity: 0.5, color: "blue", linewidth: 0, visibleInLegend: false},
                2: {areaOpacity: 0, color: "red"},
                3: {areaOpacity: 0.5, color: "red", linewidth: 0, visibleInLegend: false}
            }
        };


    Plotly.newPlot("chart_div3", [gaba_fill, gaba_curve, control_fill, control_curve], layout);
        
        
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
       var dat = {BP: [], GABA: [], g_fill: [], control: [], c_fill: []};
       var df = 2*n-2;
       var t_crit = jStat.studentt.inv(0.975, df);
       var tval = 0;
       var bp = 10;
       var gaba = 0;
       var g_fill = 0;
       var control = 0;
       var c_fill = 0;
       var control_mean = 21.3;
       var gaba_mean = 21.3 - diff;
       var stder = std_dev/Math.sqrt(n);
       for(var i=0; i<201; i++) {
            bp = bp + 15/200;
            tval = (bp-gaba_mean)/stder;
            gaba = jStat.studentt.pdf(tval,df);
            if (tval <= -t_crit || tval >= t_crit) {
                g_fill = null;
            } else {
                g_fill = gaba;
            }
            tval = (bp - control_mean)/stder;
            control = jStat.studentt.pdf(tval,df);
            if (tval <= -t_crit || tval >= t_crit) {
                c_fill = null;
            } else {
                c_fill = control;
            }
            dat.BP.push(bp);
            dat.GABA.push(gaba);
            dat.g_fill.push(g_fill);
            dat.control.push(control);
            dat.c_fill.push(c_fill);
       }


       return dat;
    };

function resetToObs() {
    document.getElementById("std_dev").value = 2.7;
    document.getElementById("diff_means").value = 5.2;
    document.getElementById("n_t_comp").value = 10;
    drawChart3();
}
