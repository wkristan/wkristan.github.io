

var popdist = {x: [], y: []};
var diffs = {x: [], y: [], x_rnd: []};
var diffs_count = {x: [], y: []};
var num_iter = 0;
var current = 0;

for (i = 0; i < 81; i++) {
    var x_i = 60 + i;
    popdist.x.push(x_i);
    popdist.y.push(jStat.normal.pdf(popdist.x[i], 100, 10));
}

for (i = 0; i<101; i++) {
    diffs_count.x.push(-50 + i);
    diffs_count.y.push(0);
}

function openApp(evt, divName) {
  		// Declare all variables
  		var i, tabcontent, tablinks;

  		// Get all elements with class="tabcontent" and hide them
  		tabcontent = document.getElementsByClassName("tabcontent");
  		for (i = 0; i < tabcontent.length; i++) {
    		tabcontent[i].style.display = "none";
  		}

  		// Get all elements with class="tablinks" and remove the class "active"
  		tablinks = document.getElementsByClassName("tablinks");
  			for (i = 0; i < tablinks.length; i++) {
    			tablinks[i].className = tablinks[i].className.replace(" active", "");
  			}

  			// Show the current tab, and add an "active" class to the button that opened the tab
  			document.getElementById(divName).style.display = "inline-block";
  			evt.className += " active";
}

function drawCharts() {
    drawChart1();
    drawChart2();
    drawChart3();
    drawChart4();
}

function drawChart1() {
    var pop_diff = Number(document.getElementById("popdiff").value);
    var n = 10;
    var uppr = 140 + pop_diff;
    var data_object = twoDists(pop_diff, n);
    var group_means = calcGroupMeans(data_object);
    var diff = group_means.control - group_means.fert;
    document.getElementById("difference").innerHTML = "Difference between means: " + diff.toFixed(2);

    var points = {
        x: data_object.group,
        y: data_object.yield,
        type: "scatter",
        mode: "markers"
    }
        
    var means = {
        x: ["Control","Fertilized"],
        y: [group_means.control, group_means.fert],
        type: "scatter",
        mode: "markers",
        marker: {
            color: 'red',
            symbol: 'cross',
            size: 12
        }
    }
        
    var layout_twogrp = {
        title: {
            text: "Yield of crops"
        },
        showlegend: false,
        xaxis: {
            range: [-1,2]
        },            
        yaxis: {
            range: [60, uppr],
            title: {
                text: "Yield (kg)"
            }
        }
    }
        
    var data_twogrp = [points, means];

    Plotly.newPlot("twogroup_experiment_div", data_twogrp, layout_twogrp);

}
      
      
function twoDists(pop_diff, n) {
    var dat = {group: [], yield: []};
    var k = 0;
    var grp = "Control";j
    var mean = 100;
    for (var i = 0; i < 2; i++) {
        for (var j=0; j<n; j++) {
            k = jStat.normal.sample(mean, 10);
            dat.group.push(grp);
            dat.yield.push(k);
        }
    grp = "Fertilized";
    mean = mean + pop_diff;
    }
    return dat;
};
    
    
function calcGroupMeans(data_object) {
    var gsum = {control: 0, fert: 0};
    var gmean = {control: 0, fert: 0};
    var n = data_object.group.length;
    for (var j = 0; j < n; j++){
        if (data_object.group[j] == "Control") {
                gsum.control = gsum.control + data_object.yield[j];
            } else {
                gsum.fert = gsum.fert + data_object.yield[j];
            }
        }
            
        gmean.control = gsum.control/(n/2);
        gmean.fert = gsum.fert/(n/2);
        return gmean;
};

