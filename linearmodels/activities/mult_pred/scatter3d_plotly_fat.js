SCATTER3D = document.getElementById("scatter3d_div");

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
}


var data = [];

data.push(trace1);
data.push(trace2);

var layout = {
    scene: {
        xaxis:{title: 'Food intake', showspikes: false},
        yaxis:{title: 'Initial weight.', showspikes: false},
        zaxis:{title: 'Fat mass', showspikes: false},
    },
    margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 0
        }
};

Plotly.newPlot('scatter3d_fat_div', data, layout);
});
