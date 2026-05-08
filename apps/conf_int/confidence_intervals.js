

function readOnLoad() {
    drawChart(1000, 0.95);
}

function drawChart(df, cl) {
    
        var thecurves = curves(df, cl);
        var critval = jStat.studentt.inv(cl + (1-cl)/2, df);
        var se = 7.24/Math.sqrt(df + 1);
        var critval_scaled = critval * se;
        var ul = 72.4 + critval_scaled;
        var ll = 72.4 - critval_scaled;
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
            title: 'To have ' + cl * 100 +'% confidence of including &mu; with df = ' + df + ' go <br>' + critval.toFixed(3) + ' se above and below x&#772;',
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

       var trace1_scaled = {
            x: thecurves.t_scaled.t,
            y: thecurves.t_scaled.tdist,
            type: "scatter",
            mode: "lines",
            line: {
                color: "red"
            }
        }

        var trace2_scaled = {
            x: thecurves.t_scaled.t,
            y: thecurves.t_scaled.tfill,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgba(255,0,0,0.5)',
        }

        var layout_scaled = {
            showlegend: false,
            title: 'Multiplying t by s<sub>x&#772;</sub> (' + se.toFixed(3) + ') puts the x-axis in data units<br>(myoglobin concentration)',
            xaxis: {
                title: 'Myoglobin (difference from mean)'
            },
            yaxis: {
                title: 'Probability density'
            },
            annotations: [{
                x: critval_scaled,
                y: ht_critval,
                xref: 'x',
                yref: 'y',
                text: 'Uncertainty:<br>t s<sub>x&#772;</sub> = ' + critval_scaled.toFixed(3),
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40

            }]
        }
        
       var trace1_centered = {
            x: thecurves.t_centered.t,
            y: thecurves.t_centered.tdist,
            type: "scatter",
            mode: "lines",
            line: {
                color: "red"
            }
        }

        var trace2_centered = {
            x: thecurves.t_centered.t,
            y: thecurves.t_centered.tfill,
            fill: "tozeroy",
            type: "scatter",
            mode: "none",
            fillcolor: 'rgba(255,0,0,0.5)',
        }

        var layout_centered = {
            showlegend: false,
            title: 'Adding x&#772; centers the distribution over the mean',
            xaxis: {
                title: 'Myoglobin'
            },
            yaxis: {
                title: 'Probability density'
            },
            annotations: [{
                x: 72.4 + critval_scaled,
                y: ht_critval,
                xref: 'x',
                yref: 'y',
                text: 'Upper limit<br> x&#772; +' + critval_scaled.toFixed(2),
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40

            },
            {
                x: 72.4 - critval_scaled,
                y: ht_critval,
                xref: 'x',
                yref: 'y',
                text: 'Lower limit <br>x&#772;-' + critval_scaled.toFixed(2),
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40

            },
            {
                    // Horizontal positioning (CI Bounds)
                x: 72.4 - critval_scaled,          // Lower 95% CI bound
                ax: 72.4 + critval_scaled,         // Upper 95% CI bound
                xref: 'x',
                axref: 'x',

                // Vertical positioning (Below Axis)
                y: ht_critval,         // -0.15 is roughly 15% of plot height below axis
                ay: ht_critval,        // Must match 'y' to keep the line perfectly horizontal
                yref: 'y',
                ayref: 'y',

                // Arrow Styling
                showarrow: true,
                arrowside: 'start+end', // Double-ended arrow for the interval
                arrowhead: 5,
                arrowsize: 1,
                arrowwidth: 2,
                arrowcolor: '#636efa',
                valign: 'top'
            },
            {
                x: 72.4,
                y: ht_critval + 0.02,
                xref: 'x',
                yref: 'y',
                text: 'x&#772;',
                showarrow: false,
                ax: 0,
                ay: 0
            }
            ]
        }


        Plotly.newPlot('chart_div', [trace2,trace1], layout);
        Plotly.newPlot('chart_scaled', [trace1_scaled, trace2_scaled], layout_scaled);
        Plotly.newPlot('chart_scaled_and_centered', [trace1_centered, trace2_centered], layout_centered);

        document.getElementById("stderror").innerHTML = se.toFixed(3);
        document.getElementById("samplesize").innerHTML = df + 1;
        document.getElementById("uncert1").innerHTML = critval_scaled.toFixed(3);
        document.getElementById("uncert2").innerHTML = critval_scaled.toFixed(3);
        document.getElementById("upperlim").innerHTML = ul.toFixed(3);
        document.getElementById("lowerlim").innerHTML = ll.toFixed(3);


      }
      
      
function curves(df, cl) {
       var tdist = {t: [], tdist: [], tfill: []};
       var tscaled = {t: [], tdist: [], tfill: []};
       var tcentered = {t: [], tdist: [], tfill: []}
       var t_crit = jStat.studentt.inv(1-(1-cl)/2, df);
       var j = -6;
       var k = 0;
       var m = 0;
       var se = 7.24/Math.sqrt(df + 1)
       for(var i=0; i<501; i++) {
            j = j + 12/500;
            m = jStat.studentt.pdf(j,df);
            tdist.t.push(j);
            tdist.tdist.push(m);
            tscaled.t.push(j * se);
            tscaled.tdist.push(m);
            tcentered.t.push(j * se + 72.4);
            tcentered.tdist.push(m);
            if (-t_crit < j && j < t_crit) {
                tdist.tfill.push(m);
                tscaled.tfill.push(m);
                tcentered.tfill.push(m);
            } else {
                tdist.tfill.push(null);
                tscaled.tfill.push(null);
                tcentered.tfill.push(null);
            }
       }
       
       var dat = {t: tdist, t_scaled: tscaled, t_centered: tcentered};

       return dat;
    };
   
    
function setTDist(cellclicked) {
    var rowofclicked = cellclicked.parentNode;
    var df = Number(rowofclicked.cells[0].innerHTML);
    var clevels = [null, 0.8, 0.9, 0.95, 0.98, 0.99];
    var cl = clevels[cellclicked.cellIndex];
    drawChart(df, cl);
}