function drawChart2() {
    var n = Number(document.getElementById("sample_size").value);
    var tdist = maketDist(n);
    var data_object = twoDists(0, n);
    var group_means = calcGroupMeans(data_object);
    var diff = group_means.control - group_means.fert;
    countDiffs(diff);

    var points = {
        x: data_object.group,
        y: data_object.yield,
        type: "scatter",
        mode: "markers"
    }
        
    var means = {
        x: ["Control","Fertilized"],
        y: [group_means.control, group_means.fert],
        type: "scatter",
        mode: "markers",
        marker: {
            color: 'red',
            symbol: 'cross',
            size: 12
        }
    }
        
    var layout_twogrp = {
        title: {
            text: "Yield of crops<br>(diff. btwn. means = " + diff.toFixed(2) + ")" 
        },
        showlegend: false,
        xaxis: {
            range: [-1,2]
        },            
        yaxis: {
            range: [60, 140],
            title: {
                text: "Yield (kg)"
            }
        }
    }
        
    var data_twogrp = [points, means];

    Plotly.newPlot("one_repeat", data_twogrp, layout_twogrp);
    
    var diff_points = {
        x: diffs.x_rnd,
        y: diffs.y,
        type: "scatter",
        mode: "markers",
        showlegend: false
    }
    
    var tdist_graph = {
        x: tdist.x_scaled,
        y: tdist.y,
        type: "lines",
        yaxis: 'y2',
        name: "T distribution",
        visible: "legendonly"
    }
    
    var diff_layout = {
        title: {
            text: "Distribution of differences between means<br>mean = " + jStat.mean(diffs.x).toFixed(2) + ", s = " + jStat.stdev(diffs.x,true).toFixed(2) + ", runs = " + num_iter
        },
        xaxis: {
            title: {
                text: "Difference"
            },
            range: [-15,15]
            
        },
        yaxis: {
            title: {
                text: "Count"
            },
            rangemode: "tozero",
        },    
        yaxis2: {
            title: {
                text: "Probability density"
            },
            overlaying: 'y',
            anchor: 'x',
            side: 'right',
            rangemode: "tozero"
        },
        legend: {
            x: 0,
            xanchor: 'left',
            y: 1.1
        }
    }
    
    var data_diffs = [diff_points, tdist_graph];
    
    Plotly.newPlot("many_repeats", data_diffs, diff_layout);
    
    var popdist_data = {
        x: popdist.x,
        y: popdist.y,
        type: "scatter",
        mode: "lines"
    }
    
    var popdist_layout = {
        title: {
            text: "Population distribution for yield<br>mean = 100 kg, s = 10 kg"
        },
        xaxis: {
            title: {
                text: "Yield (kg)"
            }
        },
        yaxis: {
            title: {
                text: "Relative frequency"
            }
        }
    }
    
    var popdist_data_ar = [popdist_data];
    
    Plotly.newPlot("popdist", popdist_data_ar, popdist_layout);


}

function countDiffs(diff) {
    var diff_rnd = Math.round(diff);
    var x_ind = diffs_count.x.indexOf(diff_rnd);
    diffs_count.y[x_ind] = diffs_count.y[x_ind] + 1;
    diffs.x.push(diff);
    diffs.x_rnd.push(diff_rnd);
    diffs.y.push(diffs_count.y[x_ind]);
    num_iter = num_iter + 1;
}

function run1k() {
    var n = Number(document.getElementById("sample_size").value);
    for (i = 0; i < 1000; i++) {
        var data_object = twoDists(0, n);
        var group_means = calcGroupMeans(data_object);
        var diff = group_means.control - group_means.fert;
        countDiffs(diff);
    }
    drawChart2();
}

function maketDist(n) {
    var tdist = {x: [], y: [], x_scaled: []};
    for (i = 0; i < 101; i++) {
        tdist.x.push(-3 + 6*i/100);
        tdist.y.push(jStat.studentt.pdf(tdist.x[i], 2*n-2));
        tdist.x_scaled.push(tdist.x[i] * Math.sqrt(200/n));
    }
    return tdist;
}

