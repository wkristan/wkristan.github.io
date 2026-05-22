var shells = {
shelltype: ["red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","red","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black","black"],
linecol: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
minoraxis:[25.78,29.05,25.52,27.78,24.4,24.24,23.95,22.62,25.94,23.2,23.25,26.65,23.54,26.44,26.95,21.76,28.71,20.45,26.51,21.52,28.62,22.05,25.1,23.3,22.64,21.52,24.15,23.71,27.17,23.95,23.25,25.93,23.4,25.67,23.53,23.89,25.86,21.77,26.8,23.24,24.43,20.89,22.37,22.28,25.99,22.84,20.3,17.31,23.55,19.2,22.06,22.6,21.29,21.59,23.67,23.02,19.16,21.47,18.83,21,16.99,21.11,18.51,19.43,17.9,19.09,22.22,22.11,21.2,21.88,19.35,23.08,20.58,20.42,19.78,23.31],
width:[7.22,9.34,6.98,8.92,7.86,6.97,7.57,6.45,7.41,6.45,6.17,7.39,6.47,8.7,8.24,5.87,9.29,5.9,9.47,6.7,8.35,5.87,8.33,6.78,6.35,6.61,6.87,6.21,9.08,6.87,6.95,7.14,6.45,7.83,7.25,6.94,8.09,5.85,8.13,6.48,6.22,5.46,6.35,6.11,8.12,6.23,8.4,7.08,10.03,8.43,9.61,9.86,10,9.64,10.65,10.36,8.3,9.18,7.8,9.18,6.77,9.25,7.85,8.68,7.47,7.63,8.82,9.94,9.3,9.29,7.85,9.27,9.02,8.61,8.2,9.67]};

var scores = {
ld1:[-5.27,-4.27,-5.5,-3.79,-2.37,-4.12,-2.5,-3.47,-5.03,-4.1,-4.77,-5.86,-4.43,-2.79,-4.35,-3.78,-4.01,-2.28,-1.2,-1.72,-5.94,-4.1,-2.12,-3.5,-3.71,-1.91,-4.24,-5.18,-2.77,-4.02,-3.08,-5.61,-4.32,-3.83,-2.73,-3.8,-3.47,-3.83,-4.42,-4.08,-5.95,-3.71,-3.41,-3.83,-3.55,-4.19,3.3,3.73,3.26,4.57,3.99,3.94,5.68,4.57,4.47,4.56,4.34,3.71,3.62,4.22,3.41,4.25,4.08,4.86,3.92,2.96,2.1,4.65,4.26,3.49,3.15,2.13,4.34,3.62,3.44,2.75],
pc1: [-2.78,-6.18,-2.5,-4.89,-1.44,-1.22,-0.97,0.43,-2.95,-0.15,-0.18,-3.66,-0.49,-3.53,-4.01,1.32,-5.84,2.63,-3.65,1.51,-5.69,1.04,-2.17,-0.27,0.41,1.51,-1.13,-0.64,-4.29,-0.93,-0.23,-2.92,-0.35,-2.71,-0.53,-0.87,-2.91,1.32,-3.85,-0.19,-1.36,2.22,0.68,0.79,-3.05,0.22,2.61,5.68,-0.74,3.71,0.78,0.22,1.52,1.24,-0.9,-0.23,3.76,1.39,4.12,1.86,6.02,1.75,4.44,3.46,5.07,3.87,0.67,0.7,1.65,0.98,3.6,-0.22,2.29,2.48,3.14,-0.48],
pc2: [-0.81,1.08,-1.04,0.75,-0.08,-0.96,-0.34,-1.37,-0.64,-1.41,-1.69,-0.7,-1.41,0.62,0.13,-1.89,1.06,-1.78,1.38,-1.05,0.12,-1.91,0.34,-1.09,-1.47,-1.14,-1.06,-1.68,0.95,-1.04,-0.92,-0.9,-1.42,-0.2,-0.63,-0.97,0.05,-1.91,0.03,-1.38,-1.72,-2.24,-1.46,-1.69,0.07,-1.61,0.73,-0.39,2.14,0.83,1.82,2.03,2.26,1.88,2.75,2.5,0.7,1.43,0.23,1.46,-0.68,1.52,0.3,1.07,-0.04,0.04,1.02,2.14,1.57,1.51,0.24,1.41,1.33,0.93,0.56,1.79]
};

var centroid = {y:[7.18,8.87],x:[24.4,20.73]}

const explainers = document.getElementsByClassName("info");

function drawPlots() {
    drawScatterPlot()
}

function drawScatterPlot() {

    var shelldat = {
        x: shells.minoraxis,
        y: shells.width,
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: shells.shelltype
        },
        showlegend: false
    }

    var centroids = {
        x: centroid.x,
        y: centroid.y,
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: ['red','black'],
            size: 15
        },
        showlegend: false
    }

    var ld1axis = {
        x: [17,29],
        y: [-0.461*17+18.42295, -0.461*29+18.42295],
        mode: 'lines',
        type: 'scatter',
        name: 'LD1',
        line: {
            color: 'darkgray'
        },
        visible: 'legendonly'
    }

    var pca1axis = {
        x: [17,29],
        y: [0.38*17-0.9521, 0.38*29-0.9521],
        mode: 'lines',
        type: 'scatter',
        name: 'PC1',
        line: {
            color: 'darkorange'
        },
        visible: 'legendonly'
    }

    var pca2axis = {
        x: [17,29],
        y: [-0.28*17+14.33, -0.28*29+14.33],
        mode: 'lines',
        type: 'scatter',
        name: 'PC2',
        line: {
            color: 'gold'
        },
        visible: 'legendonly'
    }

    var pcoord = {
        type: 'parcoords',
        line: {
            color: shells.linecol,
            colorscale: [[0,'red'],[1,'black']]
        },
        dimensions: [
            {
                label: 'LD1',
                values: scores.ld1
            },
            {
                label: 'PC1',
                values: scores.pc1
            },
            {
                label: 'PC2',
                values: scores.pc2
            }
        ]
    }

    var layout_scatter = {
        title: 'Width and minor axis lengths of shells',
        xaxis: {
            title: 'Minor axis'
        },
        yaxis: {
            title: 'Width'
        }
    }

    var layout_pcoord = {
        title: 'Comparison of LD1, PC1, and PC2 scores'
    }

    Plotly.newPlot('scatter_div', [shelldat, centroids, ld1axis, pca1axis, pca2axis], layout_scatter);
    Plotly.newPlot('pcoord_div', [pcoord], layout_pcoord);

    scatter_div.on('plotly_legendclick', function(data) {
        var traceIndex = data.curveNumber;
        var visibility = data.data[traceIndex].visible;
        console.log(traceIndex);
        for (i = 0; i < explainers.length; i++) {
            explainers[i].style.display = "block";
        }
    });
}
