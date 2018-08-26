// This script modifies the functions from /common/protocol.js
"use strict";

Protocol.onSet = function(data) {
  let character = data.character;
  let key = data.key;
  let value = data.value;
  console.log('Setting ' + key + ' to ' + value + ' for character ' + character);

  let card = Cards.get(character);
  if(!card) return; // TODO: Invalid character

  switch (key) {
    case "name":
      Cards.setName(card, value);
      setDataValue(character, key, value);
      break;
    case "shorten_name":
      Cards.setShortenName(card, value);
      setDataValue(character, key, value);
      break;
    case "title":
      Cards.setTitle(card, value);
      setDataValue(character, key, value);
      break;
    case "class":
      Cards.setClass(card, value);
      setDataValue(character, key, value);
      break;
    case "icon":
      Cards.setIcon(card, value);
      setDataValue(character, key, value);
      break;
    case "stat":
      // TODO: Special handling for changing stats
      console.log("TODO: Editing stat");
      break;
    default:
      // TODO: Invalid 'set' key
      console.log("Invalid key for method " + Protocol.methods.set + ".");
  }
}
