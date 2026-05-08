SCATTER3D = document.getElementById("scatter3d_div");

function drawGraphs() {
    drawExample();
    drawKidsHeight();
    drawTreesVolume();
}

function drawExample() {
    ex = {x1: [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4], 
    x2: [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4], 
    y: [10,9,8,7,6,11,10,9,8,7,12,11,10,9,8,13,12,11,10,9,14,13,12,11,10]};
    
    var trace1 = {
        x: ex.x1,
        y: ex.x2,
        z: ex.y,
        mode: 'markers',
        marker: {
            size: 4,
            color: 'red',
            opacity: 1},
        name: 'Example of two predictors',
        type: 'scatter3d',
        showlegend: false
        
    };
    
    var trace2 = {
    x:[0,4],
    y:[0,4],
    z:[[10,14],
    [6,10]],
    type: 'surface',
    colorscale: 'Greens',
    showscale: false,
    opacity: 0.85,
    hoverinfo: 'none',
    showlegend: true,
    visible: 'legendonly',
    name: 'Surface'
}
    
    var data = [trace1,trace2];
    
    var layout = {
        scene: {
            xaxis:{title: 'x1', showspikes: false},
            yaxis:{title: 'x2', showspikes: false},
            zaxis:{title: 'y', showspikes: false},
            aspectratio: {
                x: 1,
                y: 1,
                z: 0.85
            }
        },
        margin: {
            l: 0,
            r: 0,
            b:0,
            t:0
        },
        showlegend: true,
        legend: {
            x: 0,
            xanchor: 'left',
            y: 0
        }
    };
    
    Plotly.newPlot('scatter3d_example_div', data, layout);

    
}


Plotly.d3.csv('https://wkristan.github.io/fat_food.csv', function(err, rows){
function unpack(rows, key) {
	return rows.map(function(row)
	{ return row[key]; });}

var trace1 = {
	x: unpack(rows, 'Food.intake'), y: unpack(rows, 'Initial.weight'), z: unpack(rows, 'Fat.mass'),
	mode: 'markers',
	marker: {
		size: 4,
        color: 'red',
		opacity: 1},
    name: 'Fat mass of mice',
    type: 'scatter3d',
    showlegend: false
};

var trace2 = {
    x:[3,4],
    y:[13,37.3],
    z:[[5.8,6.13],
    [10.78,11.12]],
    type: 'surface',
    colorscale: 'Greens',
    showscale: false,
    opacity: 0.85,
    hoverinfo: 'none',
    showlegend: true,
    visible: 'legendonly',
    name: 'Predicted fat'
}


var data = [];

data.push(trace1);
data.push(trace2);

var layout = {
    scene: {
        xaxis:{title: 'Food intake', showspikes: false},
        yaxis:{title: 'Initial weight.', showspikes: false},
        zaxis:{title: 'Fat mass', showspikes: false},
        aspectratio: {
            x: 1,
            y: 1,
            z: 0.85
        }
    },
    margin: {
        l: 0,
        r: 0,
        b:0,
        t:0
    },
    showlegend: true,
    legend: {
        x: 0,
        xanchor: 'left',
        y: 0
    }
};

Plotly.newPlot('scatter3d_fat_div', data, layout);
});

