SCATTER3D = document.getElementById("scatter3d_div");

Plotly.d3.csv('https://wkristan.github.io/gapminder.csv', function(err, rows){
function unpack(rows, key) {
	return rows.map(function(row)
	{ return row[key]; });}

var trace1 = {
	x: unpack(rows, 'logGDP'), y: unpack(rows, 'logPop Density'), z: unpack(rows, 'Life expectancy'),
	mode: 'markers',
    text: unpack(rows, 'Country'),
	marker: {
		size: 4,
        color: 'red',
		opacity: 1},
    name: 'Density and GDP',
	type: 'scatter3d',
    hoverinfo: 'text',
    showlegend: false
};

var trace2 = {
    x:[4.539,10.940],
    y:[0.522,8.800],
    z:[[47.89,80.52],
    [57.14,89.76]],
    type: 'surface',
    colorscale: 'Greens',
    showscale: false,
    opacity: 0.85,
    hoverinfo: 'none',
}

var residuals = [];

for (var i = 0; i < trace1.x.length; i++) {
    var predicted = 24.168 + 5.09*trace1.x[i] + 1.12*trace1.y[i];
    var the_color = 'purple';
    if (predicted < trace1.z[i]) {
        the_color = 'fuchsia';
    }
    var trace3 = {
        x:[trace1.x[i],trace1.x[i]],
        y:[trace1.y[i],trace1.y[i]],
        z:[trace1.z[i],predicted],
        type: 'scatter3d',
        mode: 'lines',
        line: {color: the_color},
        showlegend: false,
        hoverinfo: 'none',
    }
    residuals.push(trace3);
}


var data = [];

for (var i = 0; i < trace1.x.length; i++) {
    data.push(residuals[i]);
}

data.push(trace1);
data.push(trace2);

var layout = {
    scene: {
        xaxis:{title: 'Log GDP', showspikes: false},
        yaxis:{title: 'Log Pop. Dens.', showspikes: false},
        zaxis:{title: 'Life Expect.', showspikes: false},
    },
    margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 0
        },
};

Plotly.newPlot('scatter3d_div', data, layout);
});


