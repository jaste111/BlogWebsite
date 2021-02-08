function readMore(button){
    let buttonClass = button.className;
    let buttonId = buttonClass.split("-")[1];
    $(".p_" + buttonId).toggleClass("hide");
    $("."+buttonClass).toggleClass("hide-button");
}
