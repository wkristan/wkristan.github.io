var data = [];

var corrs = [];

var means = [0,0,0];

const numericInputs = document.querySelectorAll('input[type="number"]');

numericInputs.forEach(input => {
  input.addEventListener('change', (event) => {
    updateMatching(event.target.className, event.target.value);
    updateGraph();
  });
});


function updateMatching(cn, val) {
    let matching = document.querySelector(`span.${cn}`);
    matching.innerHTML = val;
}


function drawGraph() {

    data = makeData();

    let pdf = getPDF();

    let ptsize = scalePDF(pdf);

    var pts = {
        x: data.x,
        y: data.y,
        z: data.z,
        mode: 'markers',
        type: 'scatter3d',
        marker: {size:ptsize}
    }

    var layout = {
        uirevision: 'true',
        margin: {
            l:0,
            r:0,
            b:0,
            t:0
        }
    };

    Plotly.newPlot('3d_graph_div', [pts], layout);


}

function updateGraph() {

    data = makeData();

    let pdf = getPDF();

    let ptsizes = scalePDF(pdf);

    Plotly.restyle('3d_graph_div', {x: [data.x], y: [data.y],z: [data.z], 'marker.size': [ptsizes]});
};

function makeData() {

    const inputs = document.querySelectorAll('input[type="number"]');

    corrs = [[1,0,0],[0,1,0],[0,0,1]];
    corrs[0][1] = Number(inputs[0].value);
    corrs[0][2] = Number(inputs[1].value);
    corrs[1][0] = Number(inputs[0].value);
    corrs[1][2] = Number(inputs[2].value);
    corrs[2][0] = Number(inputs[1].value);
    corrs[2][1] = Number(inputs[2].value);

    let distribution = window.MultivariateNormal.default(means, corrs);
    let rand_data = [];

    for (let i = 0; i < 1000; i++){
        rand_data.push(distribution.sample());
    }

    let x = [];
    let y = [];
    let z = [];

    for (let i = 0; i < 1000; i++) {
        x.push(rand_data[i][0]);
        y.push(rand_data[i][1]);
        z.push(rand_data[i][2]);
    }

    return({x:x,y:y,z:z});
}

function getPDF() {
    let cor_mat = jStat(corrs);
    const normconst = 1/(((2*Math.PI)**2)*jStat.det(cor_mat));
    const inv_sigma = jStat.inv(cor_mat);
    console.log(inv_sigma);
    let vals = [], vals_t = [], mprods = [], pdf = [];
    for (let i = 0; i < 1000; i++) {
        vals = jStat([data.x[i], data.y[i], data.z[i]]);
        vals_t = jStat.transpose(vals);
        mprods = jStat.multiply(vals,inv_sigma);
        pdf.push(normconst * Math.exp(-0.5*jStat.multiply(mprods,vals_t)));
    }

    return(pdf);


};

function scalePDF(pdf) {
    let min = jStat.min(pdf);
    let max = jStat.max(pdf);
    let ptsizes = [];

    for (let i = 0; i < 1000; i++) {
        ptsizes.push(5 + 20*(pdf[i]-min)/(max-min));
    }

    return(ptsizes);
}
