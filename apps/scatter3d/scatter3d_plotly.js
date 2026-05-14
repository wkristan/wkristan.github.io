var rows = [];

onOpenDrawPlot();

function onOpenDrawPlot() {
    getDataSet();
    var varnames = Object.keys(rows[0]);
    rows.shift();
    setVarNames(varnames);
    drawPlot();
}

function changeDataDrawPlot() {
    getDataSet();
    var varnames = Object.keys(rows[0]);
    rows.shift();
    setVarNames(varnames);
    drawPlot();
};

function drawPlot() {

var varnames = Object.keys(rows[0]);
var xvar = document.getElementById("x_axis").value;
var yvar = document.getElementById("y_axis").value;
var zvar = document.getElementById("z_axis").value;
var color_var = document.getElementById("color_var").value;
var size_var = document.getElementById("size_var").value;


var data_values = {x: [], y: [], z: [], color: [], size:[], pt_text:[]};

for (i = 0; i< rows.length; i++) {
    data_values.x.push(Number(rows[i][xvar]));
    data_values.y.push(Number(rows[i][yvar]));
    data_values.z.push(Number(rows[i][zvar]));
    data_values.color.push(Number(rows[i][color_var]));
    data_values.size.push(Number(rows[i][size_var]));
    var label = rows[i][varnames[0]];
    data_values.pt_text.push(label + "<br>" + xvar + ":" + data_values.x[i] + "<br>" + yvar + ":" + data_values.y[i] + "<br>" + zvar + ":" + data_values.z[i] + "<br>" + color_var + ":" + data_values.color[i] + "<br>" + size_var + ":" + data_values.size[i]);
}

var sizes = data_values.size;
var maxsize = getMaxOfArray(sizes);
var minsize = getMinOfArray(sizes);

for (i = 0; i < data_values.size.length; i++) {
    if (minsize < maxsize) {
        data_values.size[i] = 40*(sizes[i] - minsize)/(maxsize-minsize) + 10;
    } else {
        data_values.size[i] = 10;
    }
}


var trace1 = {
	x: data_values.x, y: data_values.y, z: data_values.z,
	mode: 'markers',
	marker: {
		size: data_values.size,
        color: data_values.color,
		opacity: 1},
        name: 'Data',
        text: data_values.pt_text,
        type: 'scatter3d',
        hoverinfo: 'text',
        showlegend: false
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



function setVarNames(varnames) {
    
    var select_buttons = ["x_axis","y_axis","z_axis","color_var","size_var"];
    var button_locations = ["put_x_axis_here","put_y_axis_here","put_z_axis_here","put_color_var_here","put_size_var_here"];
    
    for(var i = 0; i < 5; i++) {
        var old_x = document.getElementById(select_buttons[i]);
        if (old_x != null) {
            old_x.parentNode.removeChild(old_x);
        }
    }
    
    
    for (var i = 0; i < 5; i++) {
        var x = document.createElement("SELECT");
        x.setAttribute("id",select_buttons[i]);
        x.setAttribute("onchange","drawPlot()");
        var whereto = document.getElementById(button_locations[i]);
        whereto.appendChild(x);    

    for (var j = 1; j < varnames.length; j++) {
        var z = document.createElement("option");
        z.setAttribute("value",varnames[j]);
        var t = document.createTextNode(varnames[j]);
        z.appendChild(t);
        x.appendChild(z);
        }
    }
    
    x = document.getElementById("x_axis");
    x.value = varnames[1];
    y = document.getElementById("y_axis");
    y.value = varnames[2];
    z = document.getElementById("z_axis");
    z.value = varnames[3];

    none_option = document.createElement("option");
    none_option.setAttribute("value","None");
    t = document.createTextNode("None");
    none_option.appendChild(t)
    color = document.getElementById("color_var");
    color.appendChild(none_option);
    color.value = "None";
    
    
    none_option = document.createElement("option");
    none_option.setAttribute("value","None");
    t = document.createTextNode("None");
    none_option.appendChild(t)    
    size = document.getElementById("size_var");
    size.appendChild(none_option);
    size.value = "None";
        
    
}



function getDataSet() {
        
    var dataset_name = document.getElementById("dataset").value;
    
    rows = [];
    var varnames = datasets[dataset_name][0];
    
    for (i = 0; i < datasets[dataset_name].length; i++) {
        rows[i] = new Object();
        for (j = 0; j < varnames.length; j++) {
            rows[i][varnames[j]] = datasets[dataset_name][i][j];
        }
    }

    
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}

