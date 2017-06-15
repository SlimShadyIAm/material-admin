var callbacks = {};
var revcallbacks = {};
//$(document).ready(function(){
if ($("#fpopup").length) { // if we have a popup to show
    i = 0;
    $("div[id='fpopup']").each(function() {
        var currentHTML = $(this).html();
        $(this).attr('did', i);
        $(this).html('<div id="hover'+i+'"></div><div id="popup'+i+'"><div id="close'+i+'">X</div>\<div class="animated bounce">'+currentHTML+'</div></div>');
        callbacks[String(i)] = $(this).attr("callback");
        revcallbacks[$(this).attr("callback")] = String(i);
        i++;
    });
    //alert(revcallbacks.toSource())
    for (var key in callbacks) {
        var sector = callbacks[key];
        (function(sec){
          $(sec).on("click", function(e){
            var index = revcallbacks[sec];
            $("#hover"+index).fadeIn();
            $("#popup"+index).fadeIn();
          });
        }(sector))
    }
    $("[id^='hover']").click(function(){
        var didid = $(this).parent().attr('did');
        $(this).fadeOut();
        $("#popup"+didid).fadeOut();
    });
    $("[id^='close']").click(function(){
        var didid = $(this).parents().eq(1).attr('did');
        $("#hover"+didid).fadeOut();
        $("#popup"+didid).fadeOut();
    });
    //});
}
function genKey() {
    var key = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    for (var i=0; i < 16; i++) {
        key += possible.charAt(Math.floor(Math.random() * possible.length));
        if (i % 4 === 0 && !(i in [0])) {
            key += '-';
        }
    }

    // move last char to first, a little hacky
    key = key.substr(1) + key.substr(0, 1);

    return key;
}
var ids = [];
var currentActive2 = '';
var children = document.getElementById('objects').children;     
var childrenLength = children.length;
for(var i = 0; i < childrenLength; i++){
    if(children[i].nodeName.toLowerCase() === 'div'){
        ids.push(children[i].getAttribute('repr'));
    }
}
$("#cright").on('click', function() {
    var l = ids.length;
    var i = ids.indexOf(document.getElementById('currentActive').value);
    var nextid = ids[(i+1)%l];
    for(var i = 0; i < childrenLength; i++){
        if(children[i].getAttribute('repr') == document.getElementById('currentActive').value){
            children[i].style.display = "none";
        }
        if(children[i].getAttribute('repr') == nextid){
            children[i].style.display = "block";
            currentActive2 = children[i].getAttribute('repr');
        }
    }
    document.getElementById('currentActive').value = currentActive2;
    currentActive2 = '';
});
$("#cleft").on('click', function() {
    var l = ids.length;
    var i = ids.indexOf(document.getElementById('currentActive').value);
    var previd = ids[(i+l-1)%l];
    for(var i = 0; i < childrenLength; i++){
        if(children[i].getAttribute('repr') == document.getElementById('currentActive').value){
            children[i].style.display = "none";
        }
        if(children[i].getAttribute('repr') == previd){
            children[i].style.display = "block";
            currentActive2 = children[i].getAttribute('repr');
        }
    }
    document.getElementById('currentActive').value = currentActive2;
    currentActive2 = '';
});
$('.autocomplete-suggestion').css('width','300px');