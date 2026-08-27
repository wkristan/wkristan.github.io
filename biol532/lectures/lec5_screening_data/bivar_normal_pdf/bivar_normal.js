const corr_control = document.getElementById("corr");

const tooltip_control = document.getElementById("showtips");

const curve_x_control = document.getElementById("show_xcurve");

const curve_y_control = document.getElementById("show_ycurve");

const contour_control = document.getElementById("show_contour");

const precision = 500;

let surface = {};

corr_control.addEventListener('input', (event) => {
    let corr = Number(event.target.value);
    updateData(corr);
});

tooltip_control.addEventListener('input', (event) => {
    updateTooltip(event.target.checked);
});

curve_x_control.addEventListener('input', (event) => {
    updateXcurve(event.target.checked);
});

curve_y_control.addEventListener('input', (event) => {
    updateYcurve(event.target.checked);
});

contour_control.addEventListener('input', (event) => {
    updateContour(event.target.checked);
});


function drawSurface(corr) {

    surface = makeSurface(corr);

    var layout = {
        autosize: true,
        margin: {
            l: 0, // left
            r: 0, // right
            t: 60, // top
            b: 0  // bottom - set this to a low value
        },
        showlegend: false,
        showscale: false,
        scene: {
            aspectmode: "manual",
            aspectratio: {x:1, y: 1, z: 0.6},
            uirevision: "static_view",
            xaxis: {showspikes:false},
            yaxis: {showspikes:false},
            zaxis: {showspikes:false},
        },
        xaxis: {
            title: {
                text: 'x<sub>1</sub>'
            },
        },
        yaxis: {
            title: {
                text: 'x<sub>2</sub>'
            }
        },
        zaxis: {
            showexponent: 'all',
            exponentformat: 'e',
            title: {
                text: "Probability density"
                }
            }
        }


    Plotly.newPlot("surface_div", [surface], layout)


}


function makeSurface(corr) {

    let surf = {x: [], y: [], z: [], showscale: false, opacity: 0.5, name: '', type: 'surface', hoverinfo: 'none', contours: {x: {highlight: false}, y: {highlight:false}, z: {highlight: false}}};

    for (let i = 0; i < precision; i++) {
        let xy = -3 + 6*(i/precision);
        surf.x.push(xy);
        surf.y.push(xy);
    }

    let expon = 0, bivar_norm = 0;

    const normconst = 1 / (2 * Math.PI*Math.sqrt(1-corr**2));

    for (let i = 0; i<precision; i++) {
        let cur_array = [];
        for (let j = 0; j<precision; j++) {
            expon = -(1/(2*(1-corr**2)))*(surf.x[i]**2+surf.y[j]**2-2*corr*surf.x[i]*surf.y[j]);
            bivar_norm = normconst * Math.exp(expon);
            cur_array.push(bivar_norm);
        }
        surf.z.push(cur_array);
    }

    return(surf);


}

function updateData(corr) {

    let data_update = makeSurface(corr);
    Plotly.restyle("surface_div",{z: [data_update.z]}, 0);

}

function updateTooltip(check) {
    let showtip = "";
    if (check) {
        showtip = "x+y+z";
    } else {
        showtip = "none";
    }
    Plotly.restyle("surface_div", {hoverinfo: showtip});
}

function updateXcurve(check) {
    let update = {'contours.x.highlight': check};
    Plotly.restyle("surface_div", update, [0]);
}

function updateYcurve(check) {
    let update = {'contours.y.highlight': check};
    Plotly.restyle("surface_div", update, [0]);
}

function updateContour(check) {
    let update = {'contours.z.highlight': check};
    Plotly.restyle("surface_div", update, [0]);
}