function reset() {
    num_iter = 0;
    diffs = {x: [], y: [], x_rnd: []};
    diffs_count = {x: [], y: []};
    for (i = 0; i<101; i++) {
        diffs_count.x.push(-50 + i);
        diffs_count.y.push(0);
    }
    drawChart2();
}

function drawChart3() {
        var n = Number(document.getElementById("n_tdist").value);
        var data_obj = curves(n);
        
        var t_fill = {
            x: data_obj.x,
            y: data_obj.t_fill,
            fill: 'tozeroy',
            fillopacity: 0.7,
            type: 'scatter',
            line: {
                color: "red"
            }
        };
        
        var t_curve = {
            x: data_obj.x,
            y: data_obj.t_curve,
            type: 'scatter',
            line: {
                color: "red"
            }
        };
        
        var z_fill = {
            x: data_obj.x,
            y: data_obj.z_fill,
            fill: 'tozeroy',
            fillopacity: 0.7,
            type: 'scatter',
            line: {
                color: "blue"
            }
        };
        
        var z_curve = {
            x: data_obj.x,
            y: data_obj.z_curve,
            type: 'scatter',
            line: {
                color: "blue"
            }
        };        
        
        var tdata = [z_fill, z_curve, t_fill, t_curve];
        
        var tlayout = {
            title: {
                text: "Student's t-distributions at various degrees of freedom"
            },
            xaxis: {
                title: {
                    text: "t-value"
                }
            },
            yaxis: {
                title: {
                    text: "Probability density"
                }
            },
            showlegend: false,
            hovermode: false
        };

        Plotly.newPlot("tchart_div", tdata, tlayout);

}
      
      
function curves(ss) {
       var dat = {x: [], z_curve: [], z_fill: [], t_curve: [], t_fill: []};
       var t_crit = jStat.studentt.inv(0.975, ss-1);
       var j = -6;
       var k = 0;
       var l = 0;
       var m = 0;
       var n = 0;
       for(var i=0; i<501; i++) {
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
            dat.x.push(j);
            dat.z_curve.push(k);
            dat.z_fill.push(l);
            dat.t_curve.push(m);
            dat.t_fill.push(n);
            j = j + 12/500;

       }
       document.getElementById("critval").innerHTML = "Critical t-value: " + t_crit.toFixed(3);


       return dat;
    };


