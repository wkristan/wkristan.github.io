  function changeValue( e ) {
    if(e.value == '0')
        e.value = '1';
    else
        e.value = '0';
    updateValues(e);
    predictMean();
  }

 function predictMean() {
    var pred = document.getElementById("predicted");
    var mp = document.getElementById("mp");
    var pw = document.getElementById("pw");
    var ro = document.getElementById("ro");
    var tp = document.getElementById("tp");
    var wr = document.getElementById("wr");
    var predicted_mean = 23.11 + Number(mp.value)*-0.82 + Number(pw.value)*-0.23 + Number(ro.value)*-0.55 + Number(tp.value)*-0.03 + Number(wr.value)*-1.99;
    pred.innerHTML = predicted_mean; 
}

function updateValues(e) {
    var ids = ["mp","pw","ro","tp","wr"];
    for (i = 0; i < ids.length; i++) {
        var the_button = document.getElementById(ids[i]);
        if (the_button.id !== e.id) {
            the_button.value = 0;
        }
        
    }
    var the_menu = document.getElementById("species");
    if (e.value == 1) {
        the_menu.value = e.id;
    } else the_menu.value = "hs";

}

function setButtons(selection) {
    var ids = ["mp","pw","ro","tp","wr"];
    for (i = 0; i < ids.length; i++) {
        var the_button = document.getElementById(ids[i]);
        if (the_button.id == selection.value) {
            the_button.value = 1;
        } else the_button.value = 0;
    }
    
    predictMean();

}
