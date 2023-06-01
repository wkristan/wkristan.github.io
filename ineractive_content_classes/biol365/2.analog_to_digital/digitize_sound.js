// first we need to create a stage
var stage = new Konva.Stage({
  container: 'soundwave',   // id of container <div>
  width: 600,
  height: 400
});

// then create layer
var layer = new Konva.Layer();

var xAxis = new Konva.Line({
  points: [20,200,400,200],
  stroke: 'black',
  strokeWidth: 1
});

var yAxis = new Konva.Line({
  points: [20,20,20,380],
  stroke: 'black',
  strokeWidth: 1
});

var redLine = new Konva.Line({
    points: [20, 100, 60, 220, 100, 160, 140, 370, 180, 60, 220, 210, 260, 160, 300, 240, 340, 140, 380, 200],
    stroke: 'red',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.3,
});


for (var i =0; i < 8; i++) {

// create our shape
  
const rect = new Konva.Rect({
  x: 50*i + 20,
  y: 20,
  width: 50,
  height: 180,
  fill: 'rgba(0,0,255,0.5)',
  stroke: 'black',
  strokeWidth: 1,
  draggable: false
});

// Create a transformer for the rectangle

const tr = new Konva.Transformer({
  nodes: [rect],
  enabledAnchors: ['top-center','bottom-center'],
  rotateEnabled: false,
  anchorDragBoundFunc: function (oldPos, newPos, event) {
    return newPos;
  }
});

layer.add(rect);
layer.add(tr);

}



// add the shape to the layer
layer.add(xAxis);
layer.add(yAxis);
layer.add(redLine);

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();
