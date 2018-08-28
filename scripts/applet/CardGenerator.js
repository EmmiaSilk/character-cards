"use strict";

const CardGenerator = {};

CardGenerator.renderCardsInContainer = function(container, dataSource) {
  let characterList = dataSource.characters;
  // Render each card from data in dataSource.
  for(let key in characterList)
  {
    let data = characterList[key];
    container.append( CardGenerator.renderCard(key, data, dataSource.definition) );
  }
}

/* Functions for creating elements */
CardGenerator.renderCard = function(characterKey, character, settings) {
  let element = $('<div class="characterCard">');
  element.attr('data-character', characterKey);
  // Contents
  element.append(
    $('<div class="characterCard__header">').append(
      this.renderIcon(character.icon),
      this.renderNameText(character.name, character.shorten_name),
    ),
    $('<div class="characterCard__content">').append(
      this.renderClassText(character.raceclass),
      this.renderStatBlock(character.stats, settings.stats),
      this.renderTitleText(character.title),
    )
  );

  return element;
}

CardGenerator.renderIcon = function(filepath) {
  let element = $('<div class="characterCard__icon">');
  element.attr('data-path', filepath);
  element.css('background-image', 'url("' + filepath + '")');
  return element;
}

CardGenerator.renderNameText = function(text, shorten_name) {
  let element = $('<div class="characterCard__nametext">');
  element.attr('data-value', text);
  element.attr('data-shorten', shorten_name);
  // Content
  element.append('<span class="stroke">' + text + '</span>');
  element.append('<span class="fill">' + text + '</span>');

  return element;
}

CardGenerator.renderClassText = function(text) {
  let element = $('<div class="characterCard__classtext">');
  element.attr('data-value', text);
  // Content
  element.append('<span>' + text + '</span>');

  return element;
}

CardGenerator.renderTitleText = function(text) {
  let element = $('<div class="characterCard__titletext">');
  element.attr('data-value', text);
  // Contents
  element.append('<span>' + text + '</span>');

  return element;
}

CardGenerator.renderStatBlock = function(statData, definitions) {
  let container = $('<div class="characterCard__statblock">');

  // Render each row
  for(let row in definitions) {
    let element = $('<div class="characterCard__statblockrow">');
    element.attr('data-row', row);
    // Render each stat box in row
    for(let key in definitions[row]) {
      let statName = definitions[row][key];
      let statValue = statData[key];
      element.append(this.renderStatBox(statName, statValue, key));
    }
    container.append(element);
  }

  return container;
}
CardGenerator.renderStatBox = function(statName, value, key) {
  // Exceptions:
  if(value == null) {
    value = '???';
  }
  // Render
  let element = $('<div class="characterCard__statbox">');
  element.attr('data-stat', key);
  element.append(statName, '<br/>', value);
  return element;
}
