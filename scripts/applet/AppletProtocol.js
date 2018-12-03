// This script modifies the functions from /common/protocol.js
"use strict";

Protocol.onSet = function(data) {
  let id = data.character;
  let key = data.key;
  let value = data.value;
  let statId = data.stat;

  let character = charData.getCharacter(id);
  let card = Cards.get(id);
  if(!card) return; // TODO: Invalid character

  switch (key) {
    case 'name':
      Cards.setName(card, value);
      character.setName(value);
      break;
    case 'shorten_name':
      Cards.setShortenName(card, value);
      character.setShorten(value);
      break;
    case 'title':
      Cards.setTitle(card, value);
      character.setTitle(value);
      break;
    case 'raceclass':
      Cards.setClass(card, value);
      character.setRaceClass(value);
      break;
    case 'icon':
      Cards.setIcon(card, value);
      character.setIcon(value);
      break;
    case 'stat':
      Cards.setStat(card, statId, value);
      character.setStat(statId, value);
      break;
    default:
      // TODO: Invalid 'set' key
      console.log('Invalid key for method ' + Protocol.methods.set + '.');
  }
}

Protocol.onReplace = function(data) {
  let target = data.type;
  let id = data.id;
  let obj = data.obj;

  switch(data.type) {
    case 'card':
      // TODO: Special handling for replacing cards
      break;
    case 'dataset':
      charData = new DataSet(obj);
      onDatasetLoaded();
      break;
    default:
  }
}

Protocol.onNavigate = function(mode, position) {
  // Next/previous card
  console.log(mode + ", " + position);
  if(mode == 'relative') {
    if(position === 'next') {
      nextCard(cardContainer);
    }
    else if (position === 'back') {
      previousCard(cardContainer);
    }
  }
  // Switch directly to a card
  else if (mode === 'absolute') {
    gotoCard(cardContainer, position);
  }
}

Protocol.onAdd = function(type, id, obj) {
  switch(type) {
    case 'character':
      let character = new Character(obj);
      charData.setCharacter(id, character);
      addCard(id, character);
      break;
    default:
      // TODO: Invalid type handler
  }
}

Protocol.onDelete = function(type, id) {
  switch (type) {
    case 'character':
      charData.removeCharacter(id);
      deleteCard(id);
      break;
    default:

  }
}
