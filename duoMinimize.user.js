// ==UserScript==
// @author       friendly-trenchcoat
// @name         Duolingo - Minimize Comments
// @version      1.3
// @description  Adds button for each comment which can hide and unhide it and its children
// @include      https://forum.duolingo.com/*
// @require	     http://code.jquery.com/jquery-latest.min.js
// @grant        none
// ==/UserScript==

setInterval(function() { // every second:
    $("._3Ub4w").next().children().each(function(k,v) {  // for each comment:
        if( $(v).children().length == 3 ){ // if button not yet placed
            var cNum = v.id;  // find comment id number
            newButton(cNum, v); // and make a button
        }
    });
}, 1000);

var index = ["XXbxY", "_18pbo", "xte4h", "_2Grdu", "_1gpUN", "_2JM-K"]; // this is stupid

function newButton(cNum, comment){
    var button = $('<button/>', {
        text: "-",
        id: "button-"+cNum,
        class: "_3Rj4j _1z_c1 QHkFc",
        click: function () {
            var pClass;
            var current;
            if($(this).text() == "-") {
                $(this).text("+");

                // hide comment
                $(comment).children().eq(2).hide();
                $(comment).children().eq(3).hide();

                // hide children
                pClass = index.indexOf($(comment).attr("class"));
                current = $(comment).next();
                while(index.indexOf($(current).attr("class")) > pClass) {
                    $(current).hide();
                    current = $(current).next();
                }
            }
            else {
                $(this).text("-");

                // unhide comment
                $(comment).children().eq(2).show();
                $(comment).children().eq(3).show();

                // unhide children
                pClass = index.indexOf($(comment).attr("class"));
                current = $(comment).next();
                while(index.indexOf($(current).attr("class")) > pClass) {
                    $(current).show();
                    current = $(current).next();
                }
            }
        }
    });
    button.css({
        "display": "inline-block",
        "vertical-align": "top",
        "margin-left": "-35px",
        "margin-right": "5px",
        "margin-top": "2px",
        "margin-bottom": "-45px"
    });
    $(comment).children().eq(0).attr("style","margin: 0px 7px 14px 7px;");
    $(comment).prepend(button);
}
