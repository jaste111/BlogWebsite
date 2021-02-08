function readMore(button){
    var buttonId = button.id;
    $(".more_" + buttonId).toggleClass("hide");
    $(".dots_"+ buttonId).toggleClass("hide");
}
