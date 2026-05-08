

function readOnLoad() {
    drawChart(1000, 0.95);
}

function drawChart(df, cl) {
    
        var thecurves = curves(df, cl);
        var critval = jStat.studentt.inv(cl + (1-cl)/2, df);
        var ht_critval = jStat.studentt.pdf(critval,df);
        
        var trace1 = {
            x: thecurves.t.t,
            y: thecurves.t.tdist,
            type: "scatter",
            mode: "lines",
            line: {
                color: "red"
            }
        }
        
        var trace2 = {
            x: thecurves.t.t,
            y: thecurves.t.tfill,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgba(255,0,0,0.5)',
        }
        
        var layout = {
            showlegend: false,
            xaxis: {
                title: 't-value'
            },
            yaxis: {
                title: 'Probability density'
            },
            annotations: [{
                x: critval,
                y: ht_critval,
                xref: 'x',
                yref: 'y',
                text: 'Crit. t-value: ' + critval.toFixed(3),
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40

            }]
        }
        
        Plotly.newPlot('chart_div', [trace2,trace1], layout)


      }
      
      
function curves(df, cl) {
       var tdist = {t: [], tdist: [], tfill: []};
       var t_crit = jStat.studentt.inv(1-(1-cl)/2, df);
       var j = -6;
       var k = 0;
       var m = 0;
       for(var i=0; i<501; i++) {
            j = j + 12/500;
            m = jStat.studentt.pdf(j,df);
            tdist.t.push(j);
            tdist.tdist.push(m);
            if (-t_crit < j && j < t_crit) {
                tdist.tfill.push(m);
            } else {
                tdist.tfill.push(null);
            }
       }
       document.getElementById("df").innerHTML = df;
       document.getElementById("cl").innerHTML = cl * 100 + "%";
       
       var dat = {t: tdist};

       return dat;
    };
   
    
function setTDist(cellclicked) {
    var rowofclicked = cellclicked.parentNode;
    var df = Number(rowofclicked.cells[0].innerHTML);
    var clevels = [null, 0.8, 0.9, 0.95, 0.98, 0.99];
    var cl = clevels[cellclicked.cellIndex];
    drawChart(df, cl);
}

