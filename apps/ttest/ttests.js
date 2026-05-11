function drawCharts() {
    drawOneSample();
    drawTwoSample();
    drawPaired();
}


function drawOneSample() {
    var alt_mean = Number(document.getElementById("alt_mean_onesample").value);
    var alpha = Number(document.getElementById("alpha_onesample").value);
    var sd = Number(document.getElementById("sd_onesample").value);
    var null_diff = 0;
    if (document.getElementById("alt_true").checked) {
        null_diff = alt_mean - 37;
    };
    var null_curve = getNormCurve(37, sd);
    var alt_curve = getNormCurve(alt_mean, sd);
    var ss = Number(document.getElementById("n_onesample").value);
    var data = randData(37, sd, null_diff, ss, 0);
    var mean = jStat.mean(data.x);
    var sd = jStat.stdev(data.x);
    var stderror = sd/Math.sqrt(ss);
    var t_obs = (mean - 37)/stderror;
    var alt = document.getElementById("alt").value;
    var t_distribution = tDist(ss-1, t_obs);
    var tdist_shaded = pShaded(ss-1, t_obs, alt);
    var tdist_crit = critShaded(ss-1, alt, alpha);
    var pval = pValue(t_obs, ss - 1, alt);

    
    var null_trace = {
        x: null_curve.x,
        y: null_curve.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false
    }
    
    var alt_trace = {
        x: alt_curve.x,
        y: alt_curve.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false
    }
    
    var tdist_trace = {
        x: t_distribution.t,
        y: t_distribution.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false
    }
    
    var tdist_lowertail_trace = {
            x: tdist_shaded.lower_p.t,
            y: tdist_shaded.lower_p.density,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgb(0,255,0)',
            showlegend: false
    }
    
    var tdist_uppertail_trace = {
            x: tdist_shaded.upper_p.t,
            y: tdist_shaded.upper_p.density,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgb(0,255,0)',
            showlegend: false
    }

    var tdist_lower_crit_trace = {
        x: tdist_crit.lower_crit.t,
        y: tdist_crit.lower_crit.density,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'none',
        fillcolor: 'rgba(255,0,0,0.5)',
        showlegend: false
    }    
    
    var tdist_upper_crit_trace = {
        x: tdist_crit.upper_crit.t,
        y: tdist_crit.upper_crit.density,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'none',
        fillcolor: 'rgba(255,0,0,0.5)',
        showlegend: false
    }
    
    
    var sample_data = {
        x: data.x,
        y: data.y,
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'black',
            size: 10,
            symbol: '142'
        },
        showlegend: false
    }
    
    var sample_mean = {
        x: [mean],
        y: [0],
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'red',
            size: 12
        },
        showlegend: false
    }
    
    var line_ht_mean = jStat.max(null_curve.density);
    
    var null_layout = {
        autosize: false,
        width: 600,
        height: 400,
        title: 'The population disribution if the null is true<br>x̄ = ' + mean.toFixed(2),
        shapes: [{
            type: 'line',
            x0: 37,
            y0: 0,
            x1: 37,
            y1: line_ht_mean
        }],
        xaxis: {
            title: {
                text: 'Body temperature'
            },
            range: [34,40]
        }
    }
    
    var alt_layout = {
        autosize: false,
        width: 600,
        height: 400,
        title: 'The population distribution if the null is false<br>x̄ = ' + mean.toFixed(2),
        shapes: [{
            type: 'line',
            x0: 37,
            y0: 0,
            x1: 37,
            y1: line_ht_mean
        },
        {
            type: 'line',
            line: {
                color: 'red'
            },
            x0: alt_mean,
            y0:0,
            x1: alt_mean,
            y1: line_ht_mean
        }
            
        ],
        xaxis: {
            title: {
                text: 'Body temperature'
            },
            range: [34,40]
        }
    }
    
    var tdist_layout = {
        annotations: [{
            x: t_obs,
            y: 0,
            xref: 'x',
            yref: 'y',
            text: 't value',
            showarrow: true,
            ax: 0,
            ay: -40
        }],
        autosize: false,
        width: 600,
        height: 400,
        title: 'The t-distribution',
        xaxis: {
            title: {
                text: 't-value'
            },
            range: [-4,4]
        },
        yaxis: {
            title: {
                text: 'Probability density'
            }
        }
    }
    
    Plotly.newPlot('onesample_null', [null_trace, sample_data, sample_mean], null_layout);
    Plotly.newPlot('onesample_alt', [alt_trace, sample_data, sample_mean], alt_layout);
    Plotly.newPlot('tdist_onesample', [tdist_lowertail_trace, tdist_uppertail_trace, tdist_trace, tdist_lower_crit_trace, tdist_upper_crit_trace], tdist_layout);
    
    document.getElementById("onesample_mean").innerHTML = mean.toFixed(2);
    document.getElementById("onesample_sd").innerHTML = sd.toFixed(2);
    document.getElementById("onesample_se").innerHTML = stderror.toFixed(2);
    document.getElementById("onesample_t").innerHTML = t_obs.toFixed(2);
    document.getElementById("onesample_df").innerHTML = ss - 1;
    if (pval < 0.0001) {
        document.getElementById("onesample_p").innerHTML = pval.toExponential(2);
    } else {
        document.getElementById("onesample_p").innerHTML = pval.toFixed(4);
    }
    if (pval < alpha) {
        document.getElementById("onesample_p").style.color = "red";
    } else {
        document.getElementById("onesample_p").style.color = "black";
    }
    
    document.getElementById("obs_mean_onesample").innerHTML = mean.toFixed(2);

}


