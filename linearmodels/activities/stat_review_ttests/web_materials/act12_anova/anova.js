
function loadCharts() {
    drawChart1();
    drawChart2();
}


function drawChart1() {
    var datasets = twoDists();
    var anova_results = calcANOVA(datasets);
    updateAnovaPage(anova_results);
    var xvals = makeXVals();
    var baselines = makeMeanVals(anova_results.mean);
    var connect_lines = makeConnectLines(xvals, baselines, datasets.maxbreadth);
    
    var rawdat = {
        x: xvals,
        y: datasets.maxbreadth,
        type: 'scatter',
        mode: 'markers'
        
    }
    
    
    var data = [rawdat];
    
    var layout = {
        title: {
            text: "Maximum breadth of Egyptian skulls"
        },
        showlegend: false,
        shapes: connect_lines,
        yaxis: {
            range: [125,145],
            title: {
                text: "Max. breadth"
            }
        },
        xaxis: {
            tickvals: [17, 60],
            ticktext: ["Early predynastic", "Roman"]
        }
    }
        
Plotly.newPlot("chart_div1", data, layout);


}
      
      
function twoDists() {
    var dat = {group: [], maxbreadth: []};
    var k = 0;
    var max = 29;
    var grps = ["Early predynastic", "Roman"];
    for (i = 0; i < 2; i++) {
        for (var j=0; j<max; j++) {
            k = jStat.normal.sample(133.93, 2.7);
            dat.group.push(grps[i]);
            dat.maxbreadth.push(k);
        }
        max = max+1;
    }
        
       return dat;
    };
    
    
function makeXVals() {
    var xvals = [];
    for (i = 5; i < 34; i++) {
        xvals.push(i);
    }
    for (i = 45; i < 75; i++) {
        xvals.push(i);
    }
    
    return xvals;
}


function makeMeanVals(means) {
    var baseline_vals = []
    for (i = 0; i<29; i++) {
        baseline_vals.push(means.pd);
    }
    for (i = 0; i < 30; i++) {
        baseline_vals.push(means.ro);
    }
    
    return baseline_vals;
}


function makeConnectLines(xvals, baselines, ptvals) {
    var lines = [];

    for (i = 0; i < xvals.length; i++) {
        var a_line = new Object();
        a_line.type = 'line';
        a_line.x0 = xvals[i];
        a_line.y0 = baselines[i];
        a_line.x1 = xvals[i];
        a_line.y1 = ptvals[i];
        a_line.line = {color: 'red', width: 1};
        
        lines.push(a_line);
    }
    
    var a_line = new Object();
    
    a_line.type = 'line';
    a_line.x0 = xvals[0];
    a_line.y0 = baselines[0];
    a_line.x1 = xvals[28];
    a_line.y1 = baselines[28];
    a_line.line = {color: 'blue', width: 1};
    
    lines.push(a_line);
    
    var a_line = new Object();

    a_line.type = 'line';
    a_line.x0 = xvals[29];
    a_line.y0 = baselines[29];
    a_line.x1 = xvals[58];
    a_line.y1 = baselines[58];
    a_line.line = {color: 'blue', width: 1};
        
    lines.push(a_line);
    
    
    return lines;
}
    
function calcANOVA(dat) {
    var anova = {mean: {grand: 0, pd: 0, ro: 0}, ss: {total: 0, groups: 0, error: 0}, df: {total: 0, groups: 0, error: 0}, ms: {total: 0, groups: 0, error: 0}, f: 0, p: 0};
    var dat_split = {pd: [], ro: []};
    
    for (i = 0; i < dat.maxbreadth.length; i++) {
        if (dat.group[i] == "Early predynastic") {
            dat_split.pd.push(dat.maxbreadth[i]);
        } else {
            dat_split.ro.push(dat.maxbreadth[i]);
        }
    }
    
    
    anova.mean.grand = jStat.mean(dat.maxbreadth);
    anova.mean.pd = jStat.mean(dat_split.pd);
    anova.mean.ro = jStat.mean(dat_split.ro);
    
    anova.ss.total = jStat(dat.maxbreadth).sumsqerr();
    anova.ss.error = jStat(dat_split.pd).sumsqerr() + jStat(dat_split.ro).sumsqerr();
    anova.ss.groups = anova.ss.total - anova.ss.error;
    
    anova.df.total = dat.maxbreadth.length - 1;
    anova.df.groups = 1;
    anova.df.error = anova.df.total - 1;
    
    anova.ms.total = anova.ss.total/anova.df.total;
    anova.ms.groups = anova.ss.groups/anova.df.groups;
    anova.ms.error = anova.ss.error/anova.df.error;
    
    anova.f = anova.ms.groups/anova.ms.error;
    anova.p = 1-jStat.centralF.cdf(anova.f, anova.df.groups, anova.df.error);
    
    return anova;
};


