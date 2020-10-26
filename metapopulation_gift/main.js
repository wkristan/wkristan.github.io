// This script is used to show content when a link is clicked.

function HideContent(d) {
	document.getElementById(d).style.display = "none";
	}
function ShowContent(d) {
	document.getElementById(d).style.display = "block";
	}
function ReverseDisplay(d) {
	if(document.getElementById(d).style.display == "none") { document.getElementById(d).style.display = "block"; }
	else { document.getElementById(d).style.display = "none"; }
}

// Table row and column highlighting. Start with whatever kind of mobile test you wanna do.
if (screen.width < 500) {
  
  $("body").addClass("nohover");
  $("td, th")
    .attr("tabindex", "1")
    .on("touchstart", function() {
      $(this).focus();
    });
  
}

// Swap between two images on click.

      function swapImage(x, img1, img2) {
        var fullPath = x.src;
        var filename = fullPath.replace(/^.*[\\\/]/, '');
        if (filename == img1) {
          x.src = img2;
        }
        else {
          x.src = img1;
        }
      }

// Cycle through an array of images.

      function changeImage(x, imageArray) {
        var fullPath = x.src;
        var filename = fullPath.replace(/^.*[\\\/]/, '');
        var a = imageArray.indexOf(filename);
        if (a < imageArray.length - 1) {
          x.src = imageArray[a+1];
        }
        else {
          x.src = imageArray[0];
        }
      }


//Toggle between navigation pane visible and invisible

function navToggle() {
    if (document.getElementById("navigation").style.display == "block") {
        document.getElementById("navigation").style.display = "none";
		} else {
        document.getElementById("navigation").style.display = "block";
		}
}

//Reveal and hide tooltips

function showTip(tip_to_show) {
	e = document.getElementById(tip_to_show);
	Object.assign(e.style, {display: "inline-block", position: "absolute", zIndex: "1"});
}
    
function hideTip(tip_to_hide) {
	document.getElementById(tip_to_hide).style.display = "none";
}
