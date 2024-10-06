var formula1 = document.getElementById("formula1");

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
    event.dataTransfer.setData('target_id', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var drop_target = ev.target;
  var drag_target_id = ev.dataTransfer.getData('target_id');
  var drag_target = document.getElementById(drag_target_id);
  var tmp = document.createElement('span');
  tmp.className='hide';
  drop_target.before(tmp);
  drag_target.before(drop_target);
  tmp.replaceWith(drag_target);
  var parent_table = document.getElementById(drag_target_id).closest('table');
  correctAnswer(parent_table);
}

function correctAnswer(table) {
  var display = 'block';
  var table_class = table.className;
  if(table.className != 'answer') {
    return;
  }
  for (let i in table.rows) {
    let row = table.rows[i];
    for (let j in row.cells) {
      if (row.cells[j].className == 'with_image') {
        var correct = row.cells[j].getAttribute('data-correct-image');
        var image = row.cells[j].firstChild;
        var img_id = image.id;
        var img_id_sliced = img_id.slice(0,-1);
        if (correct != img_id && correct != img_id_sliced) {
          display = 'none';
        }
      }
    }
  }
  var r_div = document.getElementById(table.id + "_r");
  r_div.style.display = display; 
}
