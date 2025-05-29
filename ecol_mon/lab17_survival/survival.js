var plotheight = 500;


function drawPlots() {
    drawphip();
    drawphipt();
    drawphitp();
    drawphit_pt();
}

function drawphip() {
    var w = window.innerWidth;
    plotwidth = w/3.5;
    
    var p1 = Number(document.getElementById("p1_input").value);
    var p2 = p1;
    var phi1 = Number(document.getElementById("phi1_input").value);
    var phi2 = phi1;

    
    var p_ch = pch(p1, p2, phi1, phi2);
    var obsData = {history: ["111","110","101","100"], obs: [54,24,4,74]};
    var total = 54+24+4+74;

    var exp = calcExp(p_ch, total);
    
    var loglike = calcLogLike(p_ch, obsData);

    var obs_freq = {
        x: obsData.history,
        y: obsData.obs,
        name: 'Observed',
        type: 'bar',
        marker: {
            color: '#07BBFA'
        }
    }
    
    var exp_freq = {
        x: obsData.history,
        y: exp,
        name: 'Expected',
        type: 'bar',
        marker: {
            color: '#F8C471'
        }
    }
    
    var plotData = [obs_freq, exp_freq];
    
    var layout = {
        autosize: false,
        width: plotwidth,
        height: plotheight,
        title: {
            text: '<b>Model &#981;.p.</b><br>Log likelihood: ' + loglike.toFixed(2)
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
    
    Plotly.newPlot('phip_graph', plotData, layout);
    
}


function drawphipt() {
    var w = window.innerWidth;
    plotwidth = w/3.5;
    
    var p1 = Number(document.getElementById("p2_t1_input").value);
    var p2 = Number(document.getElementById("p2_t2_input").value);
    var phi1 = Number(document.getElementById("phi2_input").value);
    var phi2 = phi1;

    
    var p_ch = pch(p1, p2, phi1, phi2);
    var obsData = {history: ["111","110","101","100"], obs: [54,24,4,74]};
    var total = 54+24+4+74;
    var exp = calcExp(p_ch, total);
    
    var loglike = calcLogLike(p_ch, obsData);
    
    var obs_freq = {
        x: obsData.history,
        y: obsData.obs,
        name: 'Observed',
        type: 'bar',
        marker: {
            color: '#07BBFA'
        }
    }
    
    var exp_freq = {
        x: obsData.history,
        y: exp,
        name: 'Expected',
        type: 'bar',
        marker: {
            color: '#F8C471'
        }
    }
    
    var plotData = [obs_freq, exp_freq];
    
    var layout = {
        autosize: false,
        width: plotwidth,
        height: plotheight,
        title: {
            text: '<b>Model &#981;.p<sub>t</sub></b><br>Log likelihood: ' + loglike.toFixed(2)
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
    
    Plotly.newPlot('phipt_graph', plotData, layout);
    
}


function drawphitp() {
    var w = window.innerWidth;
    plotwidth = w/3.5;
    
    var p1 = Number(document.getElementById("p3_input").value);
    var p2 = p1;
    var phi1 = Number(document.getElementById("phi3_t1_input").value);
    var phi2 = Number(document.getElementById("phi3_t2_input").value);

    
    var p_ch = pch(p1, p2, phi1, phi2);
    var obsData = {history: ["111","110","101","100"], obs: [54,24,4,74]};
    var total = 54+24+4+74;

    var exp = calcExp(p_ch, total);
    
    var loglike = calcLogLike(p_ch, obsData);

    
    var obs_freq = {
        x: obsData.history,
        y: obsData.obs,
        name: 'Observed',
        type: 'bar',
        marker: {
            color:'#07BBFA'
        }
    }
    
    var exp_freq = {
        x: obsData.history,
        y: exp,
        name: 'Expected',
        type: 'bar',
        marker: {
            color: '#F8C471'
        }
    }
    
    var plotData = [obs_freq, exp_freq];
    
    var layout = {
        autosize: false,
        width: plotwidth,
        height: plotheight,
        title: {
            text: '<b>Model &#981;<sub>t</sub>p.</b><br>Log likelihood: ' + loglike.toFixed(2)
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
    
    Plotly.newPlot('phitp_graph', plotData, layout);
    
}

function drawphit_pt() {
    var w = window.innerWidth;
    plotwidth = w/3.5;
    
    var p1 = Number(document.getElementById("p4_t1_input").value);
    var p2 = Number(document.getElementById("p4_t2_input").value);
    var phi1 = Number(document.getElementById("phi4_t1_input").value);
    var phi2 = Number(document.getElementById("phi4_t2_input").value);

    
    var p_ch = pch(p1, p2, phi1, phi2);
    var obsData = {history: ["111","110","101","100"], obs: [54,24,4,74]};
    var total = 54+24+4+74;

    var exp = calcExp(p_ch, total);
    
    var loglike = calcLogLike(p_ch, obsData);

    
    var obs_freq = {
        x: obsData.history,
        y: obsData.obs,
        name: 'Observed',
        type: 'bar',
        marker: {
            color:'#07BBFA'
        }
    }
    
    var exp_freq = {
        x: obsData.history,
        y: exp,
        name: 'Expected',
        type: 'bar',
        marker: {
            color: '#F8C471'
        }
    }
    
    var plotData = [obs_freq, exp_freq];
    
    var layout = {
        autosize: false,
        width: plotwidth,
        height: plotheight,
        title: {
            text: '<b>Model &#981;<sub>t</sub>p<sub>t</sub></b><br>Log likelihood: ' + loglike.toFixed(2)
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
    
    Plotly.newPlot('phit_pt_graph', plotData, layout);
    
}


function pch(p1, p2, phi1, phi2) {
    var p_ch = [];
    var np1  = 1-p1;
    var np2 = 1-p2;
    var nphi1 = 1-phi1;
    var nphi2 = 1-phi2;
    p_ch.push(phi1*p1*phi2*p2);
    p_ch.push(phi1*p1*phi2*np2 + phi1*p1*nphi2);
    p_ch.push(phi1*np1*phi2*p2);
    p_ch.push(nphi1+phi1*np1*nphi2+phi1*np1*phi2*np2);
    
    return (p_ch);
}


function calcExp(p_ch, total) {
    var exp = [];
    for (var i = 0; i < p_ch.length; i++) {
        exp.push(total * p_ch[i]);
    }
    
    return exp;
}

function calcLogLike(p_ch, obsData) {
    var loglike = 0;
    for (i = 0; i < p_ch.length; i++) {
        loglike = loglike + obsData.obs[i]*Math.log(p_ch[i]);
    }
        
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
