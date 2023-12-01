SCATTER3D = document.getElementById("scatter3d_div");

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}

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
        the_color = 'goldenrod';
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


Plotly.d3.csv('https://wkristan.github.io/gapminder.csv', function(err, rows){
function unpack(rows, key) {
	return rows.map(function(row)
	{ return row[key]; });}
	
mm = unpack(rows,'Maternal mortality');
tb = unpack(rows,'TB');
sizes = mm;
minsize = getMinOfArray(mm);
maxsize = getMaxOfArray(mm);

for (i = 0; i < mm.length; i++) {
    if (minsize < maxsize) {
        sizes[i] = 40*(mm[i] - minsize)/(maxsize-minsize) + 10;
    } else {
        sizes[i] = 10;
    }
}

lab_text = [];

for (i = 0; i < tb.length; i++) {
    lab_text.push("<br><i>TB</i>: " + tb[i] + "<br><i>MM</i>: " + mm[i].toFixed(2));
}

var trace1 = {
	x: unpack(rows, 'Cholesterol'), y: unpack(rows, 'logGDP'), z: unpack(rows, 'Life expectancy'),
	mode: 'markers',
	marker: {
		size: sizes,
        color: tb,
		opacity: 1},
	type: 'scatter3d',
    text: lab_text,
    hovertemplate: '<i>Chol.</i>: %{x}' +
                    '<br><i>LogGDP</i>: %{y:.2f}' +
                    '<br><i>Life exp.</i>: %{z:.2f}'+
                    '%{text}',
              
    showlegend: false
};


var data = [trace1];


var layout = {
    scene: {
        xaxis:{title: 'Cholesterol', showspikes: false},
        yaxis:{title: 'logGDP.', showspikes: false},
        zaxis:{title: 'Life Expect.', showspikes: false},
    },
    margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 0
        },
};

Plotly.newPlot('scatter3d_cholesterol_div', data, layout);
});


Plotly.d3.csv('https://wkristan.github.io/gapminder.csv', function(err, rows){
function unpack(rows, key) {
	return rows.map(function(row)
	{ return row[key]; });}

var trace1 = {
	x: unpack(rows, 'Babies per woman'), y: unpack(rows, 'Birth rate'), z: unpack(rows, 'Life expectancy'),
	mode: 'markers',
    text: unpack(rows, 'Country'),
	marker: {
		size: 4,
        color: 'red',
		opacity: 1},
    name: 'BPW and BR',
	type: 'scatter3d',
    hoverinfo: 'text',
    showlegend: false
};

var trace2 = {
    x:[1.21,7.12],
    y:[8.1,54.1],
    z:[[80.52,92.05],
    [31.73,37.98]],
    type: 'surface',
    colorscale: 'Greens',
    showscale: false,
    opacity: 0.85,
    hoverinfo: 'none',
}

var data = [trace1, trace2];


var layout = {
    scene: {
        xaxis:{title: 'Babies per woman', showspikes: false},
        yaxis:{title: 'Birth rate', showspikes: false},
        zaxis:{title: 'Life Expect.', showspikes: false},
    },
    margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 0
        },
};

Plotly.newPlot('scatter3d_babies_div', data, layout);
});
