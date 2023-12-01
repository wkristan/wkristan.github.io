   

function drawChart() {
        var lower = document.getElementById("lower").value;
        var upper = document.getElementById("upper").value;
        var curvedat = normCurve(lower, upper);
        
        var curve = {
            x: curvedat.zval,
            y: curvedat.curve,
            type: 'scatter',
            line: {
                color: "black"
            }
        };
        
        var fill = {
            x: curvedat.zval,
            y: curvedat.fill,
            fill: 'tozeroy',
            fillopacity: 0.7,
            type: 'scatter',
            mode: "none"
        }
        
        var layout = {
            title: "Standard normal distribution",
            showlegend: false,
            xaxis: {
                title: {
                    text: "z value"
                }
            },
            yaxis: {
                title: {
                    text: "Probability density"
                }
            }
        };
        
        var data = [fill, curve];

        Plotly.newPlot("chart_div", data, layout);
        
        var lp = jStat.normal.cdf(Number(lower),0,1);
        var up = jStat.normal.cdf(Number(upper),0,1);
        var pval = up - lp;
        
        if (pval < 0) {
            document.getElementById("probability").innerHTML = "Set the upper limit higher than the lower limit";
        } else {
            document.getElementById("probability").innerHTML = "p = " + pval.toFixed(4);
        }
      }
      
      
function normCurve(ll, ul) {
       var dat = {zval: [], curve: [], fill: []};
       var j = -4;
       var k = 0;
       var l = 0;
       for(var i=0; i<101; i++) {
            k = jStat.normal.pdf(j,0,1);
            if (j <= ll || j >= ul) {
                l = null;
            } else {
                l = k;
            }
            dat.zval.push(j);
            dat.curve.push(k);
            dat.fill.push(l);
            j = j + 8/100;
       }
       return dat;
    };

