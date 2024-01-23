// the example regression data
var data_obj = {conc: [0,0,0,0,0,10,10,10,10,10,20,20,20,20,20,30,30,30,30,30,40,40,40,40,40], abs: [0.05,0.07,0.09,0.11,0.13,0.16,0.18,0.2,0.22,0.24,0.26,0.28,0.3,0.32,0.34,0.37,0.39,0.41,0.43,0.45,0.48,0.5,0.52,0.54,0.56]};

// get canvas related references
var canvas=document.createElement("canvas");
var div = document.getElementById('reg_graph_div');
canvas.id = "canvas";
canvas.width = 500;
canvas.height = 300;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
var ctx=canvas.getContext("2d");
var BB=canvas.getBoundingClientRect();
var offsetX=BB.left;
var offsetY=BB.top;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
div.insertBefore(canvas, div.children[0]);


// drag related variables
var dragok = false;
var startX;
var startY;

// define 1 line
var pt1 = fromDataToCanvas(0,0.09);
var pt2 = fromDataToCanvas(40,0.0107*40 + 0.09);
var regline = {type: 'line', x0:pt1[0],y0:pt1[1],x1:pt2[0],y1:pt2[1],fill:"blue",isDragging:false};
// define the points
var pts = [];
for (i = 0; i<data_obj.conc.length; i++) {
    var pt = fromDataToCanvas(data_obj.conc[i], data_obj.abs[i]);
    pts.push({type: 'circle', x:pt[0], y:pt[1], r:5, fill:"orange", isDragging:false});
}

// initial slope, intercept, and r^2
var slope = 0.0107;
var intercept = 0.0900;
var rsq = 0.9660;

// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

// run the regression to get regression table
runRegression();

// call to draw the scene
draw();

// draw the line
function line(l) {
    ctx.save();
    ctx.strokeStyle = l.fill;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(l.x0, l.y0);
    ctx.lineTo(l.x1, l.y1);
    ctx.stroke();
    ctx.restore();
}

// draw a single point
function circle(c) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle=c.fill;
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
function draw() {
  clear();
  // draw the axes
  drawAxes();
  // redraw each shape in the pts[] array
  for(var i=0;i<pts.length;i++){
      circle(pts[i]);
  };
  line(regline);
  drawFdistRegression();

}


// handle mousedown events
function myDown(e){

  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  //var mx=parseInt(e.clientX-offsetX);
  //var my=parseInt(e.clientY-offsetY);
    var mx=parseInt(e.layerX);
    var my=parseInt(e.layerY);
  

  // test each shape to see if mouse is inside
  dragok=false;
  for(var i=0;i<pts.length;i++){
    var s=pts[i];
    var dx=s.x-mx;
    var dy=s.y-my;
    // test if the mouse is inside this circle
    if(dx*dx+dy*dy<s.r*s.r){
        dragok=true;
        s.isDragging=true;
        s.fill = 'yellow';
      }
    }
  // save the current mouse position
  startX=mx;
  startY=my;
  draw();
}


// handle mouseup events
function myUp(e){
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for(var i=0;i<pts.length;i++){
    pts[i].isDragging=false;
    pts[i].fill = 'orange';
  }
  runRegression();
  draw();
}


// handle mouse moves
function myMove(e){
  // if we're dragging anything...
  if (dragok){

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    // var mx=parseInt(e.clientX-offsetX);
    // var my=parseInt(e.clientY-offsetY);
    var mx=parseInt(e.layerX);
    var my=parseInt(e.layerY);
    
    
    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx=mx-startX;
    var dy=my-startY;

    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    for(var i=0;i<pts.length;i++){
      var s=pts[i];
      if(s.isDragging){
        s.x+=dx;
        s.y+=dy;
      }
    }

    // redraw the scene with the new rect positions
    draw();

    // reset the starting mouse position for the next mousemove
    startX=mx;
    startY=my;

  }
}

// translate from data units to graph units
function fromDataToCanvas(x, y) {
    var x_graph = 50 + 400*x/40;
    var y_graph = 50 + 200*(1-y/0.6);
    return [x_graph, y_graph];
}

// translate from graph to data units
function fromCanvasToData(x, y) {
    var x_data = 40*(x-50)/400;
    var y_data = 0.6*(1-(y-50)/200);
    return [x_data, y_data];
    
}

