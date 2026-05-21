var tot_length = [160.8,160.9,154.5,159.2,156.7,162.2,161.8,161.1,161.7,161,161.4,159,160.7,160.1,165.3,156,166.9,164.8,158.7,155.2,159.3,154.6,169.8,156.6,167.4,161,156.7,163.8,157.5,158.5,159.8,163.5,158.9,153.9,155.9,161.5,163,159.9,159,159.5,153.6,163.2,164.8,157.2,158.5,153.4,161.6,158,156.1,163.3,163.4,157.4,158.9,161,166,160.5,161.8,156.2,154.9,162,157.6,157.4,163,151.8,159.5,159.9,161.6,159.2,152.5,156.1,160.5,156,159,164.7,163,152.5,158.9,164.3,158.2,159.4,156.9,155.6,156,160.3,157.8,157.6,158.3,157.4,163.9,160.1,158.5,161.7,157.2,165.6,156.7,161.4,162.8,157.3,157.1,163,163.6,160.3,164.8,164.8,159.8,156.9,162.9,159.2,157.1,159.6,158.3,161.6,161.7,154.9,158.3,158.2,159.5,159.5,159.6,162.1,158.5,165.1,161.9,158.8,164.2,158.9,163.7,161.5,151.3,159.6,159.3,158,163.3,165.9,164.3,154.2];

var alar = [243.8,245.9,249.5,238.9,246.4,253.7,249.9,245.2,241.6,247.3,243.4,244.6,253.4,242.9,240.9,238,243.6,231.3,248.2,239.3,233.5,248.1,240.6,247.2,238.5,247.5,247.3,262.8,234.6,230.9,244.4,244,240,246.8,246.7,244.4,250.2,239.5,242.6,241.4,238.5,236.7,253,250,244.6,237.5,245.3,246,236.6,248.3,238.9,258.5,239.9,243.5,230.9,252.5,243.4,230.6,240.7,259.5,243.9,250,245.6,245.1,237.4,245.4,249.3,244.1,241.6,239,260,248.9,249.5,245.8,236.1,243.8,242,255.3,245.5,249.1,252.6,233.9,235.1,240,250.4,250.3,251.6,245.9,242.2,256,250.4,246.5,244.3,236.5,244.5,241.4,242.5,246.6,249,251.6,242.9,246.1,243.5,243.6,245.5,242.4,249.8,245.5,249.9,241,251.5,239.9,238.3,249.5,250.5,244.1,248.3,243.5,242.8,251,244,237.4,250.3,246.5,238.7,247.4,241.3,253.9,232.6,250,239.9,249.9,248.9,235.1,239.3,243.9];
              

