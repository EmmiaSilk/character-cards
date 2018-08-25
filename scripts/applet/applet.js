"use strict";

function openNewWindowWithObjectAsJSON(obj) {
  let str = JSON.stringify(obj, null, 2);
  let newWindow = window.open("");
  newWindow.document.open();
  newWindow.document.write(str);
  newWindow.document.body.style.fontFamily="monospace";
  newWindow.document.body.style.whiteSpace="pre";
  newWindow.document.close();
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
      window.addEventListener("message", Protocol.recieveMessage);
      Protocol.communicationPartner = window.parent;
      Protocol.ready();
    }
  });

});
