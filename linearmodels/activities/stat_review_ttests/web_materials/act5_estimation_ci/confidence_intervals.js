
function drawChart1() {
        var n = Number(document.getElementById("n_confint").value);
        var sample_means = samplePopCI(n);
        
        var trace1 = {
            x: sample_means.x_in,
            y: sample_means.y_in,
            error_y: {
                type: 'data',
                array: sample_means.uncert_in,
                visible: true,
                color: 'black',
                width: 0
            },
            mode: 'markers',
            marker: {
                color: 'black'
            },
            type: 'scatter',
            showlegend: false
        };
        
        var trace2 = {
            x: sample_means.x_out,
            y: sample_means.y_out,
            error_y: {
                type: 'data',
                array: sample_means.uncert_out,
                visible: true,
                color: 'red',
                width: 0
            },
            mode: 'markers',
            marker: {
                color: 'red',
                size: 10
            },
            type: 'scatter',
            showlegend: false
        }

        var data = [trace1, trace2];
        
        var layout = {
            yaxis: {range: [2489, 4289]},
            shapes: [
            {type: 'line',
            x0: 0,
            y0: 3389,
            x1: 100,
            y1: 3389,
            line: {
                color: '#0000FF',
                width: 4
            }
            }]
        }
        
        Plotly.newPlot("chart_div1", data, layout);
        

      }


function samplePopCI(n) {
    var data_point = 0;
    var t_crit = jStat.studentt.inv(0.975, n - 1);
    var data_obj = {x_in: [], y_in: [], uncert_in: [], x_out: [], y_out: [], uncert_out: []};
    for (var i = 1; i < 101; i++){
        var the_sample = [];
        for (var j = 0; j < n; j++){
            data_point = jStat.normal.sample(3389, 466);
            the_sample.push(data_point);
        }
        var mean_tmp = jStat.mean(the_sample);
        var stderr_tmp = jStat.stdev(the_sample, true)/Math.sqrt(n);
        var uncert = t_crit * stderr_tmp;
    
        if (uncert > Math.sqrt((mean_tmp - 3389)*(mean_tmp - 3389))) {
            data_obj.x_in.push(i);
            data_obj.y_in.push(mean_tmp);
            data_obj.uncert_in.push(uncert);
        } else {
            data_obj.x_out.push(i);
            data_obj.y_out.push(mean_tmp);
            data_obj.uncert_out.push(uncert);
        }

    }
    return data_obj;
}

