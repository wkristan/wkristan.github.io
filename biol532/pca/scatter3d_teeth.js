function drawPlot() {

var xvar = document.getElementById("xvar").value;
var yvar = document.getElementById("yvar").value;
var zvar = document.getElementById("zvar").value;
var color_var = document.getElementById("color_var").value;
var size_var = document.getElementById("size_var").value;

var maxsize = Math.max.apply(Math,teeth[size_var]);
var minsize = Math.min.apply(Math,teeth[size_var]);
var maxcolor = Math.max.apply(Math,teeth[color_var]);
var mincolor = Math.min.apply(Math, teeth[color_var]);

var sizes = [];
var colors = [];

var n = teeth.tooth_num.length;

var size_color = [];

for (i = 0; i < n; i++) {
    var toothsize = (teeth[size_var][i] - minsize)/(maxsize-minsize);
    sizes.push(4 + toothsize * 15);
    var toothcolor = (teeth[color_var][i] - mincolor)/(maxcolor-mincolor);
    toothred = Math.round(255 - toothcolor*255);
    toothgreen = Math.round(toothcolor*255);
    colors.push('rgb(' + toothred + ',' + toothgreen + ', 0)');
    size_color.push([teeth[size_var][i], teeth[color_var][i]]);
}


var trace1 = {
	x: teeth[xvar], y: teeth[yvar], z: teeth[zvar],
        customdata: size_color,
	mode: 'markers',
	marker: {
            size: sizes,
            color: colors,
            opacity: 1},
        name: 'Data',
        type: 'scatter3d',
        showlegend: false,
        hovertemplate: '<br><i>'+xvar+'</i>: %{x}' +
                        '<br><i>'+yvar+'</i>: %{y}' +
                        '<br><i>'+zvar+'</i>: %{z}' +
                        '<br><i>'+color_var+'</i>: %{customdata[1]}' +
                        '<br><i>'+size_var+'</i>: %{customdata[0]}'
};


var data = [];

data.push(trace1);


var layout = {
    hoverlabel: {
        bgcolor: "rgb(255,255,255)"
    },
    scene: {
        aspectmode: 'cube',
        xaxis:{title: xvar, showspikes: false},
        yaxis:{title: yvar, showspikes: false},
        zaxis:{title: zvar, showspikes: false},
    },
    margin: {
	l: 50,
	r: 50,
	b: 50,
	t: 50
        },

};

Plotly.newPlot('scatter3d_div', data, layout);

};

