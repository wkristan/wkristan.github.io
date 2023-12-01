var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    w = 0,
    h = 0,
    dot_flag = false;

    var pen_color = "#F8766D";
    var pen_width = 4;

    var axis_color = "black";
    var axis_width = 1;
    
function init() { 
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
    
    ctx.save();
    drawAxes(ctx);
    ctx.restore();

}

function color(obj) {
    switch (obj.id) {
        case "#F8766D":
            pen_color = "#F8766D";
            pen_width = 4;
            break;
        case "#00BFC4":
            pen_color = "#00BFC4";
            pen_width = 4;
            break;
        case "red":
            pen_color = "red";
            pen_width = 2;
            break;
        case "black":
            pen_color = "black";
            pen_width = 2;
            break;
    }
    var sel = document.getElementById("selected");
    sel.style.background = pen_color;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = pen_color;
    ctx.lineWidth = pen_width;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.offsetX;
        currY = e.offsetY;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = pen_color;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.offsetX;
            currY = e.offsetY;
            draw();
        }
    }
}


function drawAxes(ctx) {
    ctx.fillStyle = axis_color;
    ctx.strokeStyle = axis_color;
    ctx.lineWidth = axis_width;
    ctx.moveTo(40,40);
    ctx.lineTo(40,230);
    ctx.lineTo(350,230);
    ctx.stroke();
    
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Direct", 75, 255);
    ctx.fillText("Indirect", 200, 255);
    ctx.fillText("None", 320, 255);
    ctx.font = '14px Arial';
    ctx.fillText("Light treatment", 200, 280);
    
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Height", -140, 20);
    
    ctx.fillStyle = pen_color;
    ctx.strokeStyle = pen_color;
    ctx.lineWidth = pen_width;
}

function resetToBlank() {
    ctx.clearRect(0,0,w,h);
    init();
}
