"use strict";

const CardGenerator = {};

CardGenerator.renderCardsInContainer = function(container, dataSource) {
  let characterList = dataSource.characters;
  // Render each card from data in dataSource.
  for(let key in characterList)
  {
    let id = 'characterCard--'+key;
    let data = characterList[key];
    container.append( CardGenerator.renderCard(id, data, dataSource.definition) );
  }
}

/* Functions for creating elements */
CardGenerator.renderCard = function(id, character, settings) {
  let newCard = $('<div class="characterCard">');
  newCard.attr('id', id);
  // Contents
  newCard.append(
    $('<div class="characterCard__header">').append(
      this.renderIcon(character.icon),
      this.renderNameText(character.name),
    ),
    $('<div class="characterCard__content">').append(
      this.renderClassText(character.class),
      this.renderStatBlock(character.stats, settings.stats),
      this.renderTitleText(character.title),
    )
  );

  return newCard;
}

CardGenerator.renderIcon = function(filepath) {
  let icon = $('<div class="characterCard__icon">');
  icon.css('background-image', 'url("' + filepath + '")');
  return icon;
}

CardGenerator.renderNameText = function(name) {
  let nameText = $('<div class="characterCard__nametext">');
  // Contents
  nameText.append('<span class="stroke">' + name + "</span>");
  nameText.append('<span class="fill">' + name + "</span>");

  return nameText;
}

CardGenerator.renderClassText = function(text) {
  let classText = $('<div class="characterCard__classtext">');
  // Contents
  classText.append('<span>' + text + '</span>');

  return classText;
}

CardGenerator.renderTitleText = function(title) {
  let titleText = $('<div class="characterCard__titletext">');
  // Contents
  titleText.append('<span>' + title + '</span>');

  return titleText;
}

CardGenerator.renderStatBlock = function(statData, definitions) {
  let container = $('<div class="characterCard__statblock">');

  // Render each row
  for(let row in definitions) {
    let subContainer = $('<div class="characterCard__statblockrow">');
    // Render each stat box in row
    for(let key in definitions[row]) {
      let statName = definitions[row][key];
      let statValue = statData[key];
      subContainer.append(this.renderStatBox(statName, statValue));
    }
    container.append(subContainer);
  }

  return container;
}
CardGenerator.renderStatBox = function(statName, value) {
  // Exceptions:
  if(value == null) {
    value = "???";
  }
  // Render
  let newBox = $('<div class="characterCard__statbox">');
  newBox.append(statName, '<br/>', value);
  return newBox;
}
