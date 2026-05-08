
function drawChart() {
    var btwn = document.getElementById("between").value;
    var wthn = document.getElementById("within").value;
    var obs_data = {
        f1: [6.27, 5.36, 6.39, 4.85, 5.99, 7.14, 5.08, 4.07, 4.35, 4.95], 
        f2: [3.07, 3.29, 4.04, 4.19, 3.41, 3.75, 4.87, 3.94, 6.28, 3.15], 
        f3: [4.04, 3.79, 4.56, 4.55, 4.55, 4.53, 3.53, 3.71, 7.00, 4.61]
    };

    var means_resids = getMeanResid(obs_data, btwn, wthn);
    var colors = {f1: 'lightgreen', f2: 'green', f3: 'darkgreen'};
    var offsets = {f1: 5, f2: 20, f3: 35};
    
    var shapes = [];
    var pt_ids = {f1: [], f2: [], f3: []};
    
    // Make the residual lines
    for (const key in means_resids.resids) {
        for (i = 0; i < 10; i++) {
            var residline = residLines(i+offsets[key], means_resids.data[key][i], i+offsets[key], means_resids.means[key], colors[key]);
            shapes.push(residline);
            pt_ids[key].push(i+offsets[key]);
        }
    }

    //Make the horizontal lines at the group means
    for (const key in means_resids.means) {
        var line = {type: 'line', x0: offsets[key], y0: means_resids.means[key], x1: offsets[key] + 9, y1: means_resids.means[key], layer: 'below', line: {color: colors[key]}};
        shapes.push(line);
    }
    
    var f1 = {
        name: 'Fert. 1',
        x: pt_ids.f1,
        y: means_resids.data.f1,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: {
            color: 'lightgreen'
        }
        
    }
    
    var f2 = {
        name: 'Fert. 2',
        x: pt_ids.f2,
        y: means_resids.data.f2,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: {
            color: 'green'
        }
    }

    var f3 = {
        name: 'Fert. 3',
        x: pt_ids.f3,
        y: means_resids.data.f3,
        type: 'scatter',
        mode: 'markers',
        showlegend: false,
        marker: {
            color: 'darkgreen'
        }
    }
    
    var layout = {
        title: 'Differences in yield for three fertilizers',
        xaxis: {
            tickvals: [offsets.f1 + 5, offsets.f2 + 5, offsets.f3 + 5],
            ticktext: ["Fert. 1","Fert. 2","Fert. 3"],
            fixedrange: true
        },
        yaxis: {
            range: [-1,10],
            title: "Yield"
        },
        shapes: shapes
    }
    
    
    Plotly.newPlot("chart_div3", [f1,f2,f3], layout);
    
    calculateAnova(means_resids);
    
    drawFdist();

}

function drawFdist() {
    var num_df = 2;
    var denom_df = 27;
    var obs_f = Number(document.getElementById("F_stat2").innerHTML);
    var to = obs_f + 10;
    var fcurve = makeFcurve(num_df, denom_df,0,to);
    var ffill = makeFcurve(num_df, denom_df,obs_f,to);
    
    var f_curve = {
        x: fcurve.f,
        y: fcurve.f_dens,
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        line: {
            color: 'red'
        }
    }
    
    var f_fill = {
        x: ffill.f,
        y: ffill.f_dens,
        type: 'scatter',
        fill: 'tozeroy',
        showlegend: false,
        fillcolor: 'rgba(255,0,0,0.5)'
    }
    
    var layout = {
        xaxis: {
            title: "F value"
        },
        yaxis: {
            title: "Probability"
        }
    }
    
    Plotly.newPlot("fdist_anova_div", [f_fill, f_curve], layout);
}

function makeFcurve(ndf, ddf, f_from, f_to) {
    var fvals = {f: [], f_dens: []};
    var range = f_to - f_from;
    for (i = 0; i < 100; i++) {
        var f = f_from + range*i/100;
        fvals.f.push(f);
        fvals.f_dens.push(1-jStat.centralF.cdf(f, ndf, ddf));
    }
    return(fvals);
}
      

function getMeanResid(data, btwn, wthn){
    var obs_means = {f1: 0, f2: 0, f3: 0};
    var new_means = {f1: 0, f2: 0, f3: 0};
    var obs_resids = {f1: [], f2: [], f3: []};
    var new_resids = {f1: [], f2: [], f3: []};
    var new_data = {f1: [], f2: [], f3: []};
    var grandmean = mean(data.f1.concat(data.f2.concat(data.f3)));
    
    // calculate the observed means
    for (const key in obs_means) {
        obs_means[key] = mean(data[key]);
    }
    
    //calculate the observed residuals
    for (const key in obs_means) {
        for (j = 0; j < data.f1.length; j++) {
            var resid = (data[key][j] - obs_means[key])*wthn;
            obs_resids[key].push(resid);
        }
    }
    
    // calculate the new means
    for (const key in new_means) {
        new_means[key] = (obs_means[key] - grandmean)*btwn + grandmean;
    }
    
    // calculate the new residuals
    for (const key in new_resids) {
        for (j = 0; j < obs_resids.f1.length; j++) {
            new_resids[key].push(obs_resids[key][j]*wthn);
        }
    }
    
    // calculate the new data values
    for (const key in new_data) {
        for (j = 0; j < new_resids.f1.length; j++) {
            new_data[key].push(new_means[key] + new_resids[key][j]);
        }
    }
    
    var means_resids = {means: new_means, resids: new_resids, data: new_data};
    return means_resids;
}

function calculateAnova(data) {
    var groupSS = 0;
    var errorSS = 0; 
    var totalSS = 0;
    var groupMS = 0;
    var errorMS = 0;
    var fval = 0;
    var pval = 0;
    var totalDF = 29;
    var groupDF = 2;
    var errorDF = 27;
    var grandmean = mean(data.data.f1.concat(data.data.f2.concat(data.data.f3)));
    
    for (const key in data.data) {
        for (i = 0; i < data.data.f1.length; i++) {
            var diff = data.data[key][i] - grandmean;
            totalSS = totalSS + diff*diff;
            errorSS = errorSS + data.resids[key][i] * data.resids[key][i];
        }
    }
    
    for (const key in data.means) {
        var diff = data.means[key] - grandmean;
        groupSS = groupSS + 10*diff*diff;
    }
    
    groupMS = groupSS/groupDF;
    errorMS = errorSS/errorDF;
    
    fval = groupMS/errorMS;
    pval = 1-jStat.centralF.cdf(fval, 2, 27);
    
    document.getElementById("ss_btwn2").innerHTML = groupSS.toFixed(2);
    document.getElementById("ms_btwn2").innerHTML = groupMS.toFixed(2);
    document.getElementById("F_stat2").innerHTML = fval.toFixed(2);
    document.getElementById("p_val2").innerHTML = pval.toFixed(4);
    document.getElementById("ss_error2").innerHTML = errorSS.toFixed(2);
    document.getElementById("ms_error2").innerHTML = errorMS.toFixed(2);
    document.getElementById("ss_total2").innerHTML = totalSS.toFixed(2);
    
}

function residLines(x0,y0,x1,y1,color) {
    var residLine = {
        type: 'line',
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        layer: 'below',
        line: {
            color: color
        }
    }
    
    return residLine;

}

function mean(array) {
    return array.reduce((total, current) => total + current)/array.length;
}

function resetSliders() {
    document.getElementById("between").value = 1;
    document.getElementById("within").value = 1;
    drawChart();
}
