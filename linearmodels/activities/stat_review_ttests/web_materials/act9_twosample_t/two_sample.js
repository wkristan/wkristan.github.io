function drawAll() {
    drawChart1();
    drawChart2();
    drawChart3();
}

function drawChart1() {
        var data_ar = twoDists();
        var group_means = calcGroupMeans(data_ar);
        var diff = group_means.control - group_means.gaba;
        document.getElementById("difference").innerHTML = "Difference between means: " + diff.toFixed(2);

        var points = {
            x: data_ar.group,
            y: data_ar.heartrate,
            type: "scatter",
            mode: "markers"
        }
        
        var means = {
            x: ["Control","GABA"],
            y: [group_means.control, group_means.gaba],
            type: "scatter",
            mode: "markers",
            marker: {
                color: 'red',
                symbol: 'cross',
                size: 12
            }
        }
        
        var layout = {
            title: {
                text: "Heart rates of lobsters"
            },
            showlegend: false,
            yaxis: {
                range: [5,30],
                title: {
                    text: "Heart rate (bpm)"
                }
        }
    }
        
        var data = [points, means];

        Plotly.newPlot("chart_div1", data, layout);

}
      
      
function twoDists() {
       var dat = {group: [], heartrate: []};
       var k = 0;
       var grp = "Control";
       for (var i = 0; i < 2; i++) {
           for (var j=0; j<10; j++) {
               k = jStat.normal.sample(18.7, 2.7);
               dat.group.push(grp);
               dat.heartrate.push(k);
            }
        grp = "GABA";
       }
       return dat;
    };
    
    
function calcGroupMeans(data_ar) {
    var gsum = {control: 0, gaba: 0};
    var gmean = {control: 0, gaba: 0};
    for (var j = 0; j < 20; j++){
        if (data_ar.group[j] == "Control") {
                gsum.control = gsum.control + data_ar.heartrate[j];
            } else {
                gsum.gaba = gsum.gaba + data_ar.heartrate[j];
            }
        }
            
        gmean.control = gsum.control/10;
        gmean.gaba = gsum.gaba/10;
        return gmean;
};

function drawChart2() {
        var num_df = Number(document.getElementById("num_df").value);
        var denom_df = Number(document.getElementById("denom_df").value);
        var fdist = FCurve(num_df,denom_df);

        var curve = {
            x: fdist.curve.F,
            y: fdist.curve.p_curve,
            type: "scatter",
            showlegend: false,
            line: {
                color: 'black'
            }
        }
        
        var fill = {
            x: fdist.fill.F,
            y: fdist.fill.p_fill,
            fill: "tozeroy",
            showlegend: false,
            mode: 'none',
            fillcolor: 'rgb(255,0,0)'
        }
        
        var data = [fill, curve];
        
        var layout = {
            title: {
                text: "F distribution"
            },
            xaxis: {
                title: {
                    text: "F value"
                }
            },
            yaxis: {
                title: {
                    text: "Prob. density"
                }
            }
        }
        
        Plotly.newPlot("chart_div2", data, layout);

        document.getElementById("fcrit").innerHTML = jStat.centralF.inv(0.95, num_df, denom_df).toFixed(3);
    
}

function FCurve(num_df, denom_df) {
       var dat = {curve: {F: [], p_curve: []}, fill: {F: [], p_fill: []}};
       var j = 0;
       var k = 0;
       var l = 0;
       var f_crit = jStat.centralF.inv(0.95, num_df, denom_df);
       for(var i=0; i<101; i++) {
            k = jStat.centralF.pdf(j,num_df, denom_df);
            dat.curve.F.push(j);
            dat.curve.p_curve.push(k);
            if (j <= f_crit) {
                dat.fill.F.push(j);
                dat.fill.p_fill.push(k);
            }

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
        var control_curve = tdistsMeanSE(0, std_dev, n);
        var gaba_curve = tdistsMeanSE(diff, std_dev, n);

        var cont_curve = {
            x: control_curve.curve.BP,
            y: control_curve.curve.curve,
            type: "scatter",
            name: "Control",
            line: {
                color: 'rgb(255,0,0)'
            }
        }
        
        var cont_fill = {
            x: control_curve.fill.BP,
            y: control_curve.fill.fill,
            fill: 'tozeroy',
            fillcolor: 'rgba(255,0,0,0.5)',
            type: 'scatter',
            mode: 'none',
            showlegend: false
        }
        
        var gb_curve = {
            x: gaba_curve.curve.BP,
            y: gaba_curve.curve.curve,
            type: "scatter",
            name: "GABA",
            line: {
                color: 'rgb(0,0,255)'
            }
        }
        
        var gb_fill = {
            x: gaba_curve.fill.BP,
            y: gaba_curve.fill.fill,
            fill: 'tozeroy',
            fillcolor: 'rgba(0,0,255,0.5)',
            type: 'scatter',
            mode: 'none',
            showlegend: false
        }
        
        
        
        var data = [cont_fill, gb_fill, cont_curve, gb_curve];
        
        var layout = {
            title: {
                text: "Lobster heart rates"
            },
            xaxis: {title: 
                {
                    text: "Heart rate (bpm)"
                }
            }
        }
        
        Plotly.newPlot("chart_div3", data, layout);

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
       var dat = {curve: {BP: [], curve: []}, fill: {BP: [], fill: []}};
       var df = 2*n-2;
       var t_crit = jStat.studentt.inv(0.975, df);
       var bp = 10;
       var curve = 0;
       var fill = 0;
       for(var i=0; i<201; i++) {
            j = (bp - 21.3 + diff)/(std_dev/Math.sqrt(n));
            curve = jStat.studentt.pdf(j,df);
            dat.curve.BP.push(bp);
            dat.curve.curve.push(curve);
            if (j >= -t_crit && j <= t_crit) {
                dat.fill.BP.push(bp);
                dat.fill.fill.push(curve);
            }
            bp = bp + 15/200;

       }


       return dat;
    };

function resetToObs() {
    document.getElementById("std_dev").value = 2.7;
    document.getElementById("diff_means").value = 5.2;
    document.getElementById("n_t_comp").value = 10;
    drawChart3();
}
