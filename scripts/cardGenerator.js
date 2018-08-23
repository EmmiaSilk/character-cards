"use strict";

var cardGenerator = {};

/* Functions for creating elements */
cardGenerator.renderCard = function(id, data, settings) {
  let newCard = $('<div class="characterCard">');
  newCard.attr('id', id);
  // Contents
  newCard.append(
    $('<div class="characterCard__header">').append(
      this.renderIcon(data.icon),
      this.renderNameText(data.name),
    ),
    $('<div class="characterCard__content">').append(
      this.renderClassText(data.class),
      this.renderStatBlock(data.stats, settings.stats),
      this.renderTitleText(data.title),
    )
  );

  return newCard;
}

cardGenerator.renderIcon = function(filepath) {
  let icon = $('<div class="characterCard__icon">');
  icon.css('background-image', 'url("' + filepath + '")');
  return icon;
}

cardGenerator.renderNameText = function(name) {
  let nameText = $('<div class="characterCard__nametext">');
  // Contents
  nameText.append('<span class="stroke">' + name + "</span>");
  nameText.append('<span class="fill">' + name + "</span>");

  return nameText;
}

cardGenerator.renderClassText = function(text) {
  let classText = $('<div class="characterCard__classtext">');
  // Contents
  classText.append('<span>' + text + '</span>');

  return classText;
}

cardGenerator.renderTitleText = function(title) {
  let titleText = $('<div class="characterCard__titletext">');
  // Contents
  titleText.append('<span>' + title + '</span>');

  return titleText;
}

cardGenerator.renderStatBlock = function(statData, definitions) {
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
cardGenerator.renderStatBox = function(statName, value) {
  // Exceptions:
  if(value == null) {
    value = "???";
  }
  // Render
  let newBox = $('<div class="characterCard__statbox">');
  newBox.append(statName, '<br/>', value);
  return newBox;
}

cardGenerator.nextCard = function(container) {
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

cardGenerator.unhide = function(element) {
  element.removeClass('hidden');
}
cardGenerator.hide = function(element) {
  element.addClass('hidden');
}
