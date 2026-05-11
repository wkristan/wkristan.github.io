var rand_x = randDataOneVar(1000, 0, 1);
var rand_y = randDataOneVar(1000, 0, 1);

function drawCharts() {
    drawHeritabilityChart();
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
    

    var layout = {
        title: '1,000 parent/offspring measurements',
        xaxis: {
            title: 'Parent length',
            range: [60,140]
        },
        yaxis: {
            title: 'Offspring length',
            range: [60, 140]
        }
    }
    
    Plotly.newPlot('chart_div', [scatter], layout);
       

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

