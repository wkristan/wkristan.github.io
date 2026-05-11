

var popdist = {x: [], y: []};
var temps = {x: [], y: [], x_rnd: []};
var temps_count = {x: [], y: []};
var num_iter = 0;
var current = 0;

for (i = 0; i < 100; i++) {
    var x_i = 35 + 4*i/100;
    popdist.x.push(x_i);
    popdist.y.push(jStat.normal.pdf(popdist.x[i], 37, 0.7));
}

for (i = 0; i<101; i++) {
    temps_count.x.push(35 + 4*i/100);
    temps_count.y.push(0);
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
    var popmean = Number(document.getElementById("popmean").value);
    var data = randData(popmean, 20);
    var mean = meanDat(data);
    var limits = [popmean - 2, popmean + 2];

    var trace = {
        x: data.x,
        y: data.y,
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'red',
            size: 10
        }
    }

    var layout = {
        title: {
            text: "Sample mean = " + mean.toFixed(2)
        },
        margin: {
            b: 10
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            range: [0.9,1.1],
            showticklabels: false
        },
        yaxis: {
            range: limits,
            title: 'Body temperature'

        }
    }

    Plotly.newPlot('onesample_experiment_div', [trace], layout);

}

function randData(popmean, n){
       var dat = {x: [], y: []};
       var j = 0;
       for(var i=0; i<n; i++){
            j = jStat.normal.sample(popmean, 0.7);
            dat.x.push(1);
            dat.y.push(j);
       }
       return dat;
    }

function meanDat(dat) {
    var tot = 0;
    var n = dat.x.length;
    for(var i = 0;i<n;i++){
        tot = tot + dat.y[i];
    }
    var mean = tot/n;
    return mean;
}


