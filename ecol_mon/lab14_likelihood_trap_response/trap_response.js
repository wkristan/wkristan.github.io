var plotheight = 500;


function drawPlots() {
    drawM0();
    drawMt();
    drawMb();
}

function drawM0() {
    var w = window.innerWidth;
    plotwidth = w/3.5;
    
    var p_m0 = Number(document.getElementById("p_m0_input").value);
    var f00_m0 = Number(document.getElementById("f00_m0_input").value);

    
    var p_ch_m0 = pchM0(p_m0);
    var obsData_m0 = {history: ["001","010","011","100","101","110","111","000"], obs: [38,55,21,34,14,19,4,f00_m0]};
    var nhat = obsData_m0.obs.reduce(calcSum,0);
    document.getElementById("nhat_m0").innerHTML = nhat;

    var exp = calcExp(p_ch_m0, nhat);
    
    var loglike = calcLogLike(p_ch_m0, obsData_m0, nhat);
    
    var redprop = getRedProp(loglike);

    var obs_freq_m0 = {
        x: obsData_m0.history,
        y: obsData_m0.obs,
        name: 'Observed',
        type: 'bar',
        marker: {
            color: ['#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#9DDDF3']
        }
    }
    
    var exp_freq_m0 = {
        x: obsData_m0.history,
        y: exp,
        name: 'Expected',
        type: 'bar',
        marker: {
            color: '#F8C471'
        }
    }
    
    var m0_plotData = [obs_freq_m0, exp_freq_m0];
    
    var m0_layout = {
        autosize: false,
        width: plotwidth,
        height: plotheight,
        title: {
            text: '<b>Model M<sub>0</sub></b><br>Log likelihood: ' + loglike.toFixed(2),
            font: {
                color: 'rgb(' + Math.round(255*redprop) + ' , 0, 0)',
            }
        },
        xaxis: {
            type: 'category',
            tickfont: {
                size: 16
            },
            title: 'Capture history',
            font: {
                size: 14
            }
        },
        yaxis: {
          title: 'Count'  
        },
        showlegend: false,
        barmode: 'group'
    }
    
    Plotly.newPlot('m0_graph', m0_plotData, m0_layout);
    
}


function drawMt() {
    var w = window.innerWidth;
    plotwidth = w/3.5;
    
    var p_t1 = Number(document.getElementById("p_t1_input").value);
    var p_t2 = Number(document.getElementById("p_t2_input").value);
    var p_t3 = Number(document.getElementById("p_t3_input").value);

    var f00_mt = Number(document.getElementById("f00_mt_input").value);

    
    var p_ch_mt = pchMt(p_t1, p_t2, p_t3);
    var obsData_mt = {history: ["001","010","011","100","101","110","111","000"], obs: [38,55,21,34,14,19,4,f00_mt]};
    var nhat = obsData_mt.obs.reduce(calcSum,0);
    document.getElementById("nhat_mt").innerHTML = nhat;

    var exp = calcExp(p_ch_mt, nhat);
    
    var loglike = calcLogLike(p_ch_mt, obsData_mt, nhat);
    
    var redprop = getRedProp(loglike);

    
    var obs_freq_mt = {
        x: obsData_mt.history,
        y: obsData_mt.obs,
        name: 'Observed',
        type: 'bar',
        marker: {
            color: ['#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#9DDDF3']
        }
    }
    
    var exp_freq_mt = {
        x: obsData_mt.history,
        y: exp,
        name: 'Expected',
        type: 'bar',
        marker: {
            color: '#F8C471'
        }
    }
    
    var mt_plotData = [obs_freq_mt, exp_freq_mt];
    
    var mt_layout = {
        autosize: false,
        width: plotwidth,
        height: plotheight,
        title: {
            text: '<b>Model M<sub>t</sub></b><br>Log likelihood: ' + loglike.toFixed(2),
            font: {
                color: 'rgb(' + Math.round(255*redprop) + ' , 0, 0)',
            }
        },
        xaxis: {
            type: 'category',
            tickfont: {
                size: 16
            },
            title: 'Capture history',
            font: {
                size: 14
            }
        },
        yaxis: {
          title: 'Count'  
        },
        showlegend: true,
        legend: {
            x:0,
            xanchor: 'left',
            y:1,
            orientation: 'h'
        },
        barmode: 'group'
    }
    
    Plotly.newPlot('mt_graph', mt_plotData, mt_layout);
    
}


