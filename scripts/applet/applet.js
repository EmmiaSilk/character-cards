"use strict";

var charData = new DataSet();
var generatedData;
var cardContainer;

function openNewWindowWithObjectAsJSON(obj) {
  let str = JSON.stringify(obj, null, 2);
  let newWindow = window.open("");
  newWindow.document.open();
  newWindow.document.write(str);
  newWindow.document.body.style.fontFamily="monospace";
  newWindow.document.body.style.whiteSpace="pre";
  newWindow.document.close();
}

function onDatasetLoaded() {
  // Generate cards
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
}

function setDataValue(character, key, value) {
  // Change name data
  if(charData.characters[character]) {
    let char = charData.characters[character];
    if(char[key]) {
      char[key] = value;
    }
  }
}

function nextCard(container) {
  // Only switch if there is more than one card
  if(container.children().length >= 2) {
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
}

function unhide(element) {
  element.removeClass('hidden');
}
function hide(element) {
  element.addClass('hidden');
}

$(document).ready(function() {
  cardContainer = $('#cardContainer');
  if(AppletParams.noData) {
    onDatasetLoaded();
  }
  else {
    let script = loadScriptFromPath(AppletParams.source);
    document.head.appendChild(script);
    script.addEventListener('load', function() {
      charData = new DataSet(generatedData);
      onDatasetLoaded();
    });
  }
});
