// ==UserScript==
// @name         Duolingo - Minimize Comments
// @version      1.2
// @description  Adds button for each comment which can hide and unhide it and its children
// @author       friendly-trenchcoat
// @include      https://www.duolingo.com/*
// @grant        none
// ==/UserScript==

setInterval(function() { // every second:
    if(document.body.innerHTML.search('Comments') !== -1){ // if you are in the comments
        $("li[class='discussion-comments-list-item']").each(function(k,v) {  // for each comment:
            if( $(v).children().length == 1 ){ // if there is only one child (happens when you vote)
                var cNum = v.id.match(/comment-(.*)/)[1];  // find comment id number
                newButton(cNum, v); // and make a button
            }
        });
    }
}, 1000);

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