function runRegression() {
    var data = {x: [], y: []};
    for (i = 0; i < pts.length; i++){
        var pt = fromCanvasToData(pts[i].x, pts[i].y);
        data.x.push(pt[0]);
        data.y.push(pt[1]);
    }
    var xbar = jStat.mean(data.x);
    var ybar = jStat.mean(data.y);
    
    var xy = 0;
    var xx = 0;
    var totSS = 0;
    
    for (i = 0; i < data.x.length; i++) {
        var xdiff = data.x[i] - xbar;
        var ydiff = data.y[i] - ybar;
        xy = xy + xdiff*ydiff;
        xx = xx + xdiff*xdiff;
        totSS = totSS + ydiff*ydiff;
    }
    
    slope = xy/xx;
    intercept = ybar - slope*xbar;
    
    var residSS = 0;
    for (i = 0; i < data.y.length; i++) {
        var resid = data.y[i] - (slope*data.x[i]+intercept);
        residSS = residSS + resid*resid;
    }
    
    var regSS = totSS - residSS;
    
    var regDF = 1;
    var totDF = 24;
    var residDF = 23;
    
    var residMS = residSS/residDF;
    var fval = regSS/residMS;
    var pval = 1-jStat.centralF.cdf(fval,1,23);
        
    rsq = regSS/totSS;
    
    var x0 = fromDataToCanvas(0,intercept);
    var x1 = fromDataToCanvas(40,40*slope + intercept);
    
    regline.x0 = x0[0];
    regline.y0 = x0[1];
    regline.x1 = x1[0];
    regline.y1 = x1[1];
    
    document.getElementById("regression_ss").innerHTML = (totSS - residSS).toFixed(3);
    document.getElementById("regression_ms").innerHTML = (totSS - residSS).toFixed(3);
    document.getElementById("fval").innerHTML = fval.toFixed(2);
    if (pval < 0.0001) {
        document.getElementById("pval").innerHTML = "<0.0001";
    } else {
        document.getElementById("pval").innerHTML = pval.toFixed(4);
    }
    document.getElementById("residual_ss").innerHTML = residSS.toFixed(3);
    document.getElementById("residual_ms").innerHTML = residMS.toFixed(3);
    document.getElementById("total_ss").innerHTML = totSS.toFixed(3);

}

function drawAxes() {
    // draw the x and y axes
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(50,250);
    ctx.lineTo(450,250);
    ctx.stroke();
    ctx.lineWidth = 1;
    // draw the y ticks
    for (i = 0; i < 6; i++) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(45,250 - i*40);
        ctx.lineTo(50,250 - i*40);
        ctx.stroke();
        ctx.textAlign = "right";
        ctx.fillText(0 + i*0.12, 40, 250-i*40);
    }
    //draw the x ticks
    for (i = 0; i < 9; i++) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(50 + i*50,255);
        ctx.lineTo(50 + i*50,250);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.fillText(0 + i*5, 50 + i*50, 265);
    }
    ctx.save();
    ctx.font = "10pt Arial";
    ctx.fillText("Concentration", 250,290);
    ctx.translate(-137,150);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Absorbance", 10,150);
    ctx.restore();
    ctx.save();
    ctx.font = "10pt Arial";
    ctx.textAlign = "left";
    var regeq = "Regression equation: Absorbance = " + slope.toFixed(4) + " \u00D7 Concentration + " + intercept.toFixed(4);
    ctx.fillText(regeq, 10,10);
    var rsqtext = "r\u00B2 = " + rsq.toFixed(2);
    ctx.fillText(rsqtext, 10,30);
    ctx.restore();
    
}

function resetPoints() {
    for (i = 0; i < pts.length; i++) {
        var pt = fromDataToCanvas(data_obj.conc[i], data_obj.abs[i]);
        pts[i].x = pt[0];
        pts[i].y = pt[1];
    }
    runRegression();
    draw();
}

function drawFdistRegression() {
    var num_df = 1;
    var denom_df = 23;
    var obs_f = Number(document.getElementById("fval").innerHTML);
    var to = obs_f + 10;
    var fcurve = makeFcurve(num_df, denom_df,0,to);
    var ffill = makeFcurve(num_df, denom_df,obs_f,to);
    
    var f_curve = {
        x: fcurve.f,
        y: fcurve.f_dens,
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        line: {
            color: 'red'
        }
    }
    
    var f_fill = {
        x: ffill.f,
        y: ffill.f_dens,
        type: 'scatter',
        fill: 'tozeroy',
        showlegend: false,
        fillcolor: 'rgba(255,0,0,0.5)'
    }
    
    var layout = {
        xaxis: {
            title: "F value"
        },
        yaxis: {
            title: "Probability"
        }
    }
    
    Plotly.newPlot("fdist_regression_div", [f_fill, f_curve], layout);    
    
}
