
function setRGB(color_selected) {

    var rgb_color = hexToRGB(color_selected.value);
    
    document.getElementById("red_color").style.backgroundColor = "rgb(" + rgb_color[0] + ",0,0)";
    document.getElementById("green_color").style.backgroundColor = "rgb(0," + rgb_color[1] + ",0)";
    document.getElementById("blue_color").style.backgroundColor = "rgb(0,0," + rgb_color[2] + ")";
    
    document.getElementById("red_level").value = rgb_color[0];
    document.getElementById("green_level").value = rgb_color[1];
    document.getElementById("blue_level").value = rgb_color[2];

    
}

function hexToRGB(h) {
  let r = 0, g = 0, b = 0;
  
  r = parseInt(h[1] + h[2], 16);
  g = parseInt(h[3] + h[4], 16);
  b = parseInt(h[5] + h[6], 16);
  
  var colors = [r, g, b];
  
  return colors;
}

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function RGBset(color_set) {
  var cpicker = document.getElementById("picker");
  var colors = hexToRGB(cpicker.value);
  if (color_set.id == "red_level") {
    document.getElementById("red_color").style.backgroundColor = "rgb(" + color_set.value + ",0,0)";
    colors[0] = color_set.value;
  } else if (color_set.id == "green_level") {
    document.getElementById("green_color").style.backgroundColor = "rgb(0,"+color_set.value + ",0)";
    colors[1] = color_set.value;
  } else {
    document.getElementById("blue_color").style.backgroundColor = "rgb(0,0," + color_set.value + ")";
    colors[2] = color_set.value;
  }
 cpicker.value = rgbToHex(colors[0], colors[1], colors[2]); 
}
