function readMore(button){
    let buttonClass = button.className;
    let buttonId = buttonClass.split("-")[1];
    $(".p_" + buttonId).toggleClass("hide");
    $(".readMore-"+buttonId).toggleClass("hide-button");
    $(".readLess-"+buttonId).toggleClass("hide-button");
}
