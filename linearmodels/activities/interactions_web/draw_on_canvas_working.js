var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "#F8766D",
    y = 4;

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
    
    var axes = document.getElementById("axes");
    axes.crossOrigin = "Anonymous";
    ctx.drawImage(axes,0,0);
}

function color(obj) {
    switch (obj.id) {
        case "#F8766D":
            x = "#F8766D";
            y = 4;
            break;
        case "#00BFC4":
            x = "#00BFC4";
            y = 4;
            break;
        case "red":
            x = "red";
            y = 2;
            break;
        case "black":
            x = "black";
            y = 2;
            break;
    }
    var sel = document.getElementById("selected");
    sel.style.background = x;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function download_img(el) {
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
    el.href = image.src;
};


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
            ctx.fillStyle = x;
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

function redrawAxes() {
    var img = document.getElementById("axes");
    ctx.drawImage(img,0,0);
}