function drawScatterplot() {

    var r = Number(document.getElementById("r_val").value);
    var chol = [r, Math.sqrt(1-(r*r))];
    var tot_scaled = scale(tot_length, 159.7897059, 3.448312081);
    var alar_scaled = scale(alar, 244.6404412, 6.096002074);
    var alar_projected = projChol(tot_scaled, alar_scaled, chol);
    var tot_length_proj = unscale(tot_length, 159.79, 3.45);
    var alar_proj_unscaled = unscale(alar_projected, 244.64, 6.10);

    var pt_x = Number(document.getElementById("tot_length_pt").value);
    var pt_y = Number(document.getElementById("wingspan_pt").value);

    var tot_resid = pt_x - 159.79;
    var ws_resid = pt_y - 244.65;

    var d2_output = calculateD2(r, [pt_x - 159.79, pt_y - 244.64]);

    var d2_allpts = calculateD2_allpts(r, tot_length, alar_proj_unscaled);

    var chidist = makeChiDist(jStat.max(d2_allpts));

    document.getElementById("pt_v1").innerHTML = pt_x;
    document.getElementById("pt_v2").innerHTML = pt_y;
    var v1_resids = document.getElementsByClassName("v1_resid");
    for(i =0; i < v1_resids.length; i++) {
        v1_resids[i].innerHTML = tot_resid.toFixed(2);
    }
    var v2_resids = document.getElementsByClassName("v2_resid");
    for (i = 0; i < v2_resids.length; i++) {
        v2_resids[i].innerHTML = ws_resid.toFixed(2);
    }
    var v1_inverses = document.getElementsByClassName("v1_inv");
    for (i = 0; i < v1_inverses.length; i++) {
        v1_inverses[i].innerHTML = d2_output.s_inv.subset(math.index(0,0)).toFixed(3);
    }
    var v2_inverses = document.getElementsByClassName("v2_inv");
    for (i = 0; i < v2_inverses.length; i++) {
        v2_inverses[i].innerHTML = d2_output.s_inv.subset(math.index(1,1)).toFixed(3);
    }
    var covar_inverses = document.getElementsByClassName("covar_inv");
    for (i = 0; i < covar_inverses.length; i++) {
        covar_inverses[i].innerHTML = d2_output.s_inv.subset(math.index(1,0)).toFixed(3);
    }
    var covars = document.getElementsByClassName("covar");
    for (i = 0; i < covars.length; i++) {
        covars[i].innerHTML = d2_output.s.subset(math.index(1,0)).toFixed(2);
    }
    document.getElementById("d2").innerHTML = d2_output.d2.toFixed(2);

    var scatter = {
        x: tot_length,
        y: alar_proj_unscaled,
        mode: 'markers',
        type: 'scatter',
        showlegend: false,
        text: d2_allpts,
        hovertemplate: "D<sup>2</sup> = %{text}<extra></extra>"
    }

    var pt = {
        x: [pt_x],
        y: [pt_y],
        mode: 'markers',
        type: 'scatter',
        showlegend: false,
        marker: {
            color: 'red',
            size: 10
        },
        text: [d2_output.d2.toFixed(2)],
        hovertemplate: "<i>D<sup>2</sup> = %{text}</i><extra></extra>"
    }

    var means = {
        x: [159.79],
        y: [244.65],
        mode: 'markers',
        type: 'scatter',
        showlegend: false,
        marker: {
            color: 'black',
            size: 10
        },
        hovertemplate: "x&#772; <sub>TL</sub> = 159.79, s <sub>TL</sub> = 3.45<br>x&#772; <sub>WS</sub> = 244.64, s <sub>WS</sub> = 6.10<extra></extra>"
    }

    var d2s = {
        x: d2_allpts,
        type: 'histogram',
        xbins: {
            start: 0,
            size: 1
        },
        showlegend: false

    }

    var chi = {
        x: chidist[0],
        y: chidist[1],
        mode: "lines",
        showlegend: false
    }

    var layout = {
        title: 'Total length (TL) and wingspan (WS)<br>of sparrows if r = ' + r,
        xaxis: {
            title: 'Total length',
            range: [149,171]
        },
        yaxis: {
            title: 'Wingspan',
            range: [225,265]
        },
        hovermode: "closest"
    }

    var layout_histo = {
        title: 'Histogram of D<sup>2</sup> values',
        xaxis: {
            title: 'D<sup>2</sup>'
        },
        yaxis: {
            title: 'Frequency'
        },
        annotations: [{
            x: d2_output.d2,
            y: 0,
            xref: 'x',
            yref: 'y',
            text: 'D<sup>2</sup> = ' + d2_output.d2.toFixed(2),
            showarrow: true,
            ax: 0,
            ay: -80
        }]
    }
    
    Plotly.newPlot('chart_div', [scatter, pt, means], layout);
    Plotly.newPlot('histo', [d2s,chi], layout_histo);
       

}
            

function projChol(dat1, dat2, chol) {
    var dat_projected = [];
    for (var i = 0; i < dat1.length; i++) {
        dat_projected.push(dat1[i]*chol[0] + dat2[i]*chol[1]);
    }
    return dat_projected;
}

function scale(dat, m, s) {
    var dat_scaled = [];
    for (var i = 0; i < dat.length; i++) {
        dat_scaled.push((dat[i]-m)/s);
    }
    return dat_scaled;
}

function unscale(dat, m, s) {
    var dat_unscaled = [];
    for (var i = 0; i < dat.length; i++) {
        dat_unscaled.push(dat[i]*s + m);
    }
    return dat_unscaled;
}

function calculateD2(r, resids) {
    var d2_output = {s: [], s_inv: [], d2: 0};
    d2_output.s = math.matrix([[3.45*3.45, r*3.45*6.1],[r*3.45*6.1, 6.1*6.1]]);
    d2_output.s_inv = math.inv(d2_output.s);
    d2_output.d2 = math.multiply(math.multiply(math.transpose(resids),d2_output.s_inv),resids);
    return d2_output;
}


function calculateD2_allpts(r, tot_length, alar) {
    var d2_allpts = [];
    var resids = [];
    var s = math.matrix([[3.45*3.45, r*3.45*6.1],[r*3.45*6.1, 6.1*6.1]]);
    var s_inv = math.inv(s);
    for (i = 0; i < tot_length.length; i++) {
        resids = [tot_length[i] - 159.79, alar[i] - 244.64];
        d2_allpts.push(math.multiply(math.multiply(math.transpose(resids),s_inv),resids).toFixed(2));
    }
    return d2_allpts;
}

function makeChiDist(d2max) {
    var d2value = [];
    var chival = [];
    for (i = 0; i < 100; i++) {
        d2value.push(i * d2max/100);
        chival.push(100*jStat.chisquare.pdf(d2value[i],2));
    }

    return [d2value, chival];
}
