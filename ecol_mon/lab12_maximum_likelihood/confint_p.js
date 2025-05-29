function drawConfIntGraphs() {
    drawPCI();
}


function drawPCI() {
    var pest = Number(document.getElementById("est_of_p").value);
    var n = Number(document.getElementById("n_of_p").value);    
    var puncert = 1.96*Math.sqrt(pest*(1-pest)/n);
    var ul = pest + puncert;
    var ll = pest - puncert;
    
    var error_color = 'black';
    
    if (ul > 1 || ll < 0) {
        error_color = 'red';
    }
    
    var pestTrace = {
        x: ['p'],
        y: [pest],
        type: 'line',
        mode: 'markers',
        marker: {
            size: 12
        },
        error_y: {
            type: 'data',
            array: [puncert],
            color: error_color,
            visible: true
        }
    }
    
    var pestData = [pestTrace];
    
    var pestLayout = {
        title: {
            text: '<b>Wald 95% confidence interval for p̂ = ' + pest + '</b><br><i>LL = ' + ll.toFixed(2) + ', UL = ' + ul.toFixed(2) + '</i>'
        },
        yaxis: {
            range: [-0.1,1.1]
        }
    }
    
    Plotly.newPlot('confint_p_graph', pestData, pestLayout);

}