function updateAnovaPage(anova) {

    document.getElementById("ss_btwn_rand").innerHTML = anova.ss.groups.toFixed(2);
    document.getElementById("ss_error_rand").innerHTML = anova.ss.error.toFixed(2);
    document.getElementById("ss_total_rand").innerHTML = anova.ss.total.toFixed(2);
    document.getElementById("ms_btwn_rand").innerHTML = anova.ms.groups.toFixed(2);
    document.getElementById("ms_error_rand").innerHTML = anova.ms.error.toFixed(2);
    document.getElementById("F_stat_rand").innerHTML = anova.f.toFixed(3);
    document.getElementById("p_val_rand").innerHTML = anova.p.toFixed(4);
    if (anova.p < Number(0.05)) {
        document.getElementById("p_val_rand").style.color = "red";
    } else {
        document.getElementById("p_val_rand").style.color = "black";

    }
    
    return anova;
}



function drawChart2() {
    var mean_diff = document.getElementById("diff_btwn_means2").value;
    var data = makeData(mean_diff);
    
    var grp_means = {pd: jStat(data.pd).mean(), ro: jStat(data.ro).mean()};

    var xvals = makeXVals();
    var baselines = makeMeanVals(grp_means);
    var maxbreadths = data.pd.concat(data.ro);
    var connect_lines = makeConnectLines(xvals, baselines, maxbreadths);
    
    var rawdat = {
        x: xvals,
        y: maxbreadths,
        type: 'scatter',
        mode: 'markers'
        
    }
    
    
    var data = [rawdat];
    
    var layout = {
        title: {
            text: "Maximum breadth of Egyptian skulls"
        },
        showlegend: false,
        shapes: connect_lines,
        yaxis: {
            range: [115,145],
            title: {
                text: "Max. breadth"
            }
        },
        xaxis: {
            tickvals: [17, 60],
            ticktext: ["Early predynastic", "Roman"]
        }
    }
        
        
        
        Plotly.newPlot("chart_div3", data, layout);
}
      
      
function makeData(new_diff) {
    var SST = 1841.7;
    var orig_data = {pd: [131,125,131,119,136,138,139,125,131,134,129,134,126,132,141,131,135,132,139,132,126,135,134,128,130,138,128,127,131], ro: [137,136,128,130,138,126,136,126,132,139,143,141,135,137,142,139,138,137,133,145,138,131,143,134,132,137,129,140,147,136]};
    var grand_mean = jStat(orig_data.pd, orig_data.ro).mean();
    var pd_mean = jStat(orig_data.pd).mean();
    var ro_mean = jStat(orig_data.ro).mean();
    
    var residuals = {pd: [], ro: []};
    
    for (i = 0; i<orig_data.pd.length; i++) {
        residuals.pd.push(orig_data.pd[i] - pd_mean);
    }
    for (i = 0; i<orig_data.ro.length; i++) {
        residuals.ro.push(orig_data.ro[i] - ro_mean);
    }    

    var SSG_target = 59*new_diff*new_diff/4
    var SSE_target = 0;
    if (SST-SSG_target > 0) {
        SSE_target = SST - SSG_target;
    }
    var SSE_mult = SSE_target/1537;
    var data = {pd: [], ro: []};

    var pd_mean = grand_mean - new_diff/2;
    var ro_mean = grand_mean + new_diff/2;
    
    for (var i = 0; i<residuals.pd.length; i++) {
        var sign_resid = Math.sign(residuals.pd[i]);
        var new_resid = sign_resid*Math.sqrt(SSE_mult*residuals.pd[i]*residuals.pd[i]);
        data.pd.push(pd_mean + new_resid);
    }

    for (var i = 0; i<residuals.ro.length; i++) {
        var sign_resid = Math.sign(residuals.ro[i]);
        var new_resid = sign_resid*Math.sqrt(SSE_mult*residuals.ro[i]*residuals.ro[i]);
        data.ro.push(ro_mean + new_resid);
    }
    
    var err_ms = SSE_target/57;
    var f_rat = SSG_target/err_ms;
    var p_val = 1-jStat.centralF.cdf(f_rat, 1, 57);
    
    if (SSG_target < SST) {
        document.getElementById("ss_btwn2").innerHTML = SSG_target.toFixed(2);
        document.getElementById("ss_error2").innerHTML = SSE_target.toFixed(2);
        document.getElementById("ss_total2").innerHTML = SST.toFixed(2);
        document.getElementById("ms_btwn2").innerHTML = SSG_target.toFixed(2);
        document.getElementById("ms_error2").innerHTML = err_ms.toFixed(2);
        document.getElementById("F_stat2").innerHTML = f_rat.toFixed(2);
        document.getElementById("p_val2").innerHTML = p_val.toFixed(4);
    } else {
        document.getElementById("ss_btwn2").innerHTML = 1841.70;
        document.getElementById("ss_error2").innerHTML = 0;
        document.getElementById("ss_total2").innerHTML = 1841.70;
    };
    
    return data;
}

function resetDiff() {
    document.getElementById("diff_btwn_means2").value = 4.55;
    drawChart2();
}

