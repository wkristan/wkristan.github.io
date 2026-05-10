
function drawChart() {
    var data = randData();
    var mean = meanDat(data);
    
    var trace = {
        x: data.x,
        y: data.y,
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'red',
            size: 10
        }
    }
    
    var layout = {
        title: "A sample of<br>20 body temperatures",
        margin: {
            b: 10
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            range: [0.9,1.1],
            showticklabels: false
        },
        yaxis: {
            range: [35,39],
            title: 'Body temperature'
            
        }
    }
    
    Plotly.newPlot('chart_div', [trace], layout);

    document.getElementById("mean").innerHTML = "Sample mean = " + mean.toFixed(2);
}
      
function randData(){
       var dat = {x: [], y: []};
       var j = 0;
       for(var i=0; i<20; i++){
            j = jStat.normal.sample(37, 0.3);
            dat.x.push(1);
            dat.y.push(j);
       }
       return dat;
    }
    
function meanDat(dat) {
    var tot = 0;
    for(var i = 0;i<20;i++){
        tot = tot + dat.y[i];
    }
    var mean = tot/20;
    return mean;
}