function drawChart4() {
    var diff = Number(document.getElementById("diff_means").value);
    var alpha = Number(document.getElementById("alpha").value);
    var n = Number(document.getElementById("n_t_comp").value);
    var df = 2*n-2;
    var se = Math.sqrt(100*2/n);
    var t_crit = jStat.studentt.inv(1-alpha/2, 2*n-2);
    var xvals = makeXvals();
    var null_curve = makeNullCurve(df, xvals, se);
    var null_tails = makeNullTails(df, xvals, t_crit, se);
    var typeII = makeType2Curve(df, xvals, t_crit, diff, se);
    var power = makePowerCurve(df, xvals, t_crit, diff, se);
    
    var amt_diff = document.getElementById("amt_diff");
    var null_tf = document.getElementById("null_tf");
    
    if (diff == 0) {
        amt_diff.innerHTML = 0;
        null_tf.innerHTML = "true";
    } else {
        amt_diff.innerHTML = "more than 0";
        null_tf.innerHTML = "false";        
    }
    
    var nullcurve_t = {
        x: xvals.t,
        y: null_curve.t,
        type: 'scatter',
        line: {
            color: "black"
        },
        showlegend: false
        
    }
    
    var null_lower_fill_t = {
        x: null_tails.lower.tval,
        y: null_tails.lower.t_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,0,0,0.5)',
        fillopacity: 0.1,
        type: 'scatter',
        mode: 'none',
        showlegend: false
        
    }

    var null_upper_fill_t = {
        x: null_tails.upper.tval,
        y: null_tails.upper.t_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,0,0,0.5)',
        fillopacity: 0.1,
        type: 'scatter',
        mode: 'none',
        showlegend: false
        
    }
    
    var typeII_fill_t = {
        x: typeII.t.tval,
        y: typeII.t.t_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,255,0,0.5)',
        type: 'scatter',
        line: {
            color: 'black'
        },
        showlegend: false
    }
    
    var power_fill_t = {
        x: power.t.tval,
        y: power.t.t_p,
        fill: 'tozeroy',
        fillcolor: 'rgb(180,180,255)',
        fillopacity: 0.5,
        type: 'scatter',
        line: {
            color: 'black'
        },
        showlegend: false
    }
    
    var layout_t = {
        title: {
            text: "Null and alternative sampling distributions"
        },
        xaxis: {
            title: {
                text: "t-value"
            },
            range: [-4,12]
        },
        yaxis: {
            title: {
                text: "Probability density"
            }
        }
    }
        
    var data_t = [typeII_fill_t, power_fill_t, null_lower_fill_t, null_upper_fill_t, nullcurve_t];
        



    var nullcurve_yield = {
        x: xvals.yield,
        y: null_curve.yield,
        type: 'scatter',
        line: {
            color: "black"
        },
        showlegend: false
        
    }
    
    var null_lower_fill_yield = {
        x: null_tails.lower.yield,
        y: null_tails.lower.yield_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,0,0,0.5)',
        fillopacity: 0.1,
        type: 'scatter',
        mode: 'none',
        showlegend: false
        
    }

    var null_upper_fill_yield = {
        x: null_tails.upper.yield,
        y: null_tails.upper.yield_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,0,0,0.5)',
        fillopacity: 0.1,
        type: 'scatter',
        mode: 'none',
        showlegend: false
        
    }
    
    var typeII_fill_yield = {
        x: typeII.yield.yield,
        y: typeII.yield.yield_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,255,0,0.5)',
        type: 'scatter',
        line: {
            color: 'black'
        },
        showlegend: false
    }
    
    var power_fill_yield = {
        x: power.yield.yield,
        y: power.yield.yield_p,
        fill: 'tozeroy',
        fillcolor: 'rgb(180,180,255)',
        fillopacity: 0.5,
        type: 'scatter',
        line: {
            color: 'black'
        },
        showlegend: false
    }
    
    var layout_yield = {
        title: {
            text: "Null and alternative sampling distributions"
        },
        xaxis: {
            title: {
                text: "Difference in yield"
            },
            range: [-20,60]
        },
        yaxis: {
            title: {
                text: "Probability density"
            }
        }
    }
        
    var data_yield = [typeII_fill_yield, power_fill_yield, null_lower_fill_yield, null_upper_fill_yield, nullcurve_yield];





    if (current == 0) {
        Plotly.newPlot("ep_chart_div", data_t, layout_t);
    } else {
        Plotly.newPlot("ep_chart_div", data_yield, layout_yield);
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
      

function resetToObs() {
    document.getElementById("alpha").value = 0.05;
    document.getElementById("diff_means").value = 0;
    document.getElementById("n_t_comp").value = 10;
    drawChart4();
}

function switchChart() {
    current = 1-current;
    if(current == 0){
        document.getElementById("ct").innerHTML = "Yield";
    } else {
        document.getElementById("ct").innerHTML = "t";
    }
    drawChart4();
}

function makeXvals() {
    var yield = -17.89;
    var tval = -4;
    var xvals = {t: [], yield: []};
    for (i = 0; i<201; i++) {
        xvals.t.push(tval);
        xvals.yield.push(yield);
        tval = tval + 16/200;
        yield = yield + 71.55/200;
    }
    
    return(xvals);
}

function makeNullCurve(df, xvals, se) {
    var nulldist = {t: [], yield: []};
    var tp, dp;
    for (i = 0; i < xvals.t.length; i++) {
        tp = jStat.studentt.pdf(xvals.t[i],df);
        yieldp = jStat.studentt.pdf(xvals.yield[i]/se,df);
        nulldist.t.push(tp);
        nulldist.yield.push(yieldp);
    }
    
    return(nulldist);
}

function makeNullTails(df, xvals, t_crit, se) {
    var nulltails = {lower: {tval: [], t_p: [], yield: [], yield_p: []}, upper: {tval: [], t_p: [], yield: [], yield_p: []}};
    var tp, dp = 0;
    var yield_crit = se*t_crit;
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] < -t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i],df);
            nulltails.lower.tval.push(xvals.t[i]);
            nulltails.lower.t_p.push(tp);
        }
        if (xvals.yield[i] < -yield_crit) {
            dp = jStat.studentt.pdf(xvals.yield[i]/se,df);
            nulltails.lower.yield.push(xvals.yield[i]);
            nulltails.lower.yield_p.push(dp);            
        }
    }
    
    nulltails.lower.tval.push(-t_crit);
    var p_at_crit = jStat.studentt.pdf(-t_crit, df);
    nulltails.lower.yield.push(-yield_crit);
    nulltails.lower.t_p.push(p_at_crit);
    nulltails.lower.yield_p.push(p_at_crit);
    
    nulltails.upper.tval.push(t_crit);
    var p_at_crit = jStat.studentt.pdf(t_crit, df);
    nulltails.upper.yield.push(yield_crit);
    nulltails.upper.t_p.push(p_at_crit);
    nulltails.upper.yield_p.push(p_at_crit);
    
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] > t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i],df);
            nulltails.upper.tval.push(xvals.t[i]);
            nulltails.upper.t_p.push(tp);
        }
        if (xvals.yield[i] > yield_crit) {
            dp = jStat.studentt.pdf(xvals.yield[i]/se,df);
            nulltails.upper.yield.push(xvals.yield[i]);
            nulltails.upper.yield_p.push(dp);            
        }
    }
    
    return(nulltails);
}