function drawChart2() {
    var n = Number(document.getElementById("sample_size").value);
    var popmean = Number(document.getElementById("popmean").value);
    var tdist = maketDist(n, popmean);
    var data_object = randData(popmean, n);
    var sample_mean = meanDat(data_object);
    countMeans(sample_mean);

    var points = {
        x: data_object.x,
        y: data_object.y,
        type: "scatter",
        mode: "markers"
    }
        
    var means = {
        x: [1],
        y: [sample_mean],
        type: "scatter",
        mode: "markers",
        marker: {
            color: 'red',
            symbol: 'cross',
            size: 12
        }
    }
        
    var layout_onesample = {
        title: {
            text: "Sample mean = " + sample_mean.toFixed(2)
        },
        showlegend: false,
        xaxis: {
            range: [0.5,1.5]
        },            
        yaxis: {
            range: [popmean - 2, popmean + 2],
            title: {
                text: "Temperature (℃)"
            }
        }
    }
        
    var data_onesample = [points, means];

    Plotly.newPlot("one_repeat", data_onesample, layout_onesample);
    
    var means_points = {
        x: temps.x_rnd,
        y: temps.y,
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
    
    var means_layout = {
        title: {
            text: "Distribution of sample means,<br> runs = " + num_iter
        },
        xaxis: {
            title: {
                text: "Mean temperature"
            },
            range: [popmean - 1, popmean + 1]
            
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
    
    var data_means = [means_points, tdist_graph];
    
    Plotly.newPlot("many_repeats", data_means, means_layout);
    
    var popdist_data = {
        x: popdist.x,
        y: popdist.y,
        type: "scatter",
        mode: "lines"
    }
    
    var popdist_layout = {
        title: {
            text: "Population distribution for mean = 37℃"
        },
        xaxis: {
            title: {
                text: "Temperature"
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

function countMeans(sample_mean) {
    var mean_rnd = Math.round(sample_mean*50)/50;
    var x_ind = temps_count.x.indexOf(mean_rnd);
    temps_count.y[x_ind] = temps_count.y[x_ind] + 1;
    temps.x.push(sample_mean);
    temps.x_rnd.push(mean_rnd);
    temps.y.push(temps_count.y[x_ind]);
    num_iter = num_iter + 1;
}

function run1k() {
    var n = Number(document.getElementById("sample_size").value);
    var popmean = Number(document.getElementById("popmean").value);
    for (i = 0; i < 1000; i++) {
        var data_object = randData(popmean, n);
        var sample_mean = meanDat(data_object);
        countMeans(sample_mean);
    }
    drawChart2();
}

function maketDist(n, popmean) {
    var tdist = {x: [], y: [], x_scaled: []};
    for (i = 0; i < 101; i++) {
        tdist.x.push(-3 + 6*i/100);
        tdist.y.push(jStat.studentt.pdf(tdist.x[i], n-1));
        tdist.x_scaled.push(popmean + tdist.x[i] * Math.sqrt(0.49/n));
    }
    return tdist;
}

function reset() {
    num_iter = 0;
    temps = {x: [], y: [], x_rnd: []};
    temps_count = {x: [], y: []};
    for (i = 0; i<101; i++) {
        temps_count.x.push(35 + 4*i/100);
        temps_count.y.push(0);
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
    var df = n-1;
    var se = Math.sqrt(0.49/n);
    var t_crit = jStat.studentt.inv(1-alpha/2, n-1);
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
        



    var nullcurve_temp = {
        x: xvals.temp,
        y: null_curve.temp,
        type: 'scatter',
        line: {
            color: "black"
        },
        showlegend: false
        
    }
    
    var null_lower_fill_temp = {
        x: null_tails.lower.temp,
        y: null_tails.lower.temp_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,0,0,0.5)',
        fillopacity: 0.1,
        type: 'scatter',
        mode: 'none',
        showlegend: false
        
    }

    var null_upper_fill_temp = {
        x: null_tails.upper.temp,
        y: null_tails.upper.temp_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,0,0,0.5)',
        fillopacity: 0.1,
        type: 'scatter',
        mode: 'none',
        showlegend: false
        
    }
    
    var typeII_fill_temp = {
        x: typeII.temp.temp,
        y: typeII.temp.temp_p,
        fill: 'tozeroy',
        fillcolor: 'rgba(255,255,0,0.5)',
        type: 'scatter',
        line: {
            color: 'black'
        },
        showlegend: false
    }
    
    var power_fill_temp = {
        x: power.temp.temp,
        y: power.temp.temp_p,
        fill: 'tozeroy',
        fillcolor: 'rgb(180,180,255)',
        fillopacity: 0.5,
        type: 'scatter',
        line: {
            color: 'black'
        },
        showlegend: false
    }
    
    var layout_temp = {
        title: {
            text: "Null and alternative sampling distributions"
        },
        xaxis: {
            title: {
                text: "Temperature"
            },
            range: [36,40]
        },
        yaxis: {
            title: {
                text: "Probability density"
            }
        }
    }
        
    var data_temp = [typeII_fill_temp, power_fill_temp, null_lower_fill_temp, null_upper_fill_temp, nullcurve_temp];


    if (current == 0) {
        Plotly.newPlot("ep_chart_div", data_t, layout_t);
    } else {
        Plotly.newPlot("ep_chart_div", data_temp, layout_temp);
    }
        
    var power = 1-jStat.studentt.cdf(t_crit-diff/se, n-1);
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
        document.getElementById("ct").innerHTML = "Temperature";
    } else {
        document.getElementById("ct").innerHTML = "t";
    }
    drawChart4();
}

function makeXvals() {
    var temp = 36;
    var tval = -4;
    var xvals = {t: [], temp: []};
    for (i = 0; i<201; i++) {
        xvals.t.push(tval);
        xvals.temp.push(temp);
        tval = tval + 16/200;
        temp = temp + 4/200;
    }
    
    return(xvals);
}

function makeNullCurve(df, xvals, se) {
    var nulldist = {t: [], temp: []};
    var tp, dp;
    for (i = 0; i < xvals.t.length; i++) {
        tp = jStat.studentt.pdf(xvals.t[i],df);
        tempp = jStat.studentt.pdf((xvals.temp[i]-37)/se,df);
        nulldist.t.push(tp);
        nulldist.temp.push(tempp);
    }
    
    return(nulldist);
}

function makeNullTails(df, xvals, t_crit, se) {
    var nulltails = {lower: {tval: [], t_p: [], temp: [], temp_p: []}, upper: {tval: [], t_p: [], temp: [], temp_p: []}};
    var tp, dp = 0;
    var temp_ucrit = 37 + se*t_crit;
    var temp_lcrit = 37 - se*t_crit;
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] < -t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i],df);
            nulltails.lower.tval.push(xvals.t[i]);
            nulltails.lower.t_p.push(tp);
        }
        if (xvals.temp[i] < temp_lcrit) {
            dp = jStat.studentt.pdf((xvals.temp[i]-37)/se,df);
            nulltails.lower.temp.push(xvals.temp[i]);
            nulltails.lower.temp_p.push(dp);
        }
    }
    
    nulltails.lower.tval.push(-t_crit);
    var p_at_crit = jStat.studentt.pdf(-t_crit, df);
    nulltails.lower.temp.push(temp_lcrit);
    nulltails.lower.t_p.push(p_at_crit);
    nulltails.lower.temp_p.push(p_at_crit);
    
    nulltails.upper.tval.push(t_crit);
    var p_at_crit = jStat.studentt.pdf(t_crit, df);
    nulltails.upper.temp.push(temp_ucrit);
    nulltails.upper.t_p.push(p_at_crit);
    nulltails.upper.temp_p.push(p_at_crit);
    
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] > t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i],df);
            nulltails.upper.tval.push(xvals.t[i]);
            nulltails.upper.t_p.push(tp);
        }
        if (xvals.temp[i] > temp_ucrit) {
            dp = jStat.studentt.pdf((xvals.temp[i]-37)/se,df);
            nulltails.upper.temp.push(xvals.temp[i]);
            nulltails.upper.temp_p.push(dp);
        }
    }
    
    return(nulltails);
}

