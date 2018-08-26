"use strict";

function nextCard(container) {
  let oldCard = container.children().first();
  let newCard = oldCard.next();

  // Unhide next card
  unhide(newCard);

  // Remove old animation classes
  newCard.removeClass('anim-card-exit');
  oldCard.removeClass('anim-card-enter');

  // Set card animation
  oldCard.addClass('anim-card-exit');
  newCard.addClass('anim-card-enter');

  // Move old card to bottom of stack
  container.append(oldCard);

}

function unhide(element) {
  element.removeClass('hidden');
}
function hide(element) {
  element.addClass('hidden');
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function loadScriptFromPath(source) {
  // Load data as script
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = source;
  return script;
}
