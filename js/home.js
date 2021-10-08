
$(document).ready(function()
{
    $("#user_outer_layer_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

    $("#user_outer_layer_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });

    $("#overlay_id").mouseover(function() { $("#overlay_id").css('visibility','visible'); });

    $("#overlay_id").mouseout(function() { $("#overlay_id").css('visibility','hidden'); });
});


var clicked = 0;
var btn = document.querySelector(".search_bar_con");
btn.addEventListener('click', function() {
    if (clicked == 0) {
        document.getElementById("product").style.width = "700px";
        clicked = 1;
    }
    else {
        document.getElementById("product").style.width = "0";
        clicked = 0;
    }
});