function drawTwoSample() {
    var alt_mean = Number(document.getElementById("alt_mean_twosample").value);
    var alpha = Number(document.getElementById("alpha_twosample").value);
    var sd = Number(document.getElementById("sd_twosample").value);
    var null_diff = 0;
    var control_mean = 21.3;
    if (document.getElementById("alt_true_ts").checked) {
        null_diff = alt_mean - control_mean;
    };
    var control_curve = getNormCurve(21.3, sd);
    var gaba_curve = getNormCurve(alt_mean, sd);
    var ss = Number(document.getElementById("n_twosample").value);
    var control = randData(21.3, sd, 0, ss, 0);
    var gaba = randData(21.3, sd, null_diff, ss, 0);
    var gaba_mean = jStat.mean(gaba.x);
    var gaba_sd = jStat.stdev(gaba.x);
    var control_mean = jStat.mean(control.x);
    var control_sd = jStat.stdev(control.x);
    var pooled_var = (gaba_sd*gaba_sd + control_sd*control_sd)/2;
    var stderror = Math.sqrt(pooled_var*(2/ss));
    var sample_mean_diff = control_mean - gaba_mean;
    var t_obs = sample_mean_diff/stderror;
    var alt = document.getElementById("alt_ts").value;
    var t_distribution = tDist(2*ss-2, t_obs);
    var tdist_shaded = pShaded(2*ss-2, t_obs, alt);
    var tdist_crit = critShaded(2*ss-2, alt, alpha);
    var pval = pValue(t_obs, 2*ss - 2, alt);

    
    var null_trace = {
        x: control_curve.x,
        y: control_curve.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        line: {
            color: 'black'
        }
    }
    
    var control_trace = {
        x: control_curve.x,
        y: control_curve.density,
        name: 'Control',
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'blue'
        }
    }
    
    var gaba_trace = {
        x: gaba_curve.x,
        y: gaba_curve.density,
        name: 'GABA',
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'red'
        }
    }
    
    var tdist_trace = {
        x: t_distribution.t,
        y: t_distribution.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false
    }
    
    var tdist_lowertail_trace = {
            x: tdist_shaded.lower_p.t,
            y: tdist_shaded.lower_p.density,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgb(0,255,0)',
            showlegend: false
    }
    
    var tdist_uppertail_trace = {
            x: tdist_shaded.upper_p.t,
            y: tdist_shaded.upper_p.density,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgb(0,255,0)',
            showlegend: false
    }

    var tdist_lower_crit_trace = {
        x: tdist_crit.lower_crit.t,
        y: tdist_crit.lower_crit.density,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'none',
        fillcolor: 'rgba(255,0,0,0.5)',
        showlegend: false
    }    
    
    var tdist_upper_crit_trace = {
        x: tdist_crit.upper_crit.t,
        y: tdist_crit.upper_crit.density,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'none',
        fillcolor: 'rgba(255,0,0,0.5)',
        showlegend: false
    }
    
    
    var control_data = {
        x: control.x,
        y: control.y,
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'blue',
            size: 8,
            symbol: '142'
        },
        showlegend: false
    }
    
    var gaba_data = {
        x: gaba.x,
        y: gaba.y,
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'red',
            size: 8,
            symbol: '142'
        },
        showlegend: false
    }
    
    var sample_means = {
        x: [control_mean, gaba_mean],
        y: [0, 0],
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: ['blue', 'red'],
            size: 14
        },
        showlegend: false
    }
    
    var line_ht_mean = jStat.max(control_curve.density);
    
    var null_layout = {
        autosize: false,
        width: 600,
        height: 400,
        title: 'The population disribution if the null is true<br><span style="color: #0000FF">x̄<sub>control</sub></span> = ' + control_mean.toFixed(2) + ', <span style="color: #FF0000">x̄<sub>GABA</sub></span> = ' + gaba_mean.toFixed(2),
        shapes: [{
            type: 'line',
            x0: 21.3,
            y0: 0,
            x1: 21.3,
            y1: line_ht_mean
        }],
        xaxis: {
            title: {
                text: 'Heart rate'
            },
            range: [0,40]
        }
    }
    
    var alt_layout = {
        autosize: false,
        width: 600,
        height: 400,
        title: 'The population disribution if the null is true<br><span style="color: #0000FF">x̄<sub>control</sub></span> = ' + control_mean.toFixed(2) + ', <span style="color: #FF0000">x̄<sub>GABA</sub></span> = ' + gaba_mean.toFixed(2),
        shapes: [{
            type: 'line',
            x0: 21.3,
            y0: 0,
            x1: 21.3,
            y1: line_ht_mean
        },
        {
            type: 'line',
            line: {
                color: 'red'
            },
            x0: alt_mean,
            y0:0,
            x1: alt_mean,
            y1: line_ht_mean
        }
            
        ],
        xaxis: {
            title: {
                text: 'Heart rate'
            },
            range: [0,40]
        }
    }
    
    var tdist_layout = {
        autosize: false,
        width: 600,
        height: 400,
        title: 'The t-distribution',
        xaxis: {
            title: {
                text: 't-value'
            },
            range: [-4,4]
        },
        yaxis: {
            title: {
                text: 'Probability density'
            }
        },
        annotations: [{
            x: t_obs,
            y: 0,
            xref: 'x',
            yref: 'y',
            text: 't value',
            showarrow: true,
            ax: 0,
            ay: -40
        }]
    }
    
    Plotly.newPlot('twosample_null', [null_trace, control_data, gaba_data, sample_means], null_layout);
    Plotly.newPlot('twosample_alt', [control_trace, gaba_trace, control_data, gaba_data, sample_means], alt_layout);
    Plotly.newPlot('tdist_twosample', [tdist_lowertail_trace, tdist_uppertail_trace, tdist_trace, tdist_lower_crit_trace, tdist_upper_crit_trace], tdist_layout);
    
    document.getElementById("gaba_mean").innerHTML = gaba_mean.toFixed(2);
    document.getElementById("control_mean").innerHTML = control_mean.toFixed(2);
    document.getElementById("gaba_sd").innerHTML = gaba_sd.toFixed(2);
    document.getElementById("control_sd").innerHTML = control_sd.toFixed(2);
    document.getElementById("pooled_se").innerHTML = stderror.toFixed(2);
    document.getElementById("twosample_t").innerHTML = t_obs.toFixed(2);
    document.getElementById("twosample_df").innerHTML = 2*ss - 2;
    if (pval < 0.0001) {
        document.getElementById("twosample_p").innerHTML = pval.toExponential(2);
    } else {
        document.getElementById("twosample_p").innerHTML = pval.toFixed(4);
    }
    if (pval < alpha) {
        document.getElementById("twosample_p").style.color = "red";
    } else {
        document.getElementById("twosample_p").style.color = "black";
    }
    
    document.getElementById("obs_mean_twosample").innerHTML = sample_mean_diff.toFixed(2);

}