function drawKidsHeight() {
    kids = {height: [129.44,129.46,131.81,130.54,130.73,134.31,134.07,135.27,135.24,137.21,137.66,137.88,141.74,142.28,141.71,144.73,145.88,145.5,144.3,145.23,145.66,146.06,148.19,151.27,149.4,150.62,153.26,156.84,155.97,155,157.13,158.04], 
    ama: [10.31,10.77,10.16,11.73,12.2,11.4,11.8,13.39,12.3,14.49,14.41,13.83,14.71,15.11,14.9,15.93,16.24,16.47,17.73,17.89,17.81,18.62,18.66,18.99,19.06,19.38,20.72,20.67,21.72,20.78,21.85,22.62], 
    years: [5,5.2,5.4,5.6,5.8,6,6.2,6.4,6.6,6.8,7,7.2,7.4,7.6,7.8,8,8.2,8.4,8.6,8.8,9,9.2,9.4,9.6,9.8,10,10.2,10.4,10.6,10.8,11,11.2]};
    
    var trace1 = {
        x: kids.height,
        y: kids.years,
        z: kids.ama,
        mode: 'markers',
        marker: {
            size: 4,
            color: 'red',
            opacity: 1},
        name: 'Kids maths scores',
        type: 'scatter3d',
        showlegend: false
        
    };
    
    var trace2 = {
    x:[129.4,158],
    y:[5,11.2],
    z:[[10.03,9.69],
    [22.59,22.24]],
    type: 'surface',
    colorscale: 'Greens',
    showscale: false,
    opacity: 0.85,
    hoverinfo: 'none',
    showlegend: true,
    visible: 'legendonly',
    name: 'Predicted test score'
}
    
    var data = [trace1, trace2];
    
    var layout = {
        scene: {
            xaxis:{title: 'Height', showspikes: false},
            yaxis:{title: 'Age (years)', showspikes: false},
            zaxis:{title: 'Math score (AMA)', showspikes: false},
            aspectratio: {
                x: 1,
                y: 1,
                z: 0.85
            }
        },
        margin: {
            l: 0,
            r: 0,
            b:0,
            t:0
        },
        showlegend: true,
        legend: {
            x: 0,
            xanchor: 'left',
            y: 0
        }
    };
    
    Plotly.newPlot('scatter3d_math_div', data, layout);

    
}


function drawTreesVolume() {
    trees = {height: [70,65,63,72,81,83,66,75,80,75,79,76,76,69,75,74,85,86,71,64,78,80,74,72,77,81,82,80,80,80,87], 
    diameter: [0.6917,0.7167,0.7333,0.875,0.8917,0.9,0.9167,0.9167,0.925,0.9333,0.9417,0.95,0.95,0.975,1,1.075,1.075,1.1083,1.1417,1.15,1.1667,1.1833,1.2083,1.3333,1.3583,1.4417,1.4583,1.4917,1.5,1.5,1.7167], 
    volume: [10.3,10.3,10.2,16.4,18.8,19.7,15.6,18.2,22.6,19.9,24.2,21,21.4,21.3,19.1,22.2,33.8,27.4,25.7,24.9,34.5,31.7,36.3,38.3,42.6,55.4,55.7,58.3,51.5,51,77]};
    
    var trace1 = {
        x: trees.height,
        y: trees.diameter,
        z: trees.volume,
        mode: 'markers',
        marker: {
            size: 4,
            color: 'red',
            opacity: 1},
        name: 'Trees',
        type: 'scatter3d',
        showlegend: false
        
    };

    var trace2 = {
    x:[63,87],
    y:[0.6917,1.7167],
    z:[[2.46,10.61],
    [60.38,68.52]],
    type: 'surface',
    colorscale: 'Greens',
    showscale: false,
    opacity: 0.85,
    hoverinfo: 'none',
    showlegend: true,
    visible: 'legendonly',
    name: 'Predicted volume'
}
    
    var data = [trace1, trace2];
    
    var layout = {
        scene: {
            xaxis:{title: 'Height', showspikes: false},
            yaxis:{title: 'Diameter', showspikes: false},
            zaxis:{title: 'Volume', showspikes: false},
            aspectratio: {
                x: 1,
                y: 1,
                z: 0.85
            }
        },
        margin: {
            l: 0,
            r: 0,
            b:0,
            t:0
        },
        showlegend: true,
        legend: {
            x: 0,
            xanchor: 'left',
            y: 0
        }
    };
    
    Plotly.newPlot('scatter3d_tree_div', data, layout);

    
}
