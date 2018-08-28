"use strict";

var charData = new DataSet();
var generatedData;
var cardContainer;

function openNewWindowWithObjectAsJSON(obj) {
  let str = JSON.stringify(obj, null, 2);
  let newWindow = window.open('');
  newWindow.document.open();
  newWindow.document.write(str);
  newWindow.document.body.style.fontFamily='monospace';
  newWindow.document.body.style.whiteSpace='pre';
  newWindow.document.close();
}

function onDatasetLoaded() {
  // Generate cards
  CardGenerator.renderCardsInContainer(cardContainer, charData);
  // Hide cards that should be hidden
  let firstCard = cardContainer.children().first();
  hide(cardContainer.children());
  unhide(firstCard);
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
  let cards = container.children();
  // Only switch if there is more than one card
  if(cards.length >= 2) {
    let oldCard = cards.first();
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

function previousCard(container) {
  let cards = container.children();
  // Only switch if there is more than one card
  if(cards.length >= 2) {
    let oldCard = cards.first();
    let newCard = cards.last();
    // Unhide next card
    unhide(newCard);
    // Remove old animation classes
    newCard.removeClass('anim-card-exit');
    oldCard.removeClass('anim-card-enter');
    // Set card animation
    oldCard.addClass('anim-card-exit');
    newCard.addClass('anim-card-enter');
    // Move old card to bottom of stack
    container.prepend(newCard);
  }
}

function gotoCard(container, id) {
  let cards = container.children();
  let target = container.children('[data-character="'+id+'"]');
  // Only switch if there is more than one card and the target exists
  if(cards.length >= 2 && target.length === 1) {
    // Loop through all cards
    cards.each(function(index, element) {
      let node = $(element);
      node.removeClass('anim-card-exit anim-card-enter');
      // Reveal the wanted node
      if(node.attr('data-character') === id) {
        unhide(node);
        return false; // Stop the loop
      }
      // Hide other nodes
      else {
        container.append(node);
        hide(node);
        return true; // Continue
      }
    });
  }
}

$(document).ready(function() {
  cardContainer = $('#cardContainer');
  if(AppletParams.editor) {
    // Prepare card stuff
    // Enable editing capability
    window.addEventListener('message', Protocol.recieveMessage);
    Protocol.communicationPartner = window.parent;
    // Request up-to-date dataset
    Protocol.get('dataset');
  }
  else {
    let script = loadScriptFromPath(AppletParams.source);
    document.head.appendChild(script);
    script.addEventListener('load', function() {
      setDataset(new DataSet(generatedData));
    });
  }
  // Control mode
  if(AppletParams.auto) {
    setInterval(nextCard, 5000, cardContainer);
  }
  else {
    cardContainer.click(function() {
      Protocol.navigate('relative', 'next');
      nextCard(cardContainer);
    })
  }
});