function drawPaired() {
    var alt_mean = Number(document.getElementById("alt_mean_paired").value);
    var alpha = Number(document.getElementById("alpha_paired").value);
    var sd = Number(document.getElementById("sd_paired").value);
    var null_diff = 0;
    if (document.getElementById("alt_true_paired").checked) {
        null_diff = alt_mean;
    };
    var null_curve = getNormCurve(0, sd);
    var alt_curve = getNormCurve(alt_mean, sd);
    var ss = Number(document.getElementById("n_paired").value);
    var data = pairedData(13.6, 2.36, null_diff, ss, sd);
    var mean = jStat.mean(data.diffs);
    var sd = jStat.stdev(data.diffs);
    var stderror = sd/Math.sqrt(ss);
    var t_obs = mean/stderror;
    var alt = document.getElementById("alt_paired").value;
    var t_distribution = tDist(ss-1, t_obs);
    var tdist_shaded = pShaded(ss-1, t_obs, alt);
    var tdist_crit = critShaded(ss-1, alt, alpha);
    var pval = pValue(t_obs, ss - 1, alt);

    
    var null_trace = {
        x: null_curve.x,
        y: null_curve.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false
    }
    
    var alt_trace = {
        x: alt_curve.x,
        y: alt_curve.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false
    }
    
    var tdist_trace = {
        x: t_distribution.t,
        y: t_distribution.density,
        type: 'scatter',
        mode: 'lines',
        showlegend: false
    }
    
    var tdist_lowertail_trace = {
            x: tdist_shaded.lower_p.t,
            y: tdist_shaded.lower_p.density,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgb(0,255,0)',
            showlegend: false
    }
    
    var tdist_uppertail_trace = {
            x: tdist_shaded.upper_p.t,
            y: tdist_shaded.upper_p.density,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgb(0,255,0)',
            showlegend: false
    }

    var tdist_lower_crit_trace = {
        x: tdist_crit.lower_crit.t,
        y: tdist_crit.lower_crit.density,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'none',
        fillcolor: 'rgba(255,0,0,0.5)',
        showlegend: false
    }    
    
    var tdist_upper_crit_trace = {
        x: tdist_crit.upper_crit.t,
        y: tdist_crit.upper_crit.density,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'none',
        fillcolor: 'rgba(255,0,0,0.5)',
        showlegend: false
    }
    
    
    var sample_data = {
        x: data.diffs,
        y: data.y,
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'black',
            size: 10,
            symbol: 142
        },
        showlegend: false
    }
    
    var sample_mean = {
        x: [mean],
        y: [0],
        type: 'scatter',
        marker: {
            color: 'red',
            size: 12
        },
        showlegend: false,
    }

    var line_ht_mean = jStat.max(null_curve.density);
    
    var null_layout = {
        autosize: false,
        width: 600,
        height: 400,
        title: 'The population disribution of differences if the null is true<br>x̄<sub>differences</sub> = ' + mean.toFixed(2),
        shapes: [
        {
            type: 'line',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: line_ht_mean
        }
            
        ],
        xaxis: {
            title: {
                text: 'Difference between dominant and subordinate bicep'
            },
            range: [-1,1]
        }
    }
    
    var alt_layout = {
        autosize: false,
        width: 600,
        height: 400,
        title: 'The population distribution of differences if the null is false<br>x̄<sub>differences</sub> = ' + mean.toFixed(2),
        shapes: [
        {
            type: 'line',
            line: {
                color: 'red'
            },
            x0: alt_mean,
            y0:0,
            x1: alt_mean,
            y1: line_ht_mean
        }
            
        ],
        xaxis: {
            title: {
                text: 'Differences between dominant and subordinate bicep'
            },
            range: [-1,1]
        }
    }
    
    var tdist_layout = {
        annotations: [{
            x: t_obs,
            y: 0,
            xref: 'x',
            yref: 'y',
            text: 't value',
            showarrow: true,
            ax: 0,
            ay: -40
        }],
        autosize: false,
        width: 600,
        height: 400,
        title: 'The t-distribution',
        xaxis: {
            title: {
                text: 't-value'
            },
            range: [-4,4]
        },
        yaxis: {
            title: {
                text: 'Probability density'
            }
        }
    }
    
    Plotly.newPlot('paired_null', [null_trace, sample_data, sample_mean], null_layout);
    Plotly.newPlot('paired_alt', [alt_trace, sample_data, sample_mean], alt_layout);
    Plotly.newPlot('tdist_paired', [tdist_lowertail_trace, tdist_uppertail_trace, tdist_trace, tdist_lower_crit_trace, tdist_upper_crit_trace], tdist_layout);
    
    document.getElementById("paired_mean").innerHTML = mean.toFixed(2);
    document.getElementById("paired_sd").innerHTML = sd.toFixed(2);
    document.getElementById("paired_se").innerHTML = stderror.toFixed(2);
    document.getElementById("paired_t").innerHTML = t_obs.toFixed(2);
    document.getElementById("paired_df").innerHTML = ss - 1;
    if (pval < 0.0001) {
        document.getElementById("paired_p").innerHTML = pval.toExponential(2);
    } else {
        document.getElementById("paired_p").innerHTML = pval.toFixed(4);
    }
    if (pval < alpha) {
        document.getElementById("paired_p").style.color = "red";
    } else {
        document.getElementById("paired_p").style.color = "black";
    }
    
    drawTable(data);
    document.getElementById("obs_mean_paired").innerHTML = mean.toFixed(2);


}


