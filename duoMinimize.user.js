// ==UserScript==
// @name         Duolingo - Minimize Comments
// @description  Adds button for each comment which can hide and unhide it and its children
// @author       friendly-trenchcoat
// @version      1.0
// @include      https://www.duolingo.com/*
// @require	     http://code.jquery.com/jquery-latest.min.js
// @grant        none
// ==/UserScript==

var bool = 1;
setInterval(function() { // check every second
    // if not in the comments, set to true
    if(document.body.innerHTML.search('Comments') == -1){
        bool = 1;
    }
    // else if in the comments and true, preform function and set to false
    else if(document.body.innerHTML.search('Comments') !== -1 && bool == 1){
        min();
        bool = 0;
    }
}, 1000);

function min(){
    $("li[class='discussion-comments-list-item']").each(function(k,v) {  // for each comment
        var cNum = v.id.match(/comment-(.*)/)[1];  // find comment id number
        newButton(cNum, v); // make a button
    });
}
function newButton(cNum, comment){
    var button = $('<button/>', {
        text: "-",
        id: "button-"+cNum,
        class: "btn btn-green btn-small",
        click: function () {
            if($(this).text() == "-") {
                $(comment).children().eq(1).hide(); // hide nested comments
                $(this).text("+");
            }
            else {
                $(comment).children().eq(1).show(); // unhide nested comments
                $(this).text("-");
            }
        }
    });
    $(comment).prepend(button);
}
