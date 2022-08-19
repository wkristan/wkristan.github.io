var rand_x = randDataOneVar(1000, 0, 1);
var rand_y = randDataOneVar(1000, 0, 1);

function drawCharts() {
    drawHeritabilityChart();
    drawResponseCharts();
}
              

function drawHeritabilityChart() {

    var h2 = Number(document.getElementById("h2_val").value);
    var chol = [h2, Math.sqrt(1-(h2*h2))];
    var y_projected = projChol(rand_x, rand_y, chol);
    var rand_parent = scale(rand_x, 100, 10);
    var rand_offspring = scale(y_projected, 100, 10);

    var scatter = {
        x: rand_parent,
        y: rand_offspring,
        mode: 'markers',
        type: 'scatter',
        showlegend: false
    }
    
    var reg_x = {
        x: [60,140],
        y: [(100-h2*100) + h2*60, (100-h2*100) + h2*140],
        mode: 'lines',
        type: 'scatter',
        showlegend: false,
        line: {color: 'black'}
    }

    var layout = {
        title: '1,000 parent/offspring measurements<br>with a heritability of h<sup>2</sup> = ' + h2,
        xaxis: {
            title: 'Parent length',
            range: [60,140]
        },
        yaxis: {
            title: 'Offspring length',
            range: [60, 140]
        }
    }
    
    Plotly.newPlot('chart_div', [scatter, reg_x], layout);
       

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
        dat_scaled.push(dat[i]*s+m);
    }
    return dat_scaled;
}

function drawResponseCharts() {
    var vis = Number(document.getElementById("vis").value);
    var offspring_color = 'rgba(255,0,0,' + vis + ')';
    var pop_color = 'rgba(0,0,255,1)';
    var breed_color = 'rgba(0,125,125,1)';
    var s = Number(document.getElementById("s_val").value);
    var h2 = Number(document.getElementById("h2_val").value);
    var curves = makeCurves(s, h2);
    var breed_mean = 100 + s;
    var resp_mean = 100 + h2*s;
    
    var pop_trace = {
        x: curves.pop_x,
        y: curves.pop_y,
        mode: 'lines',
        type: 'scatter',
        name: 'Population',
        line: {
            color: pop_color
        }
    }
    
    var breeder_trace = {
        x: curves.breed_x,
        y: curves.breed_y,
        mode: 'lines',
        type: 'scatter',
        name: 'Breeders',
        line: {
            color: breed_color
        }
    }
    
    var response_trace = {
        x: curves.response_x,
        y: curves.response_y,
        mode: 'lines',
        type: 'scatter',
        name: 'Offspring',
        line: {
            color: offspring_color
        }
    }
    
    var layout = {
        title: 'Distribution of body lengths',
        xaxis: {
            title: 'Length',
            range: [60,180]
        },
        shapes: [
        {
            type: 'line',
            x0: 100,
            x1: 100,
            y0: 0,
            y1: 40,
            line: {color: pop_color}
        },
        {
            type: 'line',
            x0: 100 + s,
            x1: 100 + s,
            y0: 0,
            y1: 20,
            line: {color: breed_color}
        },
        {
            type: 'line',
            x0: 100 + h2*s,
            x1: 100 + h2*s,
            y0: 0,
            y1: 40,
            line: {
                color: offspring_color
            }
        },
        {
            type: 'polyline',
            path: 'M 100 43 L 100 46 L' + breed_mean + ' 46 L ' + breed_mean + ' 43',
            line: {
                color: 'black'
            }
                
        },
        {
            type: 'polyline',
            path: 'M 100 51 L 100 54 L' + resp_mean + ' 54 L ' + resp_mean + ' 51',
            line: {
                color: 'green'
            }
                
        }
        ],
          annotations: [
            {
                x: (100 + breed_mean)/2,
                y: 43,
                xref: 'x',
                yref: 'y',
                text: 'S',
                showarrow: false
            },
            {
                x: (100 + resp_mean)/2,
                y: 51,
                xref: 'x',
                yref: 'y',
                text: 'R',
                showarrow: false
            }

        ]
    }
    
    Plotly.newPlot('parent_div', [pop_trace, breeder_trace, response_trace], layout);
}

function makeCurves(s, h2) {
    var curves = {pop_x: [], pop_y: [], breed_x: [], breed_y: [], response_x: [], response_y: []};
    var init = 60;
    for (var i = 0; i < 101; i++) {
        init = init + 80/100;
        curves.pop_x.push(init);
        curves.pop_y.push(1000*jStat.normal.pdf(curves.pop_x[i], 100, 10));
        curves.breed_x.push(init + s);
        curves.breed_y.push(500*jStat.normal.pdf(curves.breed_x[i], 100+s, 10));
        curves.response_x.push(init + h2*s);
        curves.response_y.push(1000*jStat.normal.pdf(curves.response_x[i], 100+h2*s, 10));
    }
    return curves;
}
