
function drawPlot() {
    var grp1_cor = Number(document.getElementById("grp1_corr").value);
    var grp2_cor = Number(document.getElementById("grp2_corr").value);
    var grp1_xmean = Number(document.getElementById("mean1_1").value);
    var grp1_ymean = Number(document.getElementById("mean1_2").value);
    var grp2_xmean = Number(document.getElementById("mean2_1").value);
    var grp2_ymean = Number(document.getElementById("mean2_2").value);
    var n = Number(document.getElementById("n").value);
    var grp1 = {x: [], y: []};
    grp1.x = randDataOneVar(n,0,1);
    grp1.y = randDataOneVar(n,0,1);
    var grp2 = {x: [], y: []};
    grp2.x = randDataOneVar(n,0,1);
    grp2.y = randDataOneVar(n,0,1);

    var chol1 = [grp1_cor, Math.sqrt(1-(grp1_cor*grp1_cor))];
    var chol2 = [grp2_cor, Math.sqrt(1-(grp2_cor*grp2_cor))];

    var grp1_y_proj = projChol(grp1, chol1);
    var grp2_y_proj = projChol(grp2, chol2);
    
    var grp1_x = scale(grp1.x, grp1_xmean, 10);
    var grp1_y = scale(grp1_y_proj, grp1_ymean, 10);
    var grp2_x = scale(grp2.x, grp2_xmean, 10);
    var grp2_y = scale(grp2_y_proj, grp2_ymean, 10);
    var twogrps = {grp1: [grp1_x, grp1_y], grp2: [grp2_x, grp2_y]};
    var hotelling = hotellingT2(twogrps,n);
    var t_tests = ttests(twogrps, n);
    if(hotelling.p < 0.05) { var pcol = 'red'} else {var pcol = 'black'};
    if(t_tests.var1.p < 0.05) {var pcol_g1 = 'red'} else {var pcol_g1 = 'black'};
    if(t_tests.var2.p < 0.05) {var pcol_g2 = 'red'} else {var pcol_g2 = 'black'};

    
    var grp1_trace = {
        x: grp1_x,
        y: grp1_y,
        mode: 'markers',
        type: 'scatter',
        showlegend: false,
        marker: {
            color: 'rgba(255,100,100,0.9)'
        }
    }
    
    var grp2_trace = {
        x: grp2_x,
        y: grp2_y,
        mode: 'markers',
        type: 'scatter',
        showlegend: false,
        marker: {
            color: 'rgba(100,100,255,0.9)'
        }
    }
    
    var grp1_mean_trace = {
        x: [jStat.mean(grp1_x)],
        y: [jStat.mean(grp1_y)],
        mode: 'markers',
        type: 'scatter',
        showlegend: false,
        marker: {
            color: 'red',
            size: 20,
            symbol: 'x'
        }
    }

    
    var grp2_mean_trace = {
        x: [jStat.mean(grp2_x)],
        y: [jStat.mean(grp2_y)],
        mode: 'markers',
        type: 'scatter',
        showlegend: false,
        marker: {
            color: 'blue',
            size: 20,
            symbol: 'x'
        }
    }
    

    var layout = {
        title: 'T<sup>2</sup>: ' + hotelling.t2.toFixed(1) + ',  F: ' + hotelling.f.toFixed(2) + ',  df<sub>num</sub>: ' + hotelling.df1 + ',  df<sub>den</sub>: ' + hotelling.df2 + ',  p: <span style="color:' + pcol +'">' + hotelling.p.toFixed(4) + '</span><br><br>t-test var 1: p = <span style="color:' + pcol_g1 + '">' + t_tests.var1.p.toFixed(4) + '</span><br> t-test var 2: p = <span style="color:' + pcol_g2 + '">' + t_tests.var2.p.toFixed(4) + '</span>',
        xaxis: {
            title: 'Variable 1',
            range: [50,150]
        },
        yaxis: {
            title: 'Variable 2',
            range: [50,150]
        }
    }
    
    Plotly.newPlot('manova_div', [ grp1_trace, grp2_trace, grp1_mean_trace, grp2_mean_trace], layout);
       

}
            
function randDataOneVar(n, m, s){
       var dat = [];
       var j = 0;
       for(var i=0; i<n; i++){
            j = jStat.normal.inv(Math.random(), m, s);
            dat.push(j);
       }
       return dat;
    }

function projChol(dat, chol) {
    var dat_projected = [];
    for (var i = 0; i < dat.x.length; i++) {
        dat_projected.push(dat.x[i]*chol[0] + dat.y[i]*chol[1]);
    }
    return dat_projected;
}

function scale(dat, m, s) {
    var dat_scaled = [];
    for (var i = 0; i < dat.length; i++) {
        dat_scaled.push(dat[i]*s+m);
    }
    return dat_scaled;
}

function hotellingT2(data,n) {
    var means = {grp1: {x: jStat.mean(data.grp1[0]), y: jStat.mean(data.grp1[1])}, grp2: {x: jStat.mean(data.grp2[0]), y: jStat.mean(data.grp2[1])}};
    var grp1_resid = math.matrix([math.add(data.grp1[0], -means.grp1.x), math.add(data.grp1[1], -means.grp1.y)]);
    var grp2_resid = math.matrix([math.add(data.grp2[0], -means.grp2.x), math.add(data.grp2[1], -means.grp2.y)]);
    var grp1_resid_t = math.transpose(grp1_resid);
    var grp2_resid_t = math.transpose(grp2_resid);
    var grp1_sscp = math.multiply(grp1_resid, grp1_resid_t);
    var grp2_sscp = math.multiply(grp2_resid, grp2_resid_t);
    var covar = math.multiply(math.add(grp1_sscp, grp2_sscp),1/(2*n-2));
    var inv_covar = math.inv(covar);
    var mean_diffs = math.matrix([means.grp1.x - means.grp2.x, means.grp1.y - means.grp2.y]);
    var mean_diffs_t = math.transpose(mean_diffs);
    var t2_1 = math.multiply(mean_diffs, inv_covar);
    var t2 = ((n*n)/(n+n))*math.multiply(t2_1, mean_diffs_t);
    var f = ((2*n-3)/(4*n-4))*t2;
    var p = 1-jStat.centralF.cdf(f, 2, 2*n-3);
    var t2_test = {t2: t2, f: f, p: p, df1: 2, df2: 2*n-3};
    return t2_test;
}

function ttests(data, n) {
    var ttest_var1 = ttest(data.grp1[0], data.grp2[0], n);
    var ttest_var2 = ttest(data.grp1[1], data.grp2[1], n);
    return {var1: ttest_var1, var2: ttest_var2};
}

function ttest(g1, g2, n) {
    var g1_mean = jStat.mean(g1);
    var g2_mean = jStat.mean(g2);
    var g1_sd = jStat.stdev(g1);
    var g2_sd = jStat.stdev(g2);
    var diff = g1_mean - g2_mean;
    var s2p = ((n-1)*g1_sd*g1_sd + (n-1)*g2_sd*g2_sd)/(2*n-2);
    var t = diff/Math.sqrt(s2p*(2/n));
    var df = 2*n-2;
    var p = 1-jStat.studentt.cdf(Math.sqrt(t*t), df);
    var results = {t: t, df: df, p: p};
    return results;
}