function pairedData(mean, sd_data, diff, n, sd_diff) {
    var paired_dat = {sample1: [], sample2:[], diffs: [], y: []};
    for (var i = 0; i < n; i++) {
        var j = jStat.normal.sample(mean, sd_data);
        var k = j - diff + jStat.normal.sample(0,sd_diff);
        paired_dat.sample1.push(j);
        paired_dat.sample2.push(k);
        paired_dat.diffs.push(j-k);
        paired_dat.y.push(0);
    }
    
    return paired_dat;
}

function drawTable(data) {
    var table = "<table><tr><th>Individual</th><th>Dominant bicep</th><th>Subordinate bicep</th><th>Difference</th></tr>"
    var rows = [];
    var n = data.diffs.length;
    
    for (var i = 0; i<n; i++) {
        var therow = [i+1, data.sample1[i].toFixed(2), data.sample2[i].toFixed(2), data.diffs[i].toFixed(2)];
        rows.push(therow);
    }
    
    for (var CELL of rows) {
        table += "<tr><td>" + CELL[0] + "</td><td>" + CELL[1] + "</td><td>" + CELL[2] + "</td><td>" + CELL[3] + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("paired_data_table").innerHTML = table;


}


function randData(mean, sd, diff, n, yoffset){
       var dat = {x: [], y: []};
       var j = 0;
       for(var i=0; i<n; i++){
            j = jStat.normal.sample(mean + diff, sd);
            dat.x.push(j);
            dat.y.push(yoffset);
       }
       return dat;
    }
    

function getNormCurve(mean,sd) {
       var normdist = {x: [], density: []};
       var j = mean - 3*sd;
       var k = 0;
       var m = 0;
       for(var i=0; i<501; i++) {
            j = j + 6*sd/500;
            k = jStat.normal.pdf(j,mean,sd);
            normdist.x.push(j);
            normdist.density.push(k);
       }
       
       return normdist;
    };

    
function tDist(df, tobs) {
       var tdist = {t: [], density: []};
       var upper = Math.abs(tobs);
       var lower = -upper;
       var t_crit = jStat.studentt.inv(0.975, df);
       var j = -6;
       var k = 0;
       for(var i=0; i<501; i++) {
            j = j + 12/500;
            k = jStat.studentt.pdf(j,df);
            tdist.t.push(j);
            tdist.density.push(k);
       }       
       return tdist;
};

function pShaded(df, t_obs, alt) {
    var lower = {t: [], density: []};
    var upper = {t: [], density: []};
    var j = -6;
    var k = 0;
    var l = Math.abs(t_obs);
    if (alt == "not_equal") {
        for (var i = 0; i < 201; i++) {
            j = j + (6-Math.abs(t_obs))/200;
            k = jStat.studentt.pdf(j,df);
            lower.t.push(j);
            lower.density.push(k);
        };
        for (var i = 0; i < 201; i++) {
            l = l + (6-Math.abs(t_obs))/200;
            k = jStat.studentt.pdf(l, df);
            upper.t.push(l);
            upper.density.push(k);
        }
    }
    if (alt == "less_than") {
        for (var i = 0; i < 201; i++) {
            j = j + (6+t_obs)/200;
            k = jStat.studentt.pdf(j,df);
            lower.t.push(j);
            lower.density.push(k);
        };
    }
    if (alt == "greater_than") {
        l = t_obs;
        for (var i = 0; i < 201; i++) {
            l = l + (6-t_obs)/200;
            k = jStat.studentt.pdf(l, df);
            upper.t.push(l);
            upper.density.push(k);
        }
    }
    
    var output = {lower_p: lower, upper_p: upper};
    return output;

}

function critShaded(df, alt, alpha) {
    var lower_crit = {t: [], density: []};
    var upper_crit = {t: [], density: []};
    var j = -6;
    var k = 0;
    if (alt == "not_equal") {
       var t_crit = jStat.studentt.inv(1-alpha/2, df);
       for (var i = 0; i < 101; i++) {
           j = j+(6-t_crit)/100;
           k = jStat.studentt.pdf(j, df);
           lower_crit.t.push(j);
           lower_crit.density.push(k);
        }
        var l = t_crit;
        for (var i = 0; i < 101; i++) {
            l = l + (6-t_crit)/100;
            k = jStat.studentt.pdf(l, df);
            upper_crit.t.push(l);
            upper_crit.density.push(k);
        }
    }
    if (alt == "less_than") {
        var t_crit = jStat.studentt.inv(alpha, df);
        var l = t_crit;
        for (var i = 0; i < 101; i++) {
            j = j + (6+t_crit)/100;
            k = jStat.studentt.pdf(j,df);
            lower_crit.t.push(j);
            lower_crit.density.push(k);
        };
    }
    if (alt == "greater_than") {
        t_crit = jStat.studentt.inv(1-alpha, df);
        var l = t_crit;
        for (var i = 0; i < 101; i++) {
            l = l + (6-t_crit)/100;
            k = jStat.studentt.pdf(l, df);
            upper_crit.t.push(l);
            upper_crit.density.push(k);
        }
    }
    
    var output = {lower_crit: lower_crit, upper_crit: upper_crit};
    return output;
}

function pValue(t_obs, df, alt) {
    var pval = 0;
    if (alt == "not_equal") {
        pval = 2*jStat.studentt.cdf(-Math.abs(t_obs), df); 
    }
    if (alt == "less_than") {
        pval = jStat.studentt.cdf(t_obs, df);
    }
    if (alt == "greater_than") {
        pval = 1-jStat.studentt.cdf(t_obs, df);
    }
    return pval;
    
}
