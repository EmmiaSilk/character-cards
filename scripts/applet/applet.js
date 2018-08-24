"use strict";

function recieveMessage(event) {
  console.log(event);
}

$(document).ready(function() {

  // Load data as script
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = AppletParams.source;
  // Append
  document.head.appendChild(script);

  // When dataset it loaded:
  script.addEventListener('load', function() {
    // Generate cards
    var cardContainer = $('#cardContainer')
    CardGenerator.renderCardsInContainer(cardContainer, charData);
    // Hide cards that should be hidden
    let firstCard = cardContainer.children().first();
    hide(cardContainer.children());
    unhide(firstCard);

    if(AppletParams.auto) {
      setInterval(nextCard, 5000, cardContainer);
    }
    else {
      cardContainer.click(function() {
        nextCard(cardContainer);
      })
    }

    // Enable editing capability
    if(AppletParams.editable) {
      window.addEventListener("message", recieveMessage);
      window.parent.postMessage("ready", "*");
    }
  });

});