function makeType2Curve(df, xvals, t_crit, diff, se) {
    var typeII = {t: {tval: [], t_p: []}, temp: {temp: [], temp_p: []}};
    var tp, dp = 0;
    var diff_t = diff/se;
    var temp_ucrit = 37 + se*t_crit;
    var temp_lcrit = 37 - se*t_crit;
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] < t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i]-diff_t,df);
            typeII.t.tval.push(xvals.t[i]);
            typeII.t.t_p.push(tp);

        }
        if (xvals.temp[i] < temp_ucrit) {
            dp = jStat.studentt.pdf(((xvals.temp[i]-37)/se)-diff_t,df);
            typeII.temp.temp.push(xvals.temp[i]);
            typeII.temp.temp_p.push(dp);
        }
    }
    typeII.t.tval.push(t_crit);
    var p_at_crit = jStat.studentt.pdf(t_crit-diff_t, df);
    typeII.t.t_p.push(p_at_crit);
    typeII.temp.temp.push(temp_ucrit);
    typeII.temp.temp_p.push(p_at_crit);
    
    return(typeII);    

}

function makePowerCurve(df, xvals, t_crit, diff, se) {
    var power = {t: {tval: [], t_p: []}, temp: {temp: [], temp_p: []}};
    var tp, dp = 0;
    var diff_t = diff/se;
    var temp_ucrit = 37+se*t_crit;
    power.t.tval.push(t_crit);
    var p_at_crit = jStat.studentt.pdf(t_crit-diff_t, df);
    power.t.t_p.push(p_at_crit);
    power.temp.temp.push(temp_ucrit);
    power.temp.temp_p.push(p_at_crit);
    for (i = 0; i < xvals.t.length; i++) {
        if (xvals.t[i] >= t_crit) {
            tp = jStat.studentt.pdf(xvals.t[i]-diff_t,df);
            power.t.tval.push(xvals.t[i]);
            power.t.t_p.push(tp);
        }
        if (xvals.temp[i] >= temp_ucrit) {
            dp = jStat.studentt.pdf(((xvals.temp[i]-37)/se)-diff_t,df);
            power.temp.temp.push(xvals.temp[i]);
            power.temp.temp_p.push(dp);
        }
    }
    

    
    return(power);    

}
