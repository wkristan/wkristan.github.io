function highlight(span) {
    var matches = document.getElementsByClassName(span.className);
    for (var i = 0; i < matches.length; i++) {
        matches[i].style.backgroundColor = "yellow";
    }

}

function unhighlight(span) {
    var matches = document.getElementsByClassName(span.className);
    for (var i = 0; i < matches.length; i++) {
        matches[i].style.backgroundColor = "";
    }
}