function drawMb() {
    var w = window.innerWidth;
    plotwidth = w/3.5;
    
    var p_mb = Number(document.getElementById("p_mb_input").value);
    var c_mb = Number(document.getElementById("c_mb_input").value);

    var f00_mb = Number(document.getElementById("f00_mb_input").value);

    
    var p_ch_mb = pchB(p_mb, c_mb);
    var obsData_mb = {history: ["001","010","011","100","101","110","111","000"], obs: [38,55,21,34,14,19,4,f00_mb]};
    var nhat = obsData_mb.obs.reduce(calcSum,0);
    document.getElementById("nhat_mb").innerHTML = nhat;

    var exp = calcExp(p_ch_mb, nhat);
    
    var loglike = calcLogLike(p_ch_mb, obsData_mb, nhat);

    var redprop = getRedProp(loglike);

    
    var obs_freq_mb = {
        x: obsData_mb.history,
        y: obsData_mb.obs,
        name: 'Observed',
        type: 'bar',
        marker: {
            color: ['#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#07BBFA','#9DDDF3']
        }
    }
    
    var exp_freq_mb = {
        x: obsData_mb.history,
        y: exp,
        name: 'Expected',
        type: 'bar',
        marker: {
            color: '#F8C471'
        }
    }
    
    var mb_plotData = [obs_freq_mb, exp_freq_mb];
    
    var mb_layout = {
        autosize: false,
        width: plotwidth,
        height: plotheight,
        title: {
            text: '<b>Model M<sub>b</sub></b><br>Log likelihood: ' + loglike.toFixed(2),
            font: {
                color: 'rgb(' + Math.round(255*redprop) + ' , 0, 0)',
            }
        },
        xaxis: {
            type: 'category',
            tickfont: {
                size: 16
            },
            title: 'Capture history',
            font: {
                size: 14
            }
        },
        yaxis: {
          title: 'Count'  
        },
        showlegend: false,
        barmode: 'group'
    }
    
    Plotly.newPlot('mb_graph', mb_plotData, mb_layout);
    
}



function calcSum(total, num) {
    return total + num;
}

function pchM0(p) {
    var p_ch_m0 = [];
    var np = 1-p;
    p_ch_m0.push(np*np*p);
    p_ch_m0.push(np*p*np);
    p_ch_m0.push(np*p*p);
    p_ch_m0.push(p*np*np);
    p_ch_m0.push(p*np*p);
    p_ch_m0.push(p*p*np);
    p_ch_m0.push(p*p*p);
    p_ch_m0.push(np*np*np);
    
    return(p_ch_m0);
    
}


function pchMt(p1, p2, p3) {
    var p_ch_mt = [];
    var np1 = 1-p1;
    var np2 = 1-p2;
    var np3 = 1-p3;
    p_ch_mt.push(np1*np2*p3);
    p_ch_mt.push(np1*p2*np3);
    p_ch_mt.push(np1*p2*p3);
    p_ch_mt.push(p1*np2*np3);
    p_ch_mt.push(p1*np2*p3);
    p_ch_mt.push(p1*p2*np3);
    p_ch_mt.push(p1*p2*p3);
    p_ch_mt.push(np1*np2*np3);
    
    return(p_ch_mt);
}

function pchB(p, c) {
    var p_ch_b = [];
    var np  = 1-p;
    var nc = 1-c;
    p_ch_b.push(np*np*p);
    p_ch_b.push(np*p*nc);
    p_ch_b.push(np*p*c);
    p_ch_b.push(p*nc*nc);
    p_ch_b.push(p*nc*c);
    p_ch_b.push(p*c*nc);
    p_ch_b.push(p*c*c);
    p_ch_b.push(np*np*np);
    
    return (p_ch_b);
}



function calcExp(p_ch, nhat) {
    var exp = [];
    for (var i = 0; i < p_ch.length; i++) {
        exp.push(nhat * p_ch[i]);
    }
    
    return exp;
}

function calcLogLike(p_ch, obsData, nhat) {
    var f00 = obsData.obs[7];
    var countPart = jStat.gammaln(nhat + 1) - jStat.gammaln(f00 + 1);
    var probPart = 0;
    for (i = 0; i < p_ch.length; i++) {
        probPart = probPart + obsData.obs[i]*Math.log(p_ch[i]);
    }
    
    var loglike = countPart + probPart;
    
    return loglike;

}

function getRedProp(loglike) {
    if(loglike-373 < 0) {
        redprop = 0;
    } else {
        redprop = ((loglike-373)/373)/((456-373)/373);
    }
    return redprop;
}
