function drawPlot() {
    drawDataPlot();
    drawPcaPlot();
}


function drawDataPlot() {


var trace1 = {
	x: bumpus.humerus, y: bumpus.femur, z: bumpus.tibiotarsus,
	mode: 'markers',
    name: 'Data',
    type: 'scatter3d',
    showlegend: false,
    hovertemplate: '<br><i>Humerus:</i> %{x: .3f}' +
                    '<br><i>Femur:</i> %{y:.3f}' +
                    '<br><i>Tibiotarsus:</i> %{z:.3f}',
    marker: {
        opacity: 0.6
    }
};

var pca1 = {
    x: [-4.5*0.573,4.6*0.573], y: [-4.5*0.588,4.6*0.588], z: [-4.5*0.57,4.6*0.57],
    mode: 'lines',
    name: 'PCA1',
    type: 'scatter3d',
    visible: 'legendonly',
    line: {
        width: 12
    },
    hovertemplate: '<i>Humerus:</i> %{x: .3f}' +
                    '<br><i>Femur:</i> %{y:.3f}' +
                    '<br><i>Tibiotarsus:</i> %{z:.3f}',
}

var pca2 = {
    x: [2*0.675,-2*0.675], y: [2*0.055,-2*0.055], z: [-2*0.735,2*0.735],
    mode: 'lines',
    name: 'PCA2',
    type: 'scatter3d',
    visible: 'legendonly',
    line: {
        width: 8
    },
    hovertemplate: '<i>Humerus:</i> %{x: .3f}' +
                    '<br><i>Femur:</i> %{y:.3f}' +
                    '<br><i>Tibiotarsus:</i> %{z:.3f}',
}

var pca3 = {
    x: [1.5*0.464,-1.5*0.464], y: [-1.5*0.807,1.5*0.807], z: [1.5*0.366,-1.5*0.366],
    mode: 'lines',
    name: 'PCA3',
    type: 'scatter3d',
    visible: 'legendonly',
    line: {
        width: 4
    },
    hovertemplate: '<i>Humerus:</i> %{x: .3f}' +
                    '<br><i>Femur:</i> %{y:.3f}' +
                    '<br><i>Tibiotarsus:</i> %{z:.3f}',
}



var data = [];

data.push(trace1);
data.push(pca1);
data.push(pca2);
data.push(pca3);


var layout = {
    hoverlabel: {
        bgcolor: "rgb(255,255,255)"
    },
    scene: {
        aspectmode: 'cube',
        xaxis:{title: 'Humerus', showspikes: false},
        yaxis:{title: 'Femur', showspikes: false},
        zaxis:{title: 'Tibiotarsus', showspikes: false},
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


function drawPcaPlot() {


var trace1 = {
	x: scores.PCA1, y: scores.PCA2, z: scores.PCA3,
	mode: 'markers',
    name: 'Data',
    type: 'scatter3d',
    showlegend: false,
    marker: {
        opacity: 0.6
    },
    text: scores.pttext,
    hovertemplate: '<b>' + '%{text}' + '</b>'
};

var humerus = {
    x: loadings.humerus.x, y: loadings.humerus.y, z: loadings.humerus.z,
    mode: 'lines+text',
    name: 'Humerus',
    type: 'scatter3d',
    line: {
        width: 8
    },
    text: ['','Humerus'],
    textfont: {
        size: 18
    },
    showlegend: false,
    showarrow: true
}

var femur = {
    x: loadings.femur.x, y: loadings.femur.y, z: loadings.femur.z,
    mode: 'lines+text',
    name: 'Femur',
    type: 'scatter3d',
    line: {
        width: 8
    },
    text: ['','Femur'],
    textfont: {
        size: 18
    },
    showlegend: false
}

var tibiotarsus = {
    x: loadings.tibiotarsus.x, y: loadings.tibiotarsus.y, z: loadings.tibiotarsus.z,
    mode: 'lines+text',
    name: 'Tibiotarsus',
    type: 'scatter3d',
    line: {
        width: 8
    },
    text: ['','Tibiotarsus'],
    textfont: {
        size: 18
    },
    showlegend: false
}



var data = [];

data.push(trace1);
data.push(humerus);
data.push(femur);
data.push(tibiotarsus);


var layout = {
    hoverlabel: {
        bgcolor: "rgb(255,255,255)"
    },
    scene: {
        aspectmode: 'cube',
        xaxis:{title: 'PCA1', showspikes: false},
        yaxis:{title: 'PCA2', showspikes: false},
        zaxis:{title: 'PCA3', showspikes: false}
    },
    margin: {
	l: 50,
	r: 50,
	b: 50,
	t: 50
        }

};

Plotly.newPlot('scatter3d_scores_div', data, layout);

};
