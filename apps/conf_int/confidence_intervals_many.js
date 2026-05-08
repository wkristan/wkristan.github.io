var bw_sample = [];

function drawChart1() {
    var n = Number(document.getElementById("n_confint").value);
    var rand_means = samplePopCI(n);
    
    var layout = {
        showlegend: false,
        shapes: [
            {
                type: 'line',
                x0:0,
                x1:100,
                y0:3389,
                y1:3389,
                line: {
                    color: 'gray'
                }
            }
        ],
        yaxis: {
            range: [2500,4500]
        },
        xaxis: {
            range: [0,1001]
        }
        
    };
    
    Plotly.newPlot('chart_div1', rand_means, layout);
        

        

}


function samplePopCI(n) {
    var data_point = 0;
    var t_crit = jStat.studentt.inv(0.975, n - 1);
    var results = [];
    var color = 'black';
    for (var i = 1; i < 1001; i++){
        var the_sample = [];
        for (var j = 0; j < n; j++){
            data_point = jStat.normal.sample(3389, 466);
            the_sample.push(data_point);
        }
        var mean_tmp = jStat.mean(the_sample);
        var stderr_tmp = jStat.stdev(the_sample, true)/Math.sqrt(n);
        var uncert = t_crit * stderr_tmp;
        
        
        if (mean_tmp - uncert >= 3389 || mean_tmp + uncert <= 3389) {
            
            color = 'red';
            
        } else {
            
            color = 'black';
        
        }
        
        var trace_tmp = new makeTrace(i,mean_tmp,uncert,color);
        results.push(trace_tmp);

    }
    
    return results;
}

function makeTrace(i, mean, uncert, color) {
    this.x = [i];
    this.y = [mean];
    this.error_y = {type: 'data', array: [uncert], visible: true, color: color};
    this.type = 'scatter';
    this.mode = 'markers';
    this.marker = {color: color}
}

function sampleBW() {
    var n_bw = document.getElementById("n_bw").value;
    bw_sample = [];
    for (var i = 0; i < n_bw; i++) {
        var index = Math.floor(Math.random()*bw.length);
        bw_sample.push([n_bw, bw[index]]);
    }
    
    drawTable();
}

function drawTable() {
    var table = "<table><tr><th>Sample size</th><th>Birth weight</th></tr>"
    
    for (var CELL of bw_sample) {
        table += "<tr><td>" + CELL[0] + "</td><td>" + CELL[1].toFixed(0) + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("table_div").innerHTML = table;

}

function copySample() {
  /* Get the text field */
    var spreadsheet_text = "";
    for (i = 0; i < bw_sample.length; i++) {
        spreadsheet_text = spreadsheet_text + "n" + bw_sample[i][0] + "\t" + bw_sample[i][1].toFixed(0) + "\n";
    }

   /* Copy the text inside the text field */
    navigator.clipboard.writeText(spreadsheet_text);

}
