"use strict";

var charData = getDefaultDataset();
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

function datasetLoaded() {
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

  // console.log(charData);
}

function getDefaultDataset() {
  return {
    stats: {},
    characters: {},
  };
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

$(document).ready(function() {
  cardContainer = $('#cardContainer');
  if(AppletParams.noData) {
    datasetLoaded();
  }
  else {
    let script = loadScriptFromPath(AppletParams.source);
    document.head.appendChild(script);
    script.addEventListener('load', datasetLoaded);
  }

  console.log(charData);
});
