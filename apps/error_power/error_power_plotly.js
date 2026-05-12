var current = 0;

function drawChart() {
    var plottitle = "Null sampling distribution"
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
        plottitle = "Null sampling distribution"
    } else {
        amt_diff.innerHTML = "more than 0";
        null_tf.innerHTML = "false";
        plottitle = "Null and alternative sampling distribution"
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
            text: plottitle
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
            text: plottitle
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
    drawChart();
}

function switchChart() {
    current = 1-current;
    if(current == 0){
        document.getElementById("ct").innerHTML = "Yield";
    } else {
        document.getElementById("ct").innerHTML = "t";
    }
    drawChart();
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