function makeType2Curve(df, xvals, t_crit, diff, se) {
    var typeII = {t: {tval: [], t_p: []}, yield: {yield: [], yield_p: []}};
    var tp, dp = 0;
    var diff_t = diff/se;
    var yield_crit = se*t_crit;
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] < t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i]-diff_t,df);
            typeII.t.tval.push(xvals.t[i]);
            typeII.t.t_p.push(tp);

        }
        if (xvals.yield[i] < yield_crit) {
            dp = jStat.studentt.pdf((xvals.yield[i]/se)-diff_t,df);
            typeII.yield.yield.push(xvals.yield[i]);
            typeII.yield.yield_p.push(dp);
        }
    }
    typeII.t.tval.push(t_crit);
    var p_at_crit = jStat.studentt.pdf(t_crit-diff_t, df);
    typeII.t.t_p.push(p_at_crit);
    typeII.yield.yield.push(se*(t_crit));
    typeII.yield.yield_p.push(p_at_crit);
    
    return(typeII);    

}

function makePowerCurve(df, xvals, t_crit, diff, se) {
    var power = {t: {tval: [], t_p: []}, yield: {yield: [], yield_p: []}};
    var tp, dp = 0;
    var diff_t = diff/se;
    var yield_crit = se*t_crit;
    power.t.tval.push(t_crit);
    var p_at_crit = jStat.studentt.pdf(t_crit-diff_t, df);
    power.t.t_p.push(p_at_crit);
    power.yield.yield.push(yield_crit);
    power.yield.yield_p.push(p_at_crit);
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] >= t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i]-diff_t,df);
            power.t.tval.push(xvals.t[i]);
            power.t.t_p.push(tp);
        }
        if (xvals.yield[i] >= se*t_crit) {
            dp = jStat.studentt.pdf((xvals.yield[i]/se)-diff_t,df);
            power.yield.yield.push(xvals.yield[i]);
            power.yield.yield_p.push(dp);
        }
    }
    

    
    return(power);    

}
