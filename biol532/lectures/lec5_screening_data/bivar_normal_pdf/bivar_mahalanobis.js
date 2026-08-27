var data = [];

var corrs = [];

var means = [0,0];

const numericInputs = document.querySelectorAll('input[type="number"]');

numericInputs.forEach(input => {
  input.addEventListener('change', (event) => {
    updateGraph();
  });
});


function drawGraph() {

    data = makeData();

    let mahal = getMahal();

    let ptsize = scaleMahal(mahal);

    var pts = {
        x: data.x,
        y: data.y,
        mode: 'markers',
        type: 'scatter',
        marker: {size:ptsize}
    }

    var histo_data = {
        x: mahal,
        type: 'histogram',
        histnorm: 'probability density'
    };

    var layout = {

        uirevision: 'true',
        margin: {
            l:0,
            r:0,
            b:0,
            t:0
        }
    };

    var histo_layout = {
       title: {
            text: 'Distribution of D<sup>2</sup> values'
        },
        xaxis: {
            title: {
                text: 'D<sup>2</sup>'
            }
        },
        yaxis: {
            title: {
                text: 'Probability density'
            }
        }
    };

    Plotly.newPlot('mahal_graph_div', [pts], layout);
    Plotly.newPlot('mahal_histo_div', [histo_data], histo_layout);

}

function updateGraph() {

    data = makeData();

    let mahal = getMahal();

    let ptsizes = scaleMahal(mahal);

    Plotly.restyle('mahal_graph_div', {x: [data.x], y: [data.y], 'marker.size': [ptsizes]});
};

function makeData() {

    const inputs = document.querySelectorAll('input[type="number"]');

    corrs = [[1,0],[0,1]];
    corrs[0][1] = Number(inputs[0].value);
    corrs[1][0] = Number(inputs[0].value);

    let distribution = window.MultivariateNormal.default(means, corrs);
    let rand_data = [];

    for (let i = 0; i < 1000; i++){
        rand_data.push(distribution.sample());
    }

    let x = [];
    let y = [];

    for (let i = 0; i < 1000; i++) {
        x.push(rand_data[i][0]);
        y.push(rand_data[i][1]);
    }

    return({x:x,y:y});
}

function getMahal() {
    let cor_mat = jStat(corrs);
    const inv_sigma = jStat.inv(cor_mat);
    let vals = [], vals_t = [], mprods = [], mahal = [];
    for (let i = 0; i < 1000; i++) {
        vals = jStat([data.x[i], data.y[i]]);
        vals_t = jStat.transpose(vals);
        mprods = jStat.multiply(vals,inv_sigma);
        mahal.push(jStat.multiply(mprods,vals_t));
    }

    return(mahal);


};

function scaleMahal(mahal) {
    let min = jStat.min(mahal);
    let max = jStat.max(mahal);
    let ptsizes = [];

    for (let i = 0; i < 1000; i++) {
        ptsizes.push(5 + 20*(mahal[i]-min)/(max-min));
    }

    return(ptsizes);
}
